/* ============================================
   PASTA ROSA RESTAURANT - JAVASCRIPT
   ============================================ */

// Language data
const translations = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-about': 'About Us',
    'nav-menu': 'Menu',
    'nav-gallery': 'Gallery',
    'nav-reservations': 'Reservations',
    'nav-quiz': 'Quiz',
    'nav-contact': 'Contact',
    'nav-hotel': 'Hotel Guests',

    // Home page
    'hero-title': 'Pasta Rosa',
    'hero-subtitle': 'Authentic Italian Pasta in the Heart of Budapest',
    'hero-desc': 'Indulge in freshly made pasta crafted with passion and tradition. A culinary experience located within our boutique 20-room hotel.',
    'btn-reserve': 'Reserve Now',
    'btn-menu': 'View Menu',
    'btn-gallery': 'See Our Story',

    // Featured
    'featured-title': 'Our Signature Pasta',
    'featured-desc': 'Every dish is handcrafted daily using the finest Italian ingredients and time-honored techniques. From classic Cacio e Pepe to innovative modern creations.',

    // Menu
    'menu-fresh-pasta': 'Fresh Pasta',
    'menu-desserts': 'Desserts',
    'menu-drinks': 'Drinks & Beverages',

    // Desserts
    'tiramisu': 'Tiramisu',
    'tiramisu-desc': 'Traditional Italian dessert with mascarpone, espresso, and cocoa',
    'panna-cotta': 'Panna Cotta',
    'panna-cotta-desc': 'Silky smooth Italian cream dessert with berry coulis',
    'souffle': 'Soufflé',
    'souffle-desc': 'Light and fluffy chocolate soufflé with vanilla cream',

    // Gallery
    'gallery-food': 'Culinary Artistry',
    'gallery-atmosphere': 'Ambiance',
    'gallery-story': 'Our Story',
    'gallery-title': 'Gallery',
    'gallery-subtitle': 'A Visual Journey Through Our Kitchen',

    // Contact
    'contact-hours': 'Hours',
    'contact-phone': 'Phone',
    'contact-email': 'Email',
    'contact-address': 'Address',
    'contact-form': 'Get In Touch',


  },
  hu: {
    // Navigation
    'nav-home': 'Főoldal',
    'nav-about': 'Rólunk',
    'nav-menu': 'Menü',
    'nav-gallery': 'Galéria',
    'nav-reservations': 'Foglalás',
    'nav-quiz': 'Kvíz',
    'nav-contact': 'Kapcsolat',
    'nav-hotel': 'Szállóvendégek',

    // Home page
    'hero-title': 'Pasta Rosa',
    'hero-subtitle': 'Autentikus Olasz Tészta Budapest Szívében',
    'hero-desc': 'Élvezze a frissentartott tésztákat, amelyeket szenvedéllyel és hagyománnyal készítünk. Egy egyedi kulináris élmény a boutique 20 szobás szállodánkban.',
    'btn-reserve': 'Foglalja le most',
    'btn-menu': 'Menü megtekintése',
    'btn-gallery': 'Látogassa meg galériánkat',

    // Featured
    'featured-title': 'Szignó Tészták',
    'featured-desc': 'Minden étel naponta kézzel készül a legfinomabb olasz alapanyagokból és időtlen technikákkal. A klasszikus Cacio e Pepe-től az innovatív modern kreációkig.',

    // Menu
    'menu-fresh-pasta': 'Friss Tészta',
    'menu-desserts': 'Desszertek',
    'menu-drinks': 'Italok',

    // Desserts
    'tiramisu': 'Tiramisu',
    'tiramisu-desc': 'Hagyományos olasz desszert mascarpone-nal, espressóval és kakaóval',
    'panna-cotta': 'Panna Cotta',
    'panna-cotta-desc': 'Selymes olasz tejszíndesszert bogyó szósszal',
    'souffle': 'Soufflé',
    'souffle-desc': 'Könnyű és poros csokoládé soufflé vaníliakrémmel',

    // Gallery
    'gallery-food': 'Kulináris Művészet',
    'gallery-atmosphere': 'Légkör',
    'gallery-story': 'Történetünk',
    'gallery-title': 'Galéria',
    'gallery-subtitle': 'Kulináris Utazás A Konyhánkban',

    // Contact
    'contact-hours': 'Nyitva tartás',
    'contact-phone': 'Telefonszám',
    'contact-email': 'E-mail',
    'contact-address': 'Cím',
    'contact-form': 'Írjon nekünk',


  }
};

let currentLanguage = localStorage.getItem('language') || 'en';

// Translate text
function translate(key) {
  return translations[currentLanguage][key] || translations['en'][key] || key;
}

// Update all translations on page
function updateLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = translate(el.getAttribute('data-i18n'));
  });
  localStorage.setItem('language', currentLanguage);
}

// Language toggle
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'hu' : 'en';
  updateLanguage();
}

// Init language toggle button
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();

  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }
});

// ============================================
// STICKY VIDEO FEATURE
// ============================================

let videoStickied = false;
const stickyVideoContainer = document.querySelector('.sticky-video-container');

function stickVideo() {
  if (stickyVideoContainer && !videoStickied) {
    const videoPlayer = document.querySelector('.video-player-wrapper');
    if (videoPlayer) {
      videoStickied = true;
      stickyVideoContainer.classList.add('active');

      // Clone the iframe
      const iframe = videoPlayer.querySelector('iframe');
      if (iframe) {
        const newIframe = iframe.cloneNode(true);
        const stickyWrapper = stickyVideoContainer.querySelector('.sticky-video-wrapper');
        stickyWrapper.innerHTML = '';
        stickyWrapper.appendChild(newIframe);
      }
    }
  }
}

