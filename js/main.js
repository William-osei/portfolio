/**
 * Enhanced Portfolio Website JavaScript
 * Advanced animations, interactions, and modern functionality
 */

/**
 * Initialize typing animation for main heading
 */
function initTypingAnimation() {
    const mainHeading = document.querySelector('.logo h1');
    if (mainHeading) {
        const originalText = mainHeading.textContent;
        createTypingEffect(mainHeading, originalText, 150);
    }
}

/**
 * Add loading animations to elements
 */
function addLoadingAnimations() {
    const animatedElements = document.querySelectorAll('.skill-list li, .project-card, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Preload critical resources for better performance
 */
function preloadCriticalResources() {
    const criticalImages = [
        'images/Group codefest.jpg',
        'images/projects/data-dashboard.svg',
        'images/projects/algorithm.svg',
        'images/projects/calculator.svg',
        'images/projects/weather.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * Notification system for user feedback
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#4a6fdc';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}
// ========== ENHANCED ANIMATIONS & INTERACTIONS ==========

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill progress bars animation
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Animate skill progress bars
function animateSkillBars(skillCategory) {
    const progressBars = skillCategory.querySelectorAll('.progress-bar-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-progress') || '75';
            bar.style.width = targetWidth + '%';
        }, index * 100);
    });
}

// ========== ACTIVE NAVIGATION ==========
const updateActiveNavigation = () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========== TYPING ANIMATION ==========
function createTypingEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Wait for DOM to fully load before executing
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initDarkMode();
    initMobileNavigation();
    updateFooterYear();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
    updateActiveNavOnScroll();
    initTypingAnimation();
    addLoadingAnimations();
    preloadCriticalResources();
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    sections.forEach(section => observer.observe(section));
    skillCategories.forEach(category => observer.observe(category));
    
    // Listen for scroll events
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    
    // Add entrance animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/**
 * Mobile Navigation Toggle
 * Handles the hamburger menu functionality for mobile devices
 */
function initMobileNavigation() {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;
    
    const nav = document.querySelector('nav');
    const headerContainer = document.querySelector('#header .container');
    
    // Only add hamburger if it doesn't exist and nav exists
    if (!document.querySelector('.hamburger') && nav && headerContainer) {
        headerContainer.appendChild(hamburger);
        
        // Toggle navigation when hamburger is clicked
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close mobile nav when a link is clicked
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/**
 * Update Footer Year
 * Automatically updates the year in the footer copyright text
 */
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Contact Form Handling
 * Form validation and submission with loading state
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Basic validation
            if (!validateForm(nameInput, emailInput, messageInput)) {
                return;
            }
            
            // Show loading state
            setButtonLoading(submitButton, true);
            
            try {
                // Simulate form submission (replace with actual API call)
                await simulateFormSubmission({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });
                
                // Show success message
                showFormMessage('Your message has been sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                // Show error message
                showFormMessage('Failed to send message. Please try again later.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Remove loading state
                setButtonLoading(submitButton, false);
            }
        });
    }
}

/**
 * Validate form inputs
 * @param {HTMLElement} nameInput - Name input element
 * @param {HTMLElement} emailInput - Email input element
 * @param {HTMLElement} messageInput - Message input element
 * @returns {boolean} - Whether form is valid
 */
