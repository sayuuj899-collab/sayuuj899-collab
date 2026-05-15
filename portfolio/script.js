// ===================================
// PORTFOLIO INTERACTIVE FEATURES
// ===================================

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 192, 217, 0.15)';
        navbar.style.boxShadow = '0 4px 20px rgba(255, 153, 185, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 192, 217, 0.1)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-fade');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.glass-effect, .project-card, .skill-card').forEach(el => {
    observer.observe(el);
});

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remove existing ripple
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn, .contact-button, .btn-link').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn, .contact-button, .btn-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'p' || e.key === 'P') {
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#ff99b9';
        } else {
            link.style.color = '#2c2c2c';
        }
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Mouse Follow Effect for Premium Feel
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Optional: Add a subtle glow effect near cursor
    // This is performance-optimized to run smoothly
});

// Animate Numbers on Scroll (for potential stats)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Preload images for better performance
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
});

// Add animation delay to elements
document.querySelectorAll('.glass-effect, .project-card, .skill-card, .badge').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
});

// Smooth Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll events here
    });
}, false);

// Mobile Menu Toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Prevent layout shift during image loading
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Add utility function for easy link opening
function openLink(url, newTab = true) {
    if (newTab) {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('using-keyboard');
});

// Add focus styles for accessibility
const accessibilityStyle = document.createElement('style');
accessibilityStyle.textContent = `
    button:focus,
    a:focus {
        outline: 2px solid #ff99b9;
        outline-offset: 2px;
    }
    
    .using-keyboard button:focus,
    .using-keyboard a:focus {
        outline: 2px solid #ff99b9;
        outline-offset: 2px;
    }
`;
document.head.appendChild(accessibilityStyle);

// Page Visibility API - Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// Enhance Performance with RAF throttling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update animations here
            ticking = false;
        });
        ticking = true;
    }
});

// Console Message
console.log('%c Welcome to SAYOOJRAM S Portfolio! 👋', 'color: #ff99b9; font-size: 16px; font-weight: bold;');
console.log('%c Built with HTML, CSS, and JavaScript ✨', 'color: #ffc0d9; font-size: 12px;');
console.log('%c Keyboard Shortcuts: Press H (Home), P (Projects), C (Contact)', 'color: #ff69a8; font-size: 11px;');
