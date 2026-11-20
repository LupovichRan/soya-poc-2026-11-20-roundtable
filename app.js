/* Roundtable — Soya Productions.
   UI, language strings, the sample panel, the optional live panel, and localStorage.
   No framework, no build step. Everything stays in this browser. */
(function () {
  'use strict';

  var KEYS = {
    ideas: 'soya-roundtable-ideas',
    lang: 'soya-roundtable-lang',
    settings: 'soya-roundtable-settings',
    splash: 'soya-roundtable-splash-session'
  };
  var LIMITS = { name: 60, problem: 600, promise: 300, market: 800 };
  var MAX_IDEAS = 30;
  var SIZE_MIN = 2, SIZE_MAX = 8, SIZE_DEFAULT = 5;
  var ACTIONS = ['call', 'pledge', 'follow', 'ignore'];
  var ANIMALS = [
    { animal: 'cat', color: '#1F2937' },
    { animal: 'fox', color: '#B9571E' },
    { animal: 'owl', color: '#6B5540' },
    { animal: 'bear', color: '#7A4B2E' },
    { animal: 'rabbit', color: '#8C95A3' },
    { animal: 'frog', color: '#2F7D55' }
  ];

  /* ---------- Language strings ---------- */

  var I18N = {
    en: {
      title: 'Roundtable',
      otherLang: 'עברית',
      settings: 'Settings',
      presents: 'Soya Productions presents',
      skip: 'Skip',
      credit: 'A Soya Productions film',
      install: 'Add to Home Screen',
      homeTitle: 'Get a plain-language review of your idea',
      homeLead: 'Describe an app or a feature. A small panel of everyday people will tell you what is unclear, what they would ask for, and who it is for.',
      review: 'Review an idea',
      yourIdeas: 'Your ideas',
      noIdeas: 'No ideas yet. Start with the button above.',
      step1: 'Step 1 of 2',
      step2: 'Step 2 of 2',
      ideaTitle: 'Your idea',
      name: 'Short public name',
      nameHelp: 'What people would call it.',
      problem: 'The problem',
      problemHelp: 'What is annoying or hard today?',
      promise: 'Your promise',
      promiseHelp: 'What does the person who uses it get?',
      mascot: 'Pick a mascot',
      next: 'Next: who is it for?',
      back: 'Back',
      marketTitle: 'Who is it for?',
      market: 'Describe the people you have in mind',
      marketHelp: 'A few plain words about who they are and how they live.',
      size: 'How many people on the panel?',
      fewer: 'Fewer people',
      more: 'More people',
      ask: 'Ask the panel',
      fillAll: 'Please fill in every box before you continue.',
      waitTitle: 'The panel is reading your idea…',
      waitLead: 'This can take a minute or two. Please keep this page open.',
      synthetic: 'This is a synthetic panel: made-up everyday people, not real demand. Use it to sharpen your idea before you ask real people.',
      sourceSample: 'Sample review — no AI model connected',
      sourceLive: 'Review from your connected model',
      fellBack: 'The model could not be reached or the answer was not usable, so this is a sample review.',
      whoTitle: 'Who it is for',
      mascotTitle: 'Does the mascot fit?',
      objections: 'Main objections',
      unclear: 'What was unclear',
      asks: 'What they would ask for',
      countsTitle: 'What the panel would do',
      act_call: 'Book a call',
      act_pledge: 'Offer to try it',
      act_follow: 'Follow for updates',
      act_ignore: 'Ignore it',
      would_call: 'would book a call',
      would_pledge: 'would try it',
      would_follow: 'would follow',
      would_ignore: 'would ignore',
      syntheticTag: 'synthetic',
      understood: 'Understood it as:',
      objection: 'Objection:',
      confused: 'Confused by:',
      asksFor: 'Asks for:',
      another: 'Review another idea',
      settingsTitle: 'Settings',
      settingsLead: 'Roundtable works without any set-up and shows a sample review. If you have your own AI model, you can connect it here to get a live review. It works with any OpenAI-compatible model server.',
      baseUrl: 'Model server address',
      baseUrlHelp: 'For example: http://localhost:11434/v1',
      model: 'Model name',
      modelHelp: 'The name of the model on that server.',
      key: 'Access key (optional)',
      keyHelp: 'Stays in this browser only. It is sent only to the address above.',
      keyStored: 'A key is saved. Leave this empty to keep it.',
      save: 'Save',
      forget: 'Forget the key',
      saved: 'Saved.',
      forgotten: 'The key was removed from this browser.',
      privacy: 'No account, no ads, no tracking. Your ideas stay in this browser.',
      cat: 'Cat', fox: 'Fox', owl: 'Owl', bear: 'Bear', rabbit: 'Rabbit', frog: 'Frog',
      emblem: 'emblem'
    },
    he: {
      title: 'שולחן עגול',
      otherLang: 'English',
      settings: 'הגדרות',
      presents: 'Soya Productions מציגים',
      skip: 'דלג',
      credit: 'הפקה של Soya Productions',
      install: 'הוספה למסך הבית',
      homeTitle: 'קבלו חוות דעת בשפה פשוטה על הרעיון שלכם',
      homeLead: 'תארו אפליקציה או תכונה. קבוצה קטנה של אנשים מן השורה תספר מה לא ברור, מה היו מבקשים, ולמי זה מתאים.',
      review: 'בדיקת רעיון',
      yourIdeas: 'הרעיונות שלך',
      noIdeas: 'אין עדיין רעיונות. התחילו בכפתור שלמעלה.',
      step1: 'שלב 1 מתוך 2',
      step2: 'שלב 2 מתוך 2',
      ideaTitle: 'הרעיון שלך',
      name: 'שם קצר',
      nameHelp: 'איך אנשים יקראו לזה.',
      problem: 'הבעיה',
      problemHelp: 'מה מעצבן או קשה היום?',
      promise: 'ההבטחה שלך',
      promiseHelp: 'מה מקבל מי שמשתמש בזה?',
      mascot: 'בחרו קמע',
      next: 'הבא: למי זה מיועד?',
      back: 'חזרה',
      marketTitle: 'למי זה מיועד?',
      market: 'תארו את האנשים שאתם חושבים עליהם',
      marketHelp: 'כמה מילים פשוטות על מי הם ואיך הם חיים.',
      size: 'כמה אנשים יהיו בקבוצה?',
      fewer: 'פחות אנשים',
      more: 'יותר אנשים',
      ask: 'שאלו את הקבוצה',
      fillAll: 'נא למלא את כל התיבות לפני שממשיכים.',
      waitTitle: 'הקבוצה קוראת את הרעיון שלך…',
      waitLead: 'זה יכול לקחת דקה או שתיים. נא להשאיר את הדף פתוח.',
      synthetic: 'זו קבוצה מדומה: אנשים מן השורה שהומצאו, לא ביקוש אמיתי. השתמשו בה כדי לחדד את הרעיון לפני שתשאלו אנשים אמיתיים.',
      sourceSample: 'חוות דעת לדוגמה — לא מחובר מודל',
      sourceLive: 'חוות דעת מהמודל שחיברת',
      fellBack: 'לא הצלחנו להגיע למודל או שהתשובה לא הייתה שמישה, ולכן זו חוות דעת לדוגמה.',
      whoTitle: 'למי זה מיועד',
      mascotTitle: 'האם הקמע מתאים?',
      objections: 'ההתנגדויות העיקריות',
      unclear: 'מה לא היה ברור',
      asks: 'מה היו מבקשים',
      countsTitle: 'מה הקבוצה הייתה עושה',
      act_call: 'קובעים שיחה',
      act_pledge: 'מציעים לנסות',
      act_follow: 'עוקבים אחרי עדכונים',
      act_ignore: 'מתעלמים',
      would_call: 'קביעת שיחה',
      would_pledge: 'הצעה לנסות',
      would_follow: 'מעקב אחרי עדכונים',
      would_ignore: 'התעלמות',
      syntheticTag: 'מדומה',
      understood: 'מה הובן:',
      objection: 'התנגדות:',
      confused: 'מה בלבל:',
      asksFor: 'בקשה:',
      another: 'בדיקת רעיון נוסף',
      settingsTitle: 'הגדרות',
      settingsLead: 'שולחן עגול עובד בלי שום הכנה ומציג חוות דעת לדוגמה. אם יש לך מודל בינה מלאכותית משלך, אפשר לחבר אותו כאן ולקבל חוות דעת חיה. זה עובד עם כל שרת מודלים תואם OpenAI.',
      baseUrl: 'כתובת שרת המודל',
      baseUrlHelp: 'לדוגמה: http://localhost:11434/v1',
      model: 'שם המודל',
      modelHelp: 'שם המודל בשרת הזה.',
      key: 'מפתח גישה (לא חובה)',
      keyHelp: 'נשמר בדפדפן הזה בלבד. נשלח רק לכתובת שלמעלה.',
      keyStored: 'יש מפתח שמור. השאירו ריק כדי לשמור עליו.',
      save: 'שמירה',
      forget: 'שכח את המפתח',
      saved: 'נשמר.',
      forgotten: 'המפתח הוסר מהדפדפן הזה.',
      privacy: 'בלי חשבון, בלי פרסומות, בלי מעקב. הרעיונות נשארים בדפדפן הזה.',
      cat: 'חתול', fox: 'שועל', owl: 'ינשוף', bear: 'דוב', rabbit: 'ארנב', frog: 'צפרדע',
      emblem: 'סמל'
    }
  };

  /* ---------- Storage (this browser only) ---------- */

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ }
  }
  function loadLang() {
    var saved = null;
    try { saved = localStorage.getItem(KEYS.lang); } catch (e) { /* blocked */ }
    if (saved === 'en' || saved === 'he') return saved;
    return /^(he|iw)\b/i.test(navigator.language || '') ? 'he' : 'en';
  }
  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem(KEYS.lang, lang); } catch (e) { /* blocked */ }
    render();
  }
  function loadSettings() {
    var s = read(KEYS.settings, {}) || {};
    return { baseUrl: String(s.baseUrl || ''), model: String(s.model || ''), apiKey: String(s.apiKey || '') };
  }
  function loadIdeas() {
    var list = read(KEYS.ideas, []);
    return Array.isArray(list) ? list.filter(function (r) { return r && r.idea && r.output; }) : [];
  }
  function saveIdea(record) {
    var list = loadIdeas();
    list.unshift(record);
    write(KEYS.ideas, list.slice(0, MAX_IDEAS));
  }

  /* ---------- Small helpers ---------- */

  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key; }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function colorOf(animal) {
    for (var i = 0; i < ANIMALS.length; i++) if (ANIMALS[i].animal === animal) return ANIMALS[i].color;
    return ANIMALS[1].color;
  }
  function clampSize(n) { return Math.max(SIZE_MIN, Math.min(SIZE_MAX, Math.round(Number(n) || SIZE_DEFAULT))); }
  function hasHebrew(text) { return /[֐-׿]/.test(text); }
  /** The sample review is written in the language of the idea text. */
  function teaserLang(req) { return hasHebrew(req.name + req.problem + req.promise + req.market) ? 'he' : 'en'; }

  /* ---------- Mascot emblems (flat, one colour) ---------- */

  var EARS = {
    cat: '<path d="M20 38 L24 6 L48 26Z"/><path d="M80 38 L76 6 L52 26Z"/>',
    fox: '<path d="M16 40 L18 2 L46 26Z"/><path d="M84 40 L82 2 L54 26Z"/>',
    owl: '<path d="M22 30 L22 10 L40 22Z"/><path d="M78 30 L78 10 L60 22Z"/>',
    bear: '<circle cx="24" cy="24" r="13"/><circle cx="76" cy="24" r="13"/>',
    rabbit: '<ellipse cx="34" cy="14" rx="9" ry="24"/><ellipse cx="66" cy="14" rx="9" ry="24"/>',
    frog: '<circle cx="30" cy="26" r="14"/><circle cx="70" cy="26" r="14"/>'
  };
  function mascot(animal, size) {
    if (!EARS[animal]) animal = 'fox';
    var eyeY = animal === 'frog' ? 28 : 54;
    var eyeX = animal === 'frog' ? 20 : 15;
    return '<svg class="mark" width="' + size + '" height="' + size + '" viewBox="2 -14 96 108" role="img" aria-label="' +
      esc(t(animal) + ' — ' + t('emblem')) + '"><g fill="' + colorOf(animal) + '">' + EARS[animal] +
      '<ellipse cx="50" cy="56" rx="40" ry="34"/></g>' +
      '<circle cx="' + (50 - eyeX) + '" cy="' + eyeY + '" r="3.8" fill="#fff"/>' +
      '<circle cx="' + (50 + eyeX) + '" cy="' + eyeY + '" r="3.8" fill="#fff"/></svg>';
  }

  /* ---------- Sample panel (no model connected) ----------
     A fixed board of eight made-up people and simple rules built from the idea text.
     It is always labelled as a sample. It does not invent demand. */

  var SAMPLE_BOARD = [
    { id: 'p1', age: 34, action: 'call',
      en: { name: 'Maya', role: 'Busy parent', story: 'Works full time and plans every errand around two school pick-ups.', budget: 'Pays for things that save time', distrusts: 'Apps that ask for an account before showing anything' },
      he: { name: 'מאיה', role: 'הורה עסוקה', story: 'עובדת במשרה מלאה ומתכננת כל סידור סביב שני איסופים מבית הספר.', budget: 'משלמת על דברים שחוסכים זמן', distrusts: 'אפליקציות שדורשות חשבון לפני שהן מראות משהו' } },
    { id: 'p2', age: 61, action: 'ignore',
      en: { name: 'Yossi', role: 'Semi-retired', story: 'Does things the way he always has and phones a person when unsure.', budget: 'Rarely pays for apps', distrusts: 'Anything that needs his card details' },
      he: { name: 'יוסי', role: 'בפנסיה חלקית', story: 'עושה דברים כמו שתמיד עשה, ומתקשר לבן אדם כשהוא לא בטוח.', budget: 'כמעט לא משלם על אפליקציות', distrusts: 'כל דבר שדורש את פרטי הכרטיס שלו' } },
    { id: 'p3', age: 27, action: 'follow',
      en: { name: 'Lior', role: 'Early adopter', story: 'Tries new tools weekly and drops most of them within a month.', budget: 'Small monthly subscriptions', distrusts: 'Products with no clear owner' },
      he: { name: 'ליאור', role: 'אוהב לנסות דברים חדשים', story: 'מנסה כלים חדשים כל שבוע ועוזב את רובם בתוך חודש.', budget: 'מנויים חודשיים קטנים', distrusts: 'מוצרים שלא ברור מי עומד מאחוריהם' } },
    { id: 'p4', age: 45, action: 'pledge',
      en: { name: 'Rina', role: 'Office manager', story: 'Chooses tools for a small team and has to justify each one.', budget: 'Team budget, needs an invoice', distrusts: 'Promises with no numbers' },
      he: { name: 'רינה', role: 'מנהלת משרד', story: 'בוחרת כלים לצוות קטן וצריכה להצדיק כל אחד מהם.', budget: 'תקציב צוות, צריכה חשבונית', distrusts: 'הבטחות בלי מספרים' } },
    { id: 'p5', age: 38, action: 'ignore',
      en: { name: 'Amir', role: 'Sceptical professional', story: 'Already uses a workaround he built himself and is proud of it.', budget: 'Pays only for clear gains', distrusts: 'Replacing something that works' },
      he: { name: 'אמיר', role: 'איש מקצוע ספקן', story: 'כבר משתמש בפתרון שבנה בעצמו, וגאה בו.', budget: 'משלם רק על תועלת ברורה', distrusts: 'החלפה של משהו שעובד' } },
    { id: 'p6', age: 23, action: 'follow',
      en: { name: 'Noy', role: 'Student', story: 'Lives on her phone and shares anything useful with friends.', budget: 'Free tiers only', distrusts: 'Slow sign-up flows' },
      he: { name: 'נוי', role: 'סטודנטית', story: 'חיה בטלפון ומשתפת חברים בכל דבר שימושי.', budget: 'רק מה שבחינם', distrusts: 'הרשמות ארוכות ואיטיות' } },
    { id: 'p7', age: 52, action: 'follow',
      en: { name: 'Dov', role: 'Small business owner', story: 'Short on time and wary after two tools that shut down on him.', budget: 'Will pay once it is proven', distrusts: 'Young products that may disappear' },
      he: { name: 'דב', role: 'בעל עסק קטן', story: 'קצר בזמן וזהיר, אחרי ששני כלים שהשתמש בהם נסגרו.', budget: 'ישלם אחרי שזה יוכיח את עצמו', distrusts: 'מוצרים צעירים שעלולים להיעלם' } },
    { id: 'p8', age: 30, action: 'pledge',
      en: { name: 'Shira', role: 'Team lead', story: 'Runs a team of six and tests tools on herself first.', budget: 'Can expense a trial', distrusts: 'Vague privacy terms' },
      he: { name: 'שירה', role: 'ראש צוות', story: 'מנהלת צוות של שישה ובודקת כלים קודם על עצמה.', budget: 'יכולה לקבל החזר על תקופת ניסיון', distrusts: 'תנאי פרטיות מעורפלים' } }
  ];

  var SAMPLE_TEXT = {
    en: {
      understood: function (r) { return 'A product called ' + r.name + ' that promises: ' + r.promise; },
      confusionIgnore: 'Not clear why this is better than what I do today.',
      confusionOther: 'Not clear what I have to do first, or what it costs.',
      objection: function (d) { return 'As someone who distrusts ' + d.charAt(0).toLowerCase() + d.slice(1) + ', I would want proof before trying it.'; },
      askPledge: 'A way to try it with my own data for a week.',
      askOther: 'A one-line example of a real result.',
      topObjections: ['No proof yet that it works', 'Unclear what it costs', 'Unsure it beats what I already do'],
      confusingPoints: ['What the first step is', 'Who is behind the product'],
      featureRequests: ['A short real example', 'A trial with my own data']
    },
    he: {
      understood: function (r) { return 'מוצר בשם ' + r.name + ' שמבטיח: ' + r.promise; },
      confusionIgnore: 'לא ברור למה זה טוב יותר ממה שאני עושה היום.',
      confusionOther: 'לא ברור מה צריך לעשות קודם, או כמה זה עולה.',
      objection: function (d) { return 'קשה לי לסמוך על ' + d + ', ולכן ארצה הוכחה לפני שאנסה.'; },
      askPledge: 'דרך לנסות את זה עם הנתונים שלי במשך שבוע.',
      askOther: 'דוגמה בשורה אחת לתוצאה אמיתית.',
      topObjections: ['עדיין אין הוכחה שזה עובד', 'לא ברור כמה זה עולה', 'לא בטוח שזה טוב יותר ממה שאני כבר עושה'],
      confusingPoints: ['מה הצעד הראשון', 'מי עומד מאחורי המוצר'],
      featureRequests: ['דוגמה אמיתית קצרה', 'ניסיון עם הנתונים שלי']
    }
  };

  var MASCOT_TEXT = {
    en: {
      cat: ['calm, curious, at home', 'everyday helpers and personal tools', 'speed or teams', 'a fox or an owl'],
      fox: ['quick, clever, resourceful', 'shortcuts and time-savers', 'trust or calm', 'a bear or an owl'],
      owl: ['careful, patient, knowledgeable', 'advice, learning and planning', 'speed or fun', 'a fox or a rabbit'],
      bear: ['steady, strong, protective', 'money, safety and family matters', 'something light and quick', 'a rabbit or a fox'],
      rabbit: ['fast, light, friendly', 'quick errands and small daily tasks', 'trust or careful advice', 'an owl or a bear'],
      frog: ['playful, fresh, a little unusual', 'new habits and lighter moments', 'serious or sensitive matters', 'an owl or a bear']
    },
    he: {
      cat: ['רגוע, סקרן, ביתי', 'עוזרים יומיומיים וכלים אישיים', 'מהירות או עבודת צוות', 'שועל או ינשוף'],
      fox: ['זריז, חכם, מוצא פתרונות', 'קיצורי דרך וחיסכון בזמן', 'אמון או רוגע', 'דוב או ינשוף'],
      owl: ['זהיר, סבלני, יודע דבר', 'עצות, למידה ותכנון', 'מהירות או כיף', 'שועל או ארנב'],
      bear: ['יציב, חזק, מגן', 'כסף, ביטחון וענייני משפחה', 'משהו קליל ומהיר', 'ארנב או שועל'],
      rabbit: ['מהיר, קליל, ידידותי', 'סידורים זריזים ומשימות יומיות קטנות', 'אמון או עצה זהירה', 'ינשוף או דוב'],
      frog: ['שובב, רענן, קצת יוצא דופן', 'הרגלים חדשים ורגעים קלילים', 'עניינים רציניים או רגישים', 'ינשוף או דוב']
    }
  };

  function sentence(text) {
    var s = String(text || '').trim();
    return /[.!?…]$/.test(s) ? s : s + '.';
  }
  function whoHeuristic(req, lang) {
    var market = String(req.market || '').trim().replace(/[.!?…]+$/, '');
    if (lang === 'he') {
      return '"' + req.name + '" מיועד בעיקר ל: ' + market + '. ההבטחה להם היא: ' + sentence(req.promise) + ' מי שלא מרגיש את הבעיה הזו כנראה לא יישאר.';
    }
    return '"' + req.name + '" is aimed mainly at: ' + market + '. The promise to them is: ' + sentence(req.promise) + ' People who do not feel this problem will probably not stay.';
  }
  function mascotFitHeuristic(req, lang) {
    var animal = MASCOT_TEXT.en[req.animal] ? req.animal : 'fox';
    var m = MASCOT_TEXT[lang][animal];
    var label = I18N[lang][animal];
    if (lang === 'he') {
      return 'הקמע של ' + req.name + ' הוא ' + label + ': ' + m[0] + '. זה מתאים בדרך כלל ל' + m[1] + '. אם הרעיון עוסק יותר ב' + m[2] + ', ייתכן ש' + m[3] + ' יהיו ברורים יותר.';
    }
    return req.name + ' uses a ' + label.toLowerCase() + ' mascot: ' + m[0] + '. That often fits ' + m[1] + '. If this idea is more about ' + m[2] + ', ' + m[3] + ' might be clearer.';
  }

  function samplePanel(req) {
    var lang = teaserLang(req);
    var text = SAMPLE_TEXT[lang];
    var board = SAMPLE_BOARD.slice(0, req.size);
    return {
      personas: board.map(function (p) {
        var s = p[lang];
        return { id: p.id, name: s.name, age: p.age, role: s.role, story: s.story, budget: s.budget, distrusts: s.distrusts };
      }),
      reactions: board.map(function (p) {
        return {
          personaId: p.id,
          understood: text.understood(req),
          confusion: p.action === 'ignore' ? text.confusionIgnore : text.confusionOther,
          objection: text.objection(p[lang].distrusts),
          featureRequest: p.action === 'pledge' ? text.askPledge : text.askOther,
          action: p.action
        };
      }),
      summary: {
        topObjections: text.topObjections.slice(),
        confusingPoints: text.confusingPoints.slice(),
        featureRequests: text.featureRequests.slice()
      },
      whoItsFor: whoHeuristic(req, lang),
      mascotFit: mascotFitHeuristic(req, lang)
    };
  }

  /* ---------- Live panel (the visitor's own model server) ---------- */

  var PANEL_SYSTEM = 'You simulate a research panel for an early product idea. You invent distinct, realistic people from the target market described by the user, then have each one react to the idea\'s public teaser in their own voice.\n\n' +
    'The panel exists to find what is unclear and what people would object to before real people are asked, so honest friction is the useful output. Real panels are mixed: some people are indifferent, some are sceptical, some already use an alternative they like. Reflect that spread, and let personas differ in age, income, habits and attitude to new products. A persona who would not care should say so and choose "ignore".\n\n' +
    'For each persona give: what they understood the product to be, what confused them, their main objection, one feature they would ask for, and the single action they would most plausibly take (ignore, follow for updates, pledge time to test it, or book a call with the team). Then summarise the most common objections, confusing points and feature requests across the panel, most frequent first.\n\n' +
    'Also add two short, plain-language takes (2–3 sentences each, no jargon):\n\n' +
    '"whoItsFor": who this idea is really for, based on the market and the teaser.\n' +
    '"mascotFit": whether the chosen mascot (name and animal) fits the idea, and why or why not. Suggest a better animal from this list only if it fits poorly: cat, fox, owl, bear, rabbit, frog.\n\n' +
    'Write personas as ordinary individuals, not stereotypes of a group. Base reactions only on the teaser text provided. Write in the same language as the idea teaser (English or Hebrew).';

  var FORMAT_NOTE = '\n\nAnswer with one JSON object and nothing else, in exactly this shape:\n' +
    '{\n' +
    '  "personas": [{ "id": "p1", "name": "string", "age": 0, "role": "string", "story": "string", "budget": "string", "distrusts": "string" }],\n' +
    '  "reactions": [{ "personaId": "p1", "understood": "string", "confusion": "string", "objection": "string", "featureRequest": "string", "action": "ignore" }],\n' +
    '  "summary": { "topObjections": ["string"], "confusingPoints": ["string"], "featureRequests": ["string"] },\n' +
    '  "whoItsFor": "string",\n' +
    '  "mascotFit": "string"\n' +
    '}\n' +
    'Persona ids are p1, p2, and so on. There is exactly one reaction per persona, with a matching "personaId". "action" is exactly one of: ignore, follow, pledge, call.';

  function panelUserMessage(req) {
    var animal = EARS[req.animal] ? req.animal : 'fox';
    return 'Target market: ' + req.market + '\n\n' +
      'Idea name: ' + req.name + '\n' +
      'Problem (as shown publicly): ' + req.problem + '\n' +
      'Promise (as shown publicly): ' + req.promise + '\n' +
      'Mascot: ' + animal + ' (named in the interface as “' + I18N[teaserLang(req)][animal] + '”)\n\n' +
      'Create a panel of ' + req.size + ' people from this market and give each one\'s reaction. Also include whoItsFor and mascotFit.';
  }

  /** Pull the JSON object out of an answer that may be wrapped in a code fence or in reasoning text. */
  function extractJson(answer) {
    var cleaned = String(answer || '').replace(/<think>[\s\S]*?<\/think>/g, '');
    var start = cleaned.indexOf('{'), end = cleaned.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('no JSON object in the answer');
    return JSON.parse(cleaned.slice(start, end + 1));
  }

  /** Check an answer: right shape, right number of people, one reaction per person. */
  function checkPanel(raw, size) {
    if (!raw || typeof raw !== 'object') return { ok: false, why: 'the answer is not a JSON object' };
    if (!Array.isArray(raw.personas)) return { ok: false, why: 'personas: must be a list' };
    if (!Array.isArray(raw.reactions)) return { ok: false, why: 'reactions: must be a list' };
    var s = raw.summary;
    if (!s || typeof s !== 'object') return { ok: false, why: 'summary: is required' };
    if (!Array.isArray(s.topObjections) || !Array.isArray(s.confusingPoints) || !Array.isArray(s.featureRequests)) {
      return { ok: false, why: 'summary: topObjections, confusingPoints and featureRequests must be lists' };
    }
    if (raw.personas.length !== size) return { ok: false, why: 'expected ' + size + ' personas, got ' + raw.personas.length };
    var ids = {};
    for (var i = 0; i < raw.personas.length; i++) {
      var p = raw.personas[i];
      if (!p || typeof p !== 'object' || p.id == null || String(p.id) === '') return { ok: false, why: 'every persona needs an id' };
      if (typeof p.name !== 'string' || !p.name.trim()) return { ok: false, why: 'every persona needs a name' };
      if (ids[String(p.id)]) return { ok: false, why: 'persona ids are not unique' };
      ids[String(p.id)] = true;
    }
    if (raw.reactions.length !== size) return { ok: false, why: 'there must be exactly one reaction per persona, with a matching personaId' };
    var seen = {};
    for (var j = 0; j < raw.reactions.length; j++) {
      var r = raw.reactions[j];
      var pid = r && typeof r === 'object' ? String(r.personaId) : '';
      if (!ids[pid] || seen[pid]) return { ok: false, why: 'there must be exactly one reaction per persona, with a matching personaId' };
      seen[pid] = true;
      if (ACTIONS.indexOf(r.action) < 0) return { ok: false, why: 'action must be exactly one of: ignore, follow, pledge, call' };
    }
    return { ok: true, panel: raw };
  }

  function timeoutSignal(ms) {
    if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) return AbortSignal.timeout(ms);
    var c = new AbortController();
    setTimeout(function () { c.abort(); }, ms);
    return c.signal;
  }

  /** Ask the connected model. Two attempts. Returns the checked panel, or null. */
  async function askModel(settings, req) {
    var messages = [
      { role: 'system', content: PANEL_SYSTEM },
      { role: 'user', content: panelUserMessage(req) + FORMAT_NOTE }
    ];
    var useFormat = true;
    var headers = { 'content-type': 'application/json' };
    if (settings.apiKey) headers.authorization = 'Bearer ' + settings.apiKey;
    var url = settings.baseUrl.replace(/\/+$/, '') + '/chat/completions';
    function ask() {
      var body = { model: settings.model, messages: messages, temperature: 0.8, max_tokens: 700 * req.size + 800, stream: false };
      if (useFormat) body.response_format = { type: 'json_object' };
      return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body), signal: timeoutSignal(240000) });
    }
    for (var attempt = 0; attempt < 2; attempt++) {
      var answer = '';
      try {
        var res = await ask();
        // Some model servers refuse the JSON setting; ask again without it.
        if (!res.ok && useFormat && [400, 422, 500, 501].indexOf(res.status) >= 0) { useFormat = false; res = await ask(); }
        if (!res.ok) continue;
        var data = await res.json().catch(function () { return null; });
        answer = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
      } catch (e) { continue; }
      var result;
      try { result = checkPanel(extractJson(answer), req.size); }
      catch (err) { result = { ok: false, why: err && err.message ? err.message : 'unreadable answer' }; }
      if (result.ok) return result.panel;
      messages.push(
        { role: 'assistant', content: String(answer).slice(0, 6000) },
        { role: 'user', content: 'That answer was not usable: ' + result.why + '. Send the complete JSON object again, corrected.' }
      );
    }
    return null;
  }

  function text(value) { return value == null ? '' : String(value); }
  function textList(list) { return list.map(text).filter(function (s) { return s.trim(); }); }
  /** Keep only the fields the app shows, as plain text, and fill in the two short takes if they are missing. */
  function tidyPanel(panel, req) {
    var lang = teaserLang(req);
    return {
      personas: panel.personas.map(function (p) {
        return { id: text(p.id), name: text(p.name), age: p.age, role: text(p.role), story: text(p.story), budget: text(p.budget), distrusts: text(p.distrusts) };
      }),
      reactions: panel.reactions.map(function (r) {
        return { personaId: text(r.personaId), understood: text(r.understood), confusion: text(r.confusion), objection: text(r.objection), featureRequest: text(r.featureRequest), action: r.action };
      }),
      summary: {
        topObjections: textList(panel.summary.topObjections),
        confusingPoints: textList(panel.summary.confusingPoints),
        featureRequests: textList(panel.summary.featureRequests)
      },
      whoItsFor: typeof panel.whoItsFor === 'string' && panel.whoItsFor.trim() ? panel.whoItsFor.trim() : whoHeuristic(req, lang),
      mascotFit: typeof panel.mascotFit === 'string' && panel.mascotFit.trim() ? panel.mascotFit.trim() : mascotFitHeuristic(req, lang)
    };
  }

  async function runPanel() {
    var d = state.draft;
    var req = { name: d.name.trim(), problem: d.problem.trim(), promise: d.promise.trim(), market: d.market.trim(), animal: d.animal, size: clampSize(d.size) };
    var settings = loadSettings();
    var connected = Boolean(settings.baseUrl.trim() && settings.model.trim());
    var output = null, source = 'sample', fellBack = false;
    if (connected) {
      go('wait');
      var panel = await askModel({ baseUrl: settings.baseUrl.trim(), model: settings.model.trim(), apiKey: settings.apiKey }, req);
      if (panel) { output = tidyPanel(panel, req); source = 'ai'; } else { fellBack = true; }
    }
    if (!output) output = samplePanel(req);
    var record = {
      id: 'i' + Date.now().toString(36),
      at: Date.now(),
      idea: { name: req.name, problem: req.problem, promise: req.promise, animal: req.animal },
      market: req.market,
      size: req.size,
      source: source,
      fellBack: fellBack,
      output: output
    };
    saveIdea(record);
    state.review = record;
    state.draft = newDraft();
    go('results');
  }

  /* ---------- State and screens ---------- */

  function newDraft() { return { name: '', problem: '', promise: '', animal: 'fox', market: '', size: SIZE_DEFAULT }; }

  var state = { lang: loadLang(), screen: 'home', draft: newDraft(), review: null, note: '', error: '' };
  var app = document.getElementById('app');

  function go(screen) {
    state.screen = screen;
    state.error = '';
    if (screen !== 'settings') state.note = '';
    render();
    window.scrollTo(0, 0);
    var h = app.querySelector('h1');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }

  function field(id, key, limit, multiline, helpKey) {
    var value = state.draft[id] || '';
    var attrs = 'id="f-' + id + '" data-field="' + id + '" maxlength="' + limit + '" dir="auto" aria-describedby="h-' + id + '"';
    var control = multiline
      ? '<textarea ' + attrs + ' rows="' + (limit > 400 ? 5 : 3) + '">' + esc(value) + '</textarea>'
      : '<input type="text" ' + attrs + ' value="' + esc(value) + '" autocomplete="off">';
    return '<div class="field"><label for="f-' + id + '">' + esc(t(key)) + '</label>' + control +
      '<div class="help" id="h-' + id + '"><span>' + esc(t(helpKey)) + '</span><span class="count" data-count="' + id + '" dir="ltr">' + value.length + ' / ' + limit + '</span></div></div>';
  }

  function list(titleKey, items) {
    if (!items || !items.length) return '';
    return '<h3>' + esc(t(titleKey)) + '</h3><ul>' + items.map(function (i) { return '<li dir="auto">' + esc(i) + '</li>'; }).join('') + '</ul>';
  }

  function viewHome() {
    var ideas = loadIdeas();
    var rows = ideas.map(function (r) {
      return '<button type="button" class="idea-row" data-act="open" data-id="' + esc(r.id) + '">' + mascot(r.idea.animal, 40) +
        '<span><b dir="auto">' + esc(r.idea.name) + '</b><small dir="auto">' + esc(r.idea.promise) + '</small></span></button>';
    }).join('');
    return '<section class="card"><h1>' + esc(t('homeTitle')) + '</h1><p class="lead">' + esc(t('homeLead')) + '</p>' +
      '<button type="button" class="wide" data-act="new">' + esc(t('review')) + '</button></section>' +
      (ideas.length ? '<h2 class="mute" style="margin:4px 0 10px">' + esc(t('yourIdeas')) + '</h2>' + rows : '<p class="mute">' + esc(t('noIdeas')) + '</p>');
  }

  function viewIdea() {
    var picker = ANIMALS.map(function (a) {
      return '<button type="button" data-act="animal" data-animal="' + a.animal + '" aria-pressed="' + (state.draft.animal === a.animal) + '">' +
        mascot(a.animal, 44) + '<span>' + esc(t(a.animal)) + '</span></button>';
    }).join('');
    return '<form class="card" data-form="idea" novalidate><p class="step">' + esc(t('step1')) + '</p><h1>' + esc(t('ideaTitle')) + '</h1><div style="height:14px"></div>' +
      field('name', 'name', LIMITS.name, false, 'nameHelp') +
      field('problem', 'problem', LIMITS.problem, true, 'problemHelp') +
      field('promise', 'promise', LIMITS.promise, true, 'promiseHelp') +
      '<div class="field"><label id="l-mascot">' + esc(t('mascot')) + '</label><div class="animals" role="group" aria-labelledby="l-mascot">' + picker + '</div></div>' +
      errorBox() +
      '<div class="actions"><button type="submit" class="wide">' + esc(t('next')) + '</button>' +
      '<button type="button" class="ghost wide" data-act="home">' + esc(t('back')) + '</button></div></form>';
  }

  function viewMarket() {
    var size = clampSize(state.draft.size);
    return '<form class="card" data-form="market" novalidate><p class="step">' + esc(t('step2')) + '</p><h1>' + esc(t('marketTitle')) + '</h1><div style="height:14px"></div>' +
      field('market', 'market', LIMITS.market, true, 'marketHelp') +
      '<div class="field"><label id="l-size">' + esc(t('size')) + '</label><div class="stepper" role="group" aria-labelledby="l-size">' +
      '<button type="button" class="ghost" data-act="fewer" aria-label="' + esc(t('fewer')) + '"' + (size <= SIZE_MIN ? ' disabled' : '') + '>−</button>' +
      '<output id="size-out" aria-live="polite">' + size + '</output>' +
      '<button type="button" class="ghost" data-act="more" aria-label="' + esc(t('more')) + '"' + (size >= SIZE_MAX ? ' disabled' : '') + '>+</button></div></div>' +
      errorBox() +
      '<div class="actions"><button type="submit" class="wide">' + esc(t('ask')) + '</button>' +
      '<button type="button" class="ghost wide" data-act="idea">' + esc(t('back')) + '</button></div></form>';
  }

  function viewWait() {
    return '<section class="card wait"><div class="dot" aria-hidden="true"></div><h1>' + esc(t('waitTitle')) + '</h1><p class="lead">' + esc(t('waitLead')) + '</p></section>' +
      '<p class="banner">' + esc(t('synthetic')) + '</p>';
  }

  function viewResults() {
    var r = state.review;
    if (!r) return viewHome();
    var o = r.output, total = o.reactions.length;
    var counts = { call: 0, pledge: 0, follow: 0, ignore: 0 };
    var byPersona = {};
    o.reactions.forEach(function (x) { if (counts[x.action] != null) counts[x.action]++; byPersona[x.personaId] = x; });
    var table = ACTIONS.map(function (a) {
      return '<tr><td>' + esc(t('act_' + a)) + '</td><td class="num" dir="ltr">' + counts[a] + ' / ' + total + '</td></tr>';
    }).join('');
    var people = o.personas.map(function (p) {
      var x = byPersona[p.id] || {};
      var who = [p.role, t('syntheticTag')].filter(Boolean).join(' · ');
      var age = p.age === 0 || p.age ? ', ' + p.age : '';
      return '<article class="card persona"><h2 dir="auto">' + esc(p.name + age) + '</h2><p class="who">' + esc(who) + '</p>' +
        (p.story ? '<p class="story" dir="auto">' + esc(p.story) + '</p>' : '') + '<dl>' +
        '<dt>' + esc(t('understood')) + '</dt><dd dir="auto">' + esc(x.understood) + '</dd>' +
        '<dt>' + esc(t('objection')) + '</dt><dd dir="auto">' + esc(x.objection) + '</dd>' +
        '<dt>' + esc(t('confused')) + '</dt><dd dir="auto">' + esc(x.confusion) + '</dd>' +
        '<dt>' + esc(t('asksFor')) + '</dt><dd dir="auto">' + esc(x.featureRequest) + '</dd></dl>' +
        '<span class="pill a-' + esc(x.action) + '">' + esc(t('would_' + x.action)) + '</span></article>';
    }).join('');
    var summary = list('objections', o.summary.topObjections) + list('unclear', o.summary.confusingPoints) + list('asks', o.summary.featureRequests);
    return '<p class="banner" role="note">' + esc(t('synthetic')) + '</p>' +
      (r.fellBack ? '<p class="banner soft">' + esc(t('fellBack')) + '</p>' : '') +
      '<p class="source"><span class="pill ' + (r.source === 'ai' ? 'live' : 'sample') + '">' + esc(t(r.source === 'ai' ? 'sourceLive' : 'sourceSample')) + '</span></p>' +
      '<section class="card idea-head">' + mascot(r.idea.animal, 56) + '<div><h1 dir="auto">' + esc(r.idea.name) + '</h1><p dir="auto">' + esc(r.idea.promise) + '</p></div></section>' +
      '<section class="card"><h2>' + esc(t('whoTitle')) + '</h2><p dir="auto" style="margin-top:6px">' + esc(o.whoItsFor) + '</p></section>' +
      '<section class="card"><h2>' + esc(t('mascotTitle')) + '</h2><p dir="auto" style="margin-top:6px">' + esc(o.mascotFit) + '</p></section>' +
      (summary ? '<section class="card">' + summary + '</section>' : '') +
      '<section class="card"><h2>' + esc(t('countsTitle')) + '</h2><table><tbody>' + table + '</tbody></table></section>' +
      '<div class="personas">' + people + '</div>' +
      '<div class="actions"><button type="button" class="wide" data-act="new">' + esc(t('another')) + '</button>' +
      '<button type="button" class="ghost wide" data-act="home">' + esc(t('back')) + '</button></div>';
  }

  function viewSettings() {
    var s = loadSettings();
    function row(id, key, helpKey, type, value, extra) {
      return '<div class="field"><label for="s-' + id + '">' + esc(t(key)) + '</label>' +
        '<input class="ltr" dir="ltr" type="' + type + '" id="s-' + id + '" value="' + esc(value) + '" autocomplete="off" autocapitalize="off" spellcheck="false" ' + (extra || '') + '>' +
        '<div class="help"><span>' + esc(t(helpKey)) + '</span></div></div>';
    }
    return '<form class="card" data-form="settings" novalidate><h1>' + esc(t('settingsTitle')) + '</h1><p class="lead">' + esc(t('settingsLead')) + '</p>' +
      row('baseUrl', 'baseUrl', 'baseUrlHelp', 'url', s.baseUrl, 'inputmode="url"') +
      row('model', 'model', 'modelHelp', 'text', s.model) +
      // A stored key is never shown again; dots only say that one exists.
      row('apiKey', 'key', s.apiKey ? 'keyStored' : 'keyHelp', 'password', '', s.apiKey ? 'placeholder="••••••••"' : '') +
      (state.note ? '<p class="banner ok" role="status">' + esc(state.note) + '</p>' : '') +
      '<div class="actions"><button type="submit" class="wide">' + esc(t('save')) + '</button>' +
      (s.apiKey ? '<button type="button" class="ghost wide" data-act="forget">' + esc(t('forget')) + '</button>' : '') +
      '<button type="button" class="ghost wide" data-act="home">' + esc(t('back')) + '</button></div></form>' +
      '<p class="mute">' + esc(t('privacy')) + '</p>';
  }

  function errorBox() { return state.error ? '<p class="banner" role="alert">' + esc(state.error) + '</p>' : ''; }

  var VIEWS = { home: viewHome, idea: viewIdea, market: viewMarket, wait: viewWait, results: viewResults, settings: viewSettings };

  function render() {
    var html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === 'he' ? 'rtl' : 'ltr';
    document.title = t('title') + ' — Soya Productions';
    setText('brand-title', t('title'));
    setText('lang-toggle', t('otherLang'));
    setText('open-settings', t('settings'));
    setText('credit', t('credit'));
    setText('install', t('install'));
    setText('splash-presents', t('presents'));
    setText('splash-title', t('title'));
    setText('splash-skip', t('skip'));
    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.setAttribute('lang', state.lang === 'he' ? 'en' : 'he');
    app.innerHTML = (VIEWS[state.screen] || viewHome)();
    document.dispatchEvent(new CustomEvent('roundtable:lang'));
  }
  function setText(id, value) { var el = document.getElementById(id); if (el) el.textContent = value; }

  /* ---------- Events ---------- */

  function syncDraft() {
    var fields = app.querySelectorAll('[data-field]');
    for (var i = 0; i < fields.length; i++) state.draft[fields[i].getAttribute('data-field')] = fields[i].value;
  }

  app.addEventListener('input', function (e) {
    var id = e.target.getAttribute && e.target.getAttribute('data-field');
    if (!id) return;
    state.draft[id] = e.target.value;
    var counter = app.querySelector('[data-count="' + id + '"]');
    if (counter) counter.textContent = e.target.value.length + ' / ' + LIMITS[id];
  });

  app.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!el) return;
    var act = el.getAttribute('data-act');
    syncDraft();
    if (act === 'new') { state.draft = newDraft(); go('idea'); }
    else if (act === 'home') go('home');
    else if (act === 'idea') go('idea');
    else if (act === 'open') {
      var id = el.getAttribute('data-id');
      var found = loadIdeas().filter(function (r) { return r.id === id; })[0];
      if (found) { state.review = found; go('results'); }
    } else if (act === 'animal') {
      state.draft.animal = el.getAttribute('data-animal');
      var buttons = app.querySelectorAll('[data-act="animal"]');
      for (var i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', String(buttons[i] === el));
    } else if (act === 'fewer' || act === 'more') {
      state.draft.size = clampSize(clampSize(state.draft.size) + (act === 'more' ? 1 : -1));
      app.querySelector('#size-out').textContent = state.draft.size;
      app.querySelector('[data-act="fewer"]').disabled = state.draft.size <= SIZE_MIN;
      app.querySelector('[data-act="more"]').disabled = state.draft.size >= SIZE_MAX;
    } else if (act === 'forget') {
      var s = loadSettings();
      write(KEYS.settings, { baseUrl: s.baseUrl, model: s.model, apiKey: '' });
      state.note = t('forgotten');
      render();
    }
  });

  app.addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target.getAttribute('data-form');
    syncDraft();
    var d = state.draft;
    if (form === 'idea') {
      if (!d.name.trim() || !d.problem.trim() || !d.promise.trim()) { state.error = t('fillAll'); render(); return; }
      go('market');
    } else if (form === 'market') {
      if (!d.market.trim()) { state.error = t('fillAll'); render(); return; }
      runPanel();
    } else if (form === 'settings') {
      var old = loadSettings();
      var key = app.querySelector('#s-apiKey').value;
      // An empty key box keeps the key that is already saved.
      write(KEYS.settings, {
        baseUrl: app.querySelector('#s-baseUrl').value.trim(),
        model: app.querySelector('#s-model').value.trim(),
        apiKey: key ? key : old.apiKey
      });
      state.note = t('saved');
      render();
    }
  });

  document.getElementById('brand').addEventListener('click', function () { if (state.screen !== 'wait') go('home'); });
  document.getElementById('open-settings').addEventListener('click', function () { if (state.screen !== 'wait') { syncDraft(); go('settings'); } });
  document.getElementById('lang-toggle').addEventListener('click', function () { syncDraft(); setLang(state.lang === 'he' ? 'en' : 'he'); });

  /* ---------- Intro: shown once per tab session, skippable ---------- */

  function intro() {
    var splash = document.getElementById('splash');
    var seen = false;
    try { seen = sessionStorage.getItem(KEYS.splash) === '1'; } catch (e) { /* blocked */ }
    if (!splash || seen) return;
    splash.hidden = false;
    var timer = setTimeout(close, 4000);
    function close() {
      clearTimeout(timer);
      splash.hidden = true;
      try { sessionStorage.setItem(KEYS.splash, '1'); } catch (e) { /* blocked */ }
    }
    var skip = document.getElementById('splash-skip');
    skip.addEventListener('click', close);
    skip.focus({ preventScroll: true });
  }

  render();
  intro();
})();
