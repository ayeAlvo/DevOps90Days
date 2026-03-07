// ===== THEME TOGGLER =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    console.log('Applying dark mode from saved preference');
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<span class="icon">☀️</span>';
}

themeToggle.addEventListener('click', () => {
    console.log('Toggling theme');
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkMode ? '<span class="icon">☀️</span>' : '<span class="icon">🌙</span>';
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== LAZY LOADING FOR IMAGES =====
class LazyLoadImage {
    constructor() {
        this.images = document.querySelectorAll('.lazy-image');
        this.imageMap = new Map();
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            this.images.forEach(img => {
                img.classList.add('lazy-loading');
                observer.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.images.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.onload = () => {
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
            };
            img.onerror = () => {
                img.classList.remove('lazy-loading');
                console.error(`Error loading image: ${src}`);
            };
            img.src = src;
        }
    }
}

// Initialize lazy loading
new LazyLoadImage();

// ===== FORM VALIDATION & SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Validation patterns
const validationRules = {
    nombre: {
        pattern: /^[a-zA-Z\s]{3,}$/,
        message: 'El nombre debe tener al menos 3 caracteres y solo letras'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Por favor ingresa un email válido'
    },
    asunto: {
        pattern: /^.{5,}$/,
        message: 'El asunto debe tener al menos 5 caracteres'
    },
    mensaje: {
        pattern: /^.{10,}$/,
        message: 'El mensaje debe tener al menos 10 caracteres'
    }
};

// Real-time validation
Object.keys(validationRules).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`error${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`);

    field.addEventListener('blur', () => {
        validateField(field, errorElement, fieldName);
    });

    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            validateField(field, errorElement, fieldName);
        }
    });
});

function validateField(field, errorElement, fieldName) {
    const rule = validationRules[fieldName];
    const isValid = rule.pattern.test(field.value.trim());

    if (isValid) {
        field.classList.remove('error');
        errorElement.textContent = '';
        return true;
    } else {
        field.classList.add('error');
        errorElement.textContent = rule.message;
        return false;
    }
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`error${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`);
        if (!validateField(field, errorElement, fieldName)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showFormMessage('Por favor corrige los errores en el formulario', 'error');
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // In a real application, you would send the data to your server here
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value
        };

        console.log('Form data:', formData);

        // Show success message
        showFormMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');

        // Reset form
        contactForm.reset();
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            field.classList.remove('error');
        });

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.about-text p, .skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease-in-out';
    observer.observe(el);
});

// ===== CLICK ANIMATIONS =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove any existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// ===== PRELOAD CRITICAL IMAGES =====
function preloadImages() {
    const criticalImages = document.querySelectorAll('.project-image img');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.dataset.src || img.src;
        document.head.appendChild(link);
    });
}

preloadImages();

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize opacity at 0 for fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// ===== PRINT STYLES =====
window.addEventListener('beforeprint', () => {
    document.styles?.disabled = false;
});