function unstickVideo() {
  if (stickyVideoContainer && videoStickied) {
    videoStickied = false;
    stickyVideoContainer.classList.remove('active');
  }
}

// Monitor page scrolls to stick/unstick video when leaving gallery
if (stickyVideoContainer) {
  const closeBtn = stickyVideoContainer.querySelector('.sticky-video-close');
  const expandBtn = stickyVideoContainer.querySelector('.sticky-video-expand');

  if (closeBtn) {
    closeBtn.addEventListener('click', unstickVideo);
  }

  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      window.location.href = 'gallery.html';
    });
  }
}

// Auto-stick video when navigating from gallery
if (window.location.pathname.includes('gallery.html')) {
  // On gallery page - don't stick
  if (stickyVideoContainer) {
    stickyVideoContainer.classList.remove('active');
  }
} else if (window.location.pathname.includes('menu.html') ||
  window.location.pathname.includes('reservations.html') ||
  window.location.pathname.includes('contact.html')) {
  // On other pages - option to stick if coming from gallery
  // This can be triggered manually or via a navigation event
}

// ============================================
// FORM HANDLING (Contact Form)
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.querySelector('input[name="name"]').value,
      email: contactForm.querySelector('input[name="email"]').value,
      message: contactForm.querySelector('textarea[name="message"]').value
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields');
      return;
    }

    // In a real scenario, this would send to a backend
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will respond shortly.');
    contactForm.reset();
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// ============================================
// SMOOTH SCROLLING FOR INTERNAL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// LAZY IMAGE LOADING (optional enhancement)
// ============================================

if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// INITIALIZE PAGE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Pasta Rosa Restaurant website loaded');

  // Update any dynamic content
  updateLanguage();

  // Add animation classes
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s backwards`;
  });
});


// ============================================
// PASTA QUIZ LOGIC
// ============================================

const quizData = [
  {
    question: "What is the name of this long, thin, cylindrical pasta?",
    image: "quiz-spaghetti.jpg",
    options: ["Spaghetti", "Linguine", "Fettuccine", "Bucatini"],
    correct: 0
  },
  {
    question: "Identify this tube-shaped pasta with diagonal cuts.",
    image: "quiz-penne.jpg",
    options: ["Rigatoni", "Penne", "Ziti", "Macaroni"],
    correct: 1
  },
  {
    question: "What is this small, rice-shaped pasta called?",
    image: "quiz-orzo.jpg",
    options: ["Couscous", "Orzo", "Fregola", "Risoni"],
    correct: 1
  },
  {
    question: "This pasta shape resembles small ears. What is it?",
    image: "quiz-orecchiette.jpg",
    options: ["Conchiglie", "Farfalle", "Orecchiette", "Gnocchi"],
    correct: 2
  },
  {
    question: "Which pasta is known for its bow-tie or butterfly shape?",
    image: "quiz-farfalle.jpg",
    options: ["Fusilli", "Rotini", "Farfalle", "Gemelli"],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-quiz-btn');
const restartBtn = document.getElementById('restart-quiz-btn');

if (quizContainer) {
  // Elements
  const startScreen = document.getElementById('quiz-start');
  const questionScreen = document.getElementById('quiz-question');
  const resultsScreen = document.getElementById('quiz-results');

  const currentQuestionSpan = document.getElementById('current-question');
  const totalQuestionsSpan = document.getElementById('total-questions');
  const questionImage = document.getElementById('question-image');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');

  const finalScoreSpan = document.getElementById('final-score');
  const totalScoreSpan = document.getElementById('total-score');
  const resultMessage = document.getElementById('result-message');

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Initialize
  if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizData.length;
  if (totalScoreSpan) totalScoreSpan.textContent = quizData.length;

  // Event Listeners
  if (startBtn) {
    startBtn.addEventListener('click', startQuiz);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', startQuiz);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        showResults();
      }
    });
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showStep(questionScreen);
    loadQuestion();
  }

  function showStep(stepElement) {
    // Hide all steps
    [startScreen, questionScreen, resultsScreen].forEach(el => {
      if (el) el.classList.remove('active');
    });
    // Show target step
    if (stepElement) stepElement.classList.add('active');
  }

  function loadQuestion() {
    const data = quizData[currentQuestionIndex];

    // Update UI
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = data.question;
    questionImage.src = data.image;

    // Update Buttons
    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    if (nextBtn) {
      nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "Finish" : "Next";
      nextBtn.disabled = true; // Disable until answer selected
    }

    // Create Options
    optionsContainer.innerHTML = '';
    data.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = option;
      btn.onclick = () => handleAnswer(index, btn);
      optionsContainer.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, btnElement) {
    const data = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === data.correct;

    // Disable all buttons
    const allBtns = optionsContainer.querySelectorAll('button');
    allBtns.forEach(btn => btn.disabled = true);

    // Highlight selected
    if (isCorrect) {
      btnElement.classList.add('correct');
      score++;
    } else {
      btnElement.classList.add('wrong');
      // Highlight correct answer
      allBtns[data.correct].classList.add('correct');
    }

    // Enable Next button
    if (nextBtn) nextBtn.disabled = false;
  }

  function showResults() {
    showStep(resultsScreen);
    finalScoreSpan.textContent = score;

    let message = "";
    if (score === quizData.length) {
      message = "Perfect! You are a true Pasta Master! 🍝👑";
    } else if (score >= quizData.length / 2) {
      message = "Great job! You know your pasta well. 🍝";
    } else {
      message = "Keep practicing! There's always more pasta to discover. 🍝";
    }
    resultMessage.textContent = message;
  }
}
