/* =====================================================
   NEO-BRUTALIST PORTFOLIO - JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initScrollButton();
    initFormSubmission();
    initScrollEffects();
});

/* =====================================================
   DARK MODE TOGGLE
   ===================================================== */

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.classList.add(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
}

/* =====================================================
   SCROLL BUTTON FUNCTIONALITY
   ===================================================== */

function initScrollButton() {
    const scrollButton = document.getElementById('scrollButton');
    
    if (!scrollButton) return;
    
    scrollButton.addEventListener('click', function() {
        const experienceSection = document.getElementById('experience');
        if (experienceSection) {
            experienceSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* =====================================================
   FORM SUBMISSION
   ===================================================== */

function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate inputs
        if (!name || !email || !message) {
            alert('Please fill out all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message (replace with actual email service)
        console.log('Form submitted:', { name, email, message });
        alert(`Thank you ${name}! Your message has been sent successfully.`);
        
        // Reset form
        contactForm.reset();
        
        // In a real application, send to backend/email service:
        // sendEmail(name, email, message);
    });
}

/* =====================================================
   EMAIL VALIDATION
   ===================================================== */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* =====================================================
   SCROLL EFFECTS & ANIMATIONS
   ===================================================== */

function initScrollEffects() {
    // Observe elements for fade-in on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all timeline items and education items
    document.querySelectorAll('.timeline-item, .education-item, .hobby-card').forEach(item => {
        observer.observe(item);
    });
}

/* =====================================================
   SMOOTH SCROLL NAVIGATION
   ===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#contact') return; // Skip empty or special links
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =====================================================
   ADD FADE-IN ANIMATION TO CSS
   ===================================================== */

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* =====================================================
   ACTIVE NAVIGATION LINK HIGHLIGHT
   ===================================================== */

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1); // Remove #
        if (href === current) {
            link.style.borderBottomColor = 'var(--accent)';
            link.style.borderBottomWidth = '2px';
        } else {
            link.style.borderBottomColor = 'transparent';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

/* =====================================================
   MOBILE MENU (Optional Enhancement)
   ===================================================== */

function initMobileMenu() {
    // Add mobile menu functionality here if needed
    // This would toggle the nav-links visibility on smaller screens
}

/* =====================================================
   PARALLAX EFFECT (Optional Enhancement)
   ===================================================== */

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

/* =====================================================
   KEYBOARD NAVIGATION
   ===================================================== */

document.addEventListener('keydown', function(e) {
    // Escape key could close any modal or reset focus
    if (e.key === 'Escape') {
        // Handle escape key functionality
    }
    
    // Tab navigation is handled by browser by default
});

/* =====================================================
   CONTACT CARD HOVER EFFECT
   ===================================================== */

document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

/* =====================================================
   PRINT STYLES (Resume)
   ===================================================== */

window.printPortfolio = function() {
    window.print();
};

// Add print styles to document
const printStyle = document.createElement('style');
printStyle.media = 'print';
printStyle.textContent = `
    @page {
        margin: 0.5in;
    }
    
    body {
        background-color: white !important;
        color: black !important;
    }
    
    .header,
    .scroll-button {
        display: none !important;
    }
    
    section {
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    a {
        color: black !important;
    }
`;
document.head.appendChild(printStyle);

/* =====================================================
   ACCESSIBILITY FEATURES
   ===================================================== */

// Ensure focus styles are visible for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    *:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 2px;
    }
    
    button:focus-visible {
        outline-offset: -3px;
    }
`;
document.head.appendChild(focusStyle);

/* =====================================================
   PREFERS REDUCED MOTION
   ===================================================== */

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const noMotionStyle = document.createElement('style');
    noMotionStyle.textContent = `
        * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(noMotionStyle);
}

console.log('Neo-Brutalist Portfolio initialized successfully!');
