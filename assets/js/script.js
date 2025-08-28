// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    let currentLanguage = 'en';
    const langToggle = document.getElementById('langToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // --- Language Toggle ---
    langToggle.addEventListener('click', function() {
        toggleLanguage();
    });

    function toggleLanguage() {
        document.body.classList.add('language-switching');
        
        setTimeout(() => {
            currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
            updateLanguageElements(currentLanguage);
            langToggle.textContent = currentLanguage.toUpperCase();

            setTimeout(() => {
                document.body.classList.remove('language-switching');
            }, 150);
        }, 150);
    }

    function updateLanguageElements(lang) {
        const elements = document.querySelectorAll('[data-en][data-de]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) element.textContent = text;
        });

        const titleElement = document.querySelector('title[data-en][data-de]');
        if (titleElement) {
            const titleText = titleElement.getAttribute(`data-${lang}`);
            if (titleText) document.title = titleText;
        }

        document.documentElement.lang = lang;
    }

    // --- Mobile Menu Toggle ---
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('svg');
        icon.innerHTML = mobileMenu.classList.contains('hidden')
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('svg').innerHTML =
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('svg').innerHTML =
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- Active Navigation Highlighting ---
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        let currentSection = '';
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('text-primary-600', href === currentSection);
            link.classList.toggle('text-gray-700', href !== currentSection);
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- Intersection Observer Animations ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in-up');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('section, .experience-card, .project-card, .timeline-item, .skill-category')
        .forEach(el => observer.observe(el));

    // --- Keyboard Shortcuts ---
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('svg').innerHTML =
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    });

    // --- Print in English ---
    window.addEventListener('beforeprint', () => {
        if (currentLanguage === 'de') updateLanguageElements('en');
    });

    // --- Page Loaded State ---
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        const heroSection = document.getElementById('home');
        if (heroSection) heroSection.classList.add('fade-in-up');
    });

    // --- External Link Tracking ---
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            try {
                console.log('External link clicked:', this.href);
            } catch (error) {
                console.error('Error tracking external link:', error);
            }
        });
    });

    // --- Skip Link for Accessibility ---
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    addSkipLink();
});
