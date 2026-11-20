/* Roundtable service worker.
   Bump VERSION (roundtable-YYYYMMDDHHMMSS) whenever a cached file changes. */
const VERSION = 'roundtable-20261120120000';

const PRECACHE = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'pwa.js',
  'manifest.webmanifest',
  'manifests/roundtable.webmanifest',
  'icons/roundtable-192.png',
  'icons/roundtable-512.png',
  'icons/roundtable-maskable-512.png',
  'icons/roundtable-apple-180.png',
  'assets/soya-productions.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('roundtable-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function store(request, response) {
  if (response && response.ok && response.type === 'basic') {
    const cache = await caches.open(VERSION);
    await cache.put(request, response.clone());
  }
  return response;
}

/** Fresh copy first; after 4 seconds, or with no network, use the saved copy. */
async function networkFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: request.mode === 'navigate' });
  const fresh = fetch(request).then((response) => store(request, response));
  if (!cached) {
    try { return await fresh; } catch (err) { return (await caches.match('index.html')) || Response.error(); }
  }
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 4000));
  try {
    const winner = await Promise.race([fresh, timeout]);
    if (winner && winner.ok) return winner;
  } catch (err) { /* offline: fall through to the saved copy */ }
  fresh.catch(() => {});
  return cached;
}

/** Saved copy straight away, refreshed in the background. */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fresh = fetch(request).then((response) => store(request, response));
  if (cached) { fresh.catch(() => {}); return cached; }
  return fresh;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Fonts and the visitor's own model server are other origins: leave them alone.
  if (url.origin !== self.location.origin) return;
  const shell = request.mode === 'navigate' || /\.(html|js|css)$/.test(url.pathname) || url.pathname.endsWith('/');
  event.respondWith(shell ? networkFirst(request) : staleWhileRevalidate(request));
});
