(() => {
  'use strict';



  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => element.classList.add('show'));
  }

  const slider = document.getElementById('new400Slider');
  const slides = [...document.querySelectorAll('#new400Slider .slide')];
  const thumbs = [...document.querySelectorAll('#new400Thumbs .thumb')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;

  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === current);
      thumb.setAttribute('aria-pressed', i === current ? 'true' : 'false');
    });
  };
  const stopSlides = () => { if (timer) clearInterval(timer); timer = null; };
  const startSlides = () => {
    stopSlides();
    if (!reducedMotion && !document.hidden && slides.length > 1) {
      timer = setInterval(() => showSlide(current + 1), 5000);
    }
  };
  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => {
    showSlide(i);
    startSlides();
  }));
  slider?.addEventListener('mouseenter', stopSlides);
  slider?.addEventListener('mouseleave', startSlides);
  slider?.addEventListener('focusin', stopSlides);
  slider?.addEventListener('focusout', event => {
    if (!slider.contains(event.relatedTarget)) startSlides();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopSlides() : startSlides());
  startSlides();

  document.querySelectorAll('.model-footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const TEXT_EN = {
    'STARTSEITE': 'HOME', 'WOHNWAGEN': 'CARAVANS', 'SERVICE': 'SERVICE',
    'ÜBER UNS': 'ABOUT US', 'KONTAKT': 'CONTACT', 'Zurück': 'Back',
    'Wohnwagen, Caravan-Beratung und Service.': 'Caravans, caravan advice and service.',
    'Deutschland': 'Germany', 'Kontakt aufnehmen': 'Get in touch',
    'ANKER Caravan. Alle Rechte vorbehalten.': 'ANKER Caravan. All rights reserved.',
    'Impressum': 'Legal notice', 'Datenschutz': 'Privacy',
    'Zwei Schlafvarianten · Autark-Paket': 'Two sleeping layouts · Off-grid package',
    'Wohnwagen New 400': 'New 400 caravan',
    'Der New 400 bietet auf 4,00 m Aufbaulänge zwei wählbare Schlafvarianten, eine umfangreiche Serienausstattung und Komfort für unabhängige Reisen.': 'The New 400 has a 4.00 m body length, two sleeping layouts, extensive standard equipment and comfort for independent travel.',
    'Grundriss': 'Floor plan',
    'Layout-Beispiel mit Stockbett': 'Example layout with bunk bed',
    'Technische Daten': 'Technical specifications',
    'Länge:': 'Body length:', 'Länge mit Deichsel:': 'Length including drawbar:',
    'Breite:': 'Width:', 'Höhe:': 'Height:', 'Stehhöhe:': 'Interior standing height:',
    'Technisch zulässiges Gesamtgewicht:': 'Technically permissible gross weight:',
    'Schlafvarianten': 'Sleeping layouts',
    'Wählen Sie den Grundriss, der zu Ihrer Reise passt.': 'Choose the layout that suits your journey.',
    'Option 1: Festbett': 'Option 1: Fixed bed',
    'Umbaubare Tisch-/Bettfläche: 110 × 194 cm': 'Convertible table/bed area: 110 × 194 cm',
    'Festes Bett: 140 × 194 cm': 'Fixed bed: 140 × 194 cm',
    'Option 2: Stockbett': 'Option 2: Bunk beds',
    'Umbaubare Sitzgruppe/Bettfläche: 155 × 194 cm': 'Convertible seating/bed area: 155 × 194 cm',
    'Stockbetten: 65 × 195 cm': 'Bunk beds: 65 × 195 cm',
    'Umfangreiche Serienausstattung': 'Extensive standard equipment',
    'Der New 400 wird bereits ab Werk mit einer umfangreichen Grundausstattung geliefert.': 'The New 400 comes with extensive equipment as standard.',
    'Energie & Komfort': 'Power & comfort',
    '2-kW-Diesel-Standheizung': '2 kW diesel heater',
    'Autark-Paket: Solaranlage mit 150-Ah-Gelbatterie, MPPT-Laderegler und Wechselrichter bis 1.200 W (Lithium gegen Aufpreis)': 'Off-grid package: solar panels, 150 Ah gel battery, MPPT charge controller and inverter up to 1,200 W (lithium battery at extra cost)',
    'Außenkocher mit Gas oder Strom': 'Outdoor gas or electric cooker',
    '90-Liter-Kühlschrank, 12 V': '90-litre 12 V refrigerator',
    'Markise': 'Awning',
    'Außen & Fahrwerk': 'Exterior & chassis',
    'Alle Fenster mit Ausstellmechanismus, Fliegengittern und Verdunklungsrollos': 'All windows with opening mechanism, fly screens and blackout blinds',
    'Front-Stauraumbox und Heckstoßfänger aus Fiberglas': 'Front storage box and rear bumper made of fibreglass',
    'Gebremste AL-KO-Achsen': 'Braked AL-KO axles',
    'AL-KO-Auflaufbremse': 'AL-KO overrun brake',
    'AL-KO-Antischlingerkupplung': 'AL-KO anti-sway coupling',
    'Vier Stützfüße': 'Four stabiliser legs',
    'Innenraum & Küche': 'Interior & kitchen',
    'Maßgefertigte Möbel in moderner Optik': 'Custom-made furniture with a modern finish',
    'Innen- und Außenbeleuchtung': 'Interior and exterior lighting',
    '220-Volt-Stromanschluss inklusive Kabel': '220 V power connection including cable',
    'Chromspüle mit Wasserhahn': 'Chrome sink with tap',
    'Elektro-Doppel-Einbaukocher': 'Built-in two-ring electric hob',
    'Teppiche, Läufer und Platzsets': 'Carpets, runners and placemats',
    'Wasser & Sanitär': 'Water & sanitation',
    '12-Volt-Wasserpumpe': '12 V water pump',
    '100-Liter-Frischwassertank mit Außenbefüllung': '100-litre fresh-water tank with external filling point',
    'Außendusche': 'Outdoor shower',
    'Waschbecken im Bad mit ausziehbarem Wasserhahn zum Duschen und Duschtasse mit Wasserablauf': 'Bathroom basin with pull-out tap for showering and a shower tray with drain',
    'Mobile Campingtoilette (Kassettentoilette gegen Aufpreis)': 'Portable camping toilet (cassette toilet at extra cost)',
    'Sicherheit und Zulassung': 'Safety and registration',
    'TÜV-Abnahme und deutsche Fahrzeugpapiere': 'TÜV inspection and German vehicle documents',
    'Fertigung nach deutschen und europäischen Standards': 'Manufactured to German and European standards',
    'Zulassungsservice auf Wunsch möglich': 'Registration service available on request',
    'Anfrage': 'Enquiry',
    'Bei Interesse können Sie uns direkt kontaktieren.': 'Contact us directly if you are interested.'
  };
  const ATTR_EN = {
    'Wohnwagen New 400, Seitenansicht': 'Side view of the New 400 caravan',
    'Hauptmenü': 'Main menu',
    'Sprache ändern': 'Change language',
    'Sprache auswählen': 'Select language',
    'New 400 Bildergalerie': 'New 400 photo gallery',
    'New 400 Galerie Vorschau': 'New 400 gallery thumbnails',
    'New 400 Modellinformationen': 'New 400 model information',
    'Bild 1 anzeigen': 'Show image 1', 'Bild 2 anzeigen': 'Show image 2',
    'Bild 3 anzeigen': 'Show image 3', 'Bild 4 anzeigen': 'Show image 4',
    'Bild 5 anzeigen': 'Show image 5',
    'New 400, Seitenansicht vor dem ANKARAVAN Gebäude': 'Side view of the New 400 caravan outside the ANKARAVAN building',
    'New 400, Ansicht von vorne und von der Seite': 'Front and side view of the New 400 caravan',
    'New 400, Sitzgruppe und Innenraum': 'New 400 seating area and interior',
    'New 400, Küche und Schlafbereich': 'New 400 kitchen and sleeping area',
    'New 400, Stauraum und Kühlschrank': 'New 400 storage and refrigerator',
    'Grundriss des New 400 mit Sitzgruppe, Küche, Dusche und Stockbett': 'New 400 floor plan with seating, kitchen, shower and bunk bed'
  };
  const META = {
    de_title: 'Wohnwagen New 400 – ANKER Caravan',
    en_title: 'New 400 caravan – ANKER Caravan',
    de_desc: 'Wohnwagen New 400 mit zwei Schlafvarianten, Autark-Paket und umfangreicher Serienausstattung.',
    en_desc: 'New 400 caravan with two sleeping layouts, an off-grid package and extensive standard equipment.'
  };

  const key = 'anker_caravan_language_v1';
  let lang = 'de';
  try { lang = localStorage.getItem(key) === 'en' ? 'en' : 'de'; } catch (error) { /* storage may be disabled */ }
  const switcher = document.getElementById('ankerLanguageSwitcher');
  const button = document.getElementById('ankerLanguageButton');
  const menu = document.getElementById('ankerLanguageMenu');
  const flag = document.getElementById('ankerLanguageCurrentFlag');
  const code = document.getElementById('ankerLanguageCode');
  const options = [...document.querySelectorAll('.anker-language-option[data-language]')];
  const setOpen = open => {
    switcher?.classList.toggle('is-open', open);
    button?.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  flag.src = lang === 'en' ? 'images/gb.png' : 'images/de.png';
  flag.alt = lang === 'en' ? 'English' : 'Deutsch';
  code.textContent = lang.toUpperCase();
  button.setAttribute('aria-label', lang === 'en' ? 'Change language' : 'Sprache ändern');
  menu.setAttribute('aria-label', lang === 'en' ? 'Select language' : 'Sprache auswählen');
  options.forEach(option => {
    const active = option.dataset.language === lang;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-current', active ? 'true' : 'false');
    option.addEventListener('click', () => {
      if (active) return setOpen(false);
      try { localStorage.setItem(key, option.dataset.language); } catch (error) { /* storage may be disabled */ }
      location.reload();
    });
  });
  button.addEventListener('click', event => { event.stopPropagation(); setOpen(!switcher.classList.contains('is-open')); });
  document.addEventListener('click', event => { if (!switcher.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });

  document.documentElement.lang = lang === 'en' ? 'en-GB' : 'de-DE';
  document.title = lang === 'en' ? META.en_title : META.de_title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = lang === 'en' ? META.en_desc : META.de_desc;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.content = description.content;
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.content = document.title;
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.content = description.content;
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.content = lang === 'en' ? 'en_GB' : 'de_DE';

  if (lang === 'en') {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement?.closest('.anker-language-switcher,script,style,noscript,textarea')) continue;
      const original = node.nodeValue.trim();
      if (Object.hasOwn(TEXT_EN, original)) node.nodeValue = node.nodeValue.replace(original, TEXT_EN[original]);
    }
    document.querySelectorAll('[aria-label],[title],[placeholder],[alt]').forEach(element => {
      if (element.closest('.anker-language-switcher')) return;
      for (const attribute of ['aria-label','title','placeholder','alt']) {
        const original = element.getAttribute(attribute);
        if (original && Object.hasOwn(ATTR_EN, original)) element.setAttribute(attribute, ATTR_EN[original]);
      }
    });
  }
})();