function validateForm(nameInput, emailInput, messageInput) {
    let isValid = true;
    
    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // Validate name
    if (!nameInput.value.trim()) {
        showInputError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        showInputError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Display error message for an input
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showInputError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'var(--danger-color)';
    errorMessage.style.fontSize = '0.85rem';
    errorMessage.style.marginTop = '0.25rem';
    errorMessage.textContent = message;
    
    formGroup.appendChild(errorMessage);
    
    // Add error styling to input
    input.style.borderColor = 'var(--danger-color)';
    
    // Remove error styling when input changes
    input.addEventListener('input', () => {
        errorMessage.remove();
        input.style.borderColor = '';
    }, { once: true });
}

/**
 * Show form submission message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success or error)
 */
function showFormMessage(message, type) {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '0.75rem';
    messageElement.style.marginTop = '1rem';
    messageElement.style.borderRadius = 'var(--border-radius-sm)';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
        messageElement.style.color = 'var(--success-color)';
        messageElement.style.border = '1px solid var(--success-color)';
    } else {
        messageElement.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        messageElement.style.color = 'var(--danger-color)';
        messageElement.style.border = '1px solid var(--danger-color)';
    }
    
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add message to form
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds if it's a success message
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

/**
 * Set button loading state
 * @param {HTMLElement} button - Button element
 * @param {boolean} isLoading - Whether button is in loading state
 */
function setButtonLoading(button, isLoading) {
    if (!button) return;
    
    const originalText = button.dataset.originalText || button.textContent;
    
    if (isLoading) {
        // Save original text
        button.dataset.originalText = originalText;
        button.innerHTML = `<span class="loading-spinner"></span> Sending...`;
        button.disabled = true;
        
        // Add spinner styles
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.textContent = `
            .loading-spinner {
                display: inline-block;
                width: 1rem;
                height: 1rem;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 0.8s linear infinite;
                margin-right: 0.5rem;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        
        if (!document.getElementById('spinner-style')) {
            document.head.appendChild(style);
        }
    } else {
        // Restore original text
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

/**
 * Simulate form submission (replace with actual API call)
 * @param {Object} formData - Form data
 * @returns {Promise} - Simulated API response
 */
function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form submitted with data:', formData);
            resolve({ success: true });
        }, 1500);
    });
}

/**
 * Smooth Scroll Navigation
 * Adds smooth scrolling behavior to navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
                
                // Scroll to element with offset for fixed header
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL without scroll (modern browsers)
                if (history && history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}


/**
 * Add active state to navigation based on scroll position
 */
function updateActiveNavOnScroll() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
        
        // Get all sections
        const sections = document.querySelectorAll('.section');
        
        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // Add some buffer
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                // Remove active class from all links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

/**
 * Dark Mode Toggle
 * Handles dark mode functionality and persistence
 */
function initDarkMode() {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.innerHTML = '🌙'; // Moon emoji for dark mode
    document.body.appendChild(darkModeToggle);
    
    // Check for saved preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    // Apply saved preference or system preference
    if (savedMode === 'dark' || (savedMode === null && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️'; // Sun emoji for light mode
    }
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update button icon
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '☀️'; // Sun emoji for light mode
            localStorage.setItem('darkMode', 'dark');
        } else {
            darkModeToggle.innerHTML = '🌙'; // Moon emoji for dark mode
            localStorage.setItem('darkMode', 'light');
        }
    });
}

/**
 * Enhanced Scroll Animations
 * Improves scroll animations with staggered effects
 */
function initScrollAnimations() {
    // Get all sections
    const sections = document.querySelectorAll('.section');
    
    // Create and use Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animations
                entry.target.classList.add('visible');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { 
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    });
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Project card animations
    const projectCards = document.querySelectorAll('.project-card');
    
    // Create observer for project cards with staggered delay
    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // 200ms delay between each card
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial styles and observe project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });
    
    // Skill category animations
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Create observer for skill categories
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger skill animations
                entry.target.classList.add('visible');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all skill categories
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
}

// ========== SLIDESHOW FUNCTIONALITY ==========
let currentSlideIndex = 0;
let autoplayInterval;
let isAutoplayRunning = true;
let isShowingAll = false;

function initializeSlideshow() {
    const slides = document.querySelectorAll('.projects-slideshow .project-card');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        startAutoplay();
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.projects-slideshow .project-card');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Wrap around if index is out of bounds
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;
    
    // Show current slide and update indicator
    slides[currentSlideIndex].classList.add('active');
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function changeSlide(direction) {
    if (isShowingAll) return;
    
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
    
    // Reset autoplay timer
    if (isAutoplayRunning) {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
}

function currentSlide(index) {
    if (isShowingAll) return;
    
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    
    // Reset autoplay timer
    if (isAutoplayRunning) {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
}

function startAutoplay() {
    if (isShowingAll) return;
    
    autoplayInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 4000); // Change slide every 4 seconds
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function toggleAutoplay() {
    const btn = document.getElementById('autoplayBtn');
    
    if (isAutoplayRunning) {
        stopAutoplay();
        isAutoplayRunning = false;
        btn.textContent = '▶ Play';
    } else {
        startAutoplay();
        isAutoplayRunning = true;
        btn.textContent = '⏸ Pause';
    }
}

function showAllProjects() {
    const slideshow = document.querySelector('.projects-slideshow');
    const controls = document.querySelector('.slideshow-controls');
    const autoplayBtn = document.getElementById('autoplayBtn');
    const showAllBtn = document.querySelector('.slide-nav-btn:not(.autoplay-btn)');
    
    if (!isShowingAll) {
        // Show all projects in grid
        slideshow.classList.add('show-all');
        controls.style.display = 'none';
        autoplayBtn.style.display = 'none';
        showAllBtn.textContent = 'Show Slideshow';
        stopAutoplay();
        isShowingAll = true;
    } else {
        // Return to slideshow
        slideshow.classList.remove('show-all');
        controls.style.display = 'flex';
        autoplayBtn.style.display = 'block';
        showAllBtn.textContent = 'View All Projects';
        isShowingAll = false;
        
        // Reinitialize slideshow
        showSlide(currentSlideIndex);
        if (isAutoplayRunning) {
            startAutoplay();
        }
    }
}

// Pause autoplay when user hovers over slideshow
function setupHoverPause() {
    const slideshow = document.querySelector('.projects-slideshow');
    
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => {
            if (isAutoplayRunning && !isShowingAll) {
                stopAutoplay();
            }
        });
        
        slideshow.addEventListener('mouseleave', () => {
            if (isAutoplayRunning && !isShowingAll) {
                startAutoplay();
            }
        });
    }
}

// Add keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const rect = projectsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    changeSlide(1);
                } else if (e.key === ' ') {
                    e.preventDefault();
                    toggleAutoplay();
                }
            }
        }
    });
}

// Touch/swipe support for mobile
function setupTouchNavigation() {
    const slideshow = document.querySelector('.projects-slideshow');
    if (!slideshow) return;
    
    let startX = 0;
    let endX = 0;
    
    slideshow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slideshow.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                changeSlide(1); // Swipe left - next slide
            } else {
                changeSlide(-1); // Swipe right - previous slide
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    initDarkMode();
    initScrollAnimations();
    
    // Initialize slideshow
    setTimeout(() => {
        initializeSlideshow();
        setupHoverPause();
        setupKeyboardNavigation();
        setupTouchNavigation();
    }, 100);
    
    // Initialize other portfolio features
    initNavigation();
    addLoadingAnimations();
    preloadCriticalResources();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

