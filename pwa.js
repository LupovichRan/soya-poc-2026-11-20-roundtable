/* Roundtable — service worker registration and "Add to Home Screen". */
(function () {
  'use strict';

  // The service worker only works on http: or https:, not when the file is opened directly.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () { /* the app still works without it */ });
    });
  }

  var button = document.getElementById('install');
  var tip = document.getElementById('install-tip');
  if (!button || !tip) return;

  var TIPS = {
    en: {
      ios: 'In Safari, tap the Share button, then choose “Add to Home Screen”.',
      android: 'Open your browser menu, then choose “Add to Home screen”.'
    },
    he: {
      ios: 'בספארי, הקישו על כפתור השיתוף ובחרו "הוסף למסך הבית".',
      android: 'פתחו את תפריט הדפדפן ובחרו "הוספה למסך הבית".'
    }
  };

  var ua = navigator.userAgent || '';
  var isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/.test(ua);
  var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var deferred = null;
  var installed = false;

  function lang() { return document.documentElement.lang === 'he' ? 'he' : 'en'; }
  function refresh() {
    button.hidden = installed || standalone || !(deferred || isIos || isAndroid);
    if (button.hidden) tip.hidden = true;
    if (!tip.hidden) tip.textContent = TIPS[lang()][isIos ? 'ios' : 'android'];
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    refresh();
  });
  window.addEventListener('appinstalled', function () {
    installed = true;
    deferred = null;
    refresh();
  });
  document.addEventListener('roundtable:lang', refresh);

  button.addEventListener('click', function () {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function () { deferred = null; refresh(); }, function () { /* dismissed */ });
      return;
    }
    tip.hidden = !tip.hidden;
    refresh();
  });

  refresh();
})();
