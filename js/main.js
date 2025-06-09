(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all components
        initSmoothScrolling();
        initFormValidation();
        initModals();
        initScrollEffects();
        initLazyLoading();
        initRizeDigitalFeatures();
    });

    /**
     * Rize Digital-specific functionality
     * This initializes custom features for the Rize Digital website
     */
    function initRizeDigitalFeatures() {
        // Initialize counters for statistics if they exist
        initCounters();
        
        // Initialize testimonial sliders if they exist
        initTestimonialSliders();
        
        // Initialize service tab toggles if they exist
        initServiceTabs();
    }
    
    /**
     * Initialize animated counters for statistics
     */
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-target'), 10);
                        const duration = 2000; // ms
                        const step = Math.ceil(target / (duration / 16)); // 60fps
                        
                        let count = 0;
                        const updateCounter = () => {
                            count += step;
                            if (count < target) {
                                counter.textContent = count;
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        
                        updateCounter();
                        counterObserver.unobserve(counter);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        }
    }
    
    /**
     * Initialize testimonial sliders
     */
    function initTestimonialSliders() {
        const testimonialContainers = document.querySelectorAll('.testimonial-slider');
        
        testimonialContainers.forEach(container => {
            const slides = container.querySelectorAll('.testimonial-slide');
            const nextBtn = container.querySelector('.testimonial-next');
            const prevBtn = container.querySelector('.testimonial-prev');
            let currentIndex = 0;
            
            if (slides.length > 0) {
                // Show the first slide
                slides[0].classList.add('active');
                
                function showSlide(index) {
                    // Hide all slides
                    slides.forEach(slide => {
                        slide.classList.remove('active');
                    });
                    
                    // Show the current slide
                    slides[index].classList.add('active');
                }
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        currentIndex = (currentIndex + 1) % slides.length;
                        showSlide(currentIndex);
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                        showSlide(currentIndex);
                    });
                }
                
                // Auto-advance slides every 5 seconds if there are multiple slides
                if (slides.length > 1) {
                    setInterval(() => {
                        currentIndex = (currentIndex + 1) % slides.length;
                        showSlide(currentIndex);
                    }, 5000);
                }
            }
        });
    }
    
    /**
     * Initialize service tabs functionality
     */
    function initServiceTabs() {
        const tabContainers = document.querySelectorAll('.service-tabs');
        
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab-button');
            const tabContents = container.querySelectorAll('.tab-content');
            
            if (tabs.length > 0) {
                // Activate the first tab by default
                tabs[0].classList.add('active');
                if (tabContents[0]) {
                    tabContents[0].classList.add('active');
                }
                
                tabs.forEach((tab, index) => {
                    tab.addEventListener('click', () => {
                        // Deactivate all tabs and contents
                        tabs.forEach(t => t.classList.remove('active'));
                        tabContents.forEach(c => c.classList.remove('active'));
                        
                        // Activate the clicked tab and corresponding content
                        tab.classList.add('active');
                        if (tabContents[index]) {
                            tabContents[index].classList.add('active');
                        }
                    });
                });
            }
        });
    }

    /**
     * Smooth Scrolling for Anchor Links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileNav = document.querySelector('.mobile-nav.active');
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    
                    if (mobileNav && menuToggle) {
                        mobileNav.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        document.body.classList.remove('menu-open');
                        
                        const hamburger = menuToggle.querySelector('.hamburger');
                        if (hamburger) {
                            hamburger.classList.remove('is-active');
                        }
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Form Validation
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('form.validate');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    // Remove existing error messages
                    const existingError = field.parentElement.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                    
                    field.classList.remove('error');
                    
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentElement.appendChild(errorMessage);
                    } else if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Please enter a valid email address';
                        field.parentElement.appendChild(errorMessage);
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    // Scroll to first error
                    const firstError = form.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }
                } else {
                    // If form submission is AJAX-based, you would handle that here
                    // For now, just allow the form to submit normally
                }
            });
            
            // Real-time validation on blur
            const inputFields = form.querySelectorAll('input, textarea, select');
            inputFields.forEach(field => {
                field.addEventListener('blur', function() {
                    validateField(field);
                });
                
                // For select elements
                if (field.tagName === 'SELECT') {
                    field.addEventListener('change', function() {
                        validateField(field);
                    });
                }
            });
        });
        
        function validateField(field) {
            // Remove existing error
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            field.classList.remove('error');
            
            if (field.hasAttribute('required') && !field.value.trim()) {
                field.classList.add('error');
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'This field is required';
                field.parentElement.appendChild(errorMessage);
            } else if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
                field.classList.add('error');
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please enter a valid email address';
                field.parentElement.appendChild(errorMessage);
            }
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    /**
     * Animations
     */
    function initAnimations() {
        // Fade-in animations for elements with .fade-in class
        const fadeElements = document.querySelectorAll('.fade-in');
        
        if (fadeElements.length > 0) {
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            fadeElements.forEach(element => {
                fadeObserver.observe(element);
            });
        }
        
        // Staggered animations for lists
        const animatedLists = document.querySelectorAll('.staggered-animation');
        
        if (animatedLists.length > 0) {
            const listObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const items = entry.target.children;
                        
                        Array.from(items).forEach((item, index) => {
                            item.style.transitionDelay = `${index * 0.1}s`;
                            item.classList.add('visible');
                        });
                        
                        listObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animatedLists.forEach(list => {
                listObserver.observe(list);
            });
        }
    }

    /**
     * Modal Dialogs
     */
    function initModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    openModal(modal);
                }
            });
        });
        
        // Close buttons
        const closeButtons = document.querySelectorAll('.modal-close');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.active');
                if (openModal) {
                    closeModal(openModal);
                }
            }
        });
        
        function openModal(modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            
            // Focus the first focusable element in the modal
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
        
        function closeModal(modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    /**
     * Scroll Effects
     */
    function initScrollEffects() {
        // Sticky header
        const header = document.querySelector('.site-header');
        const scrollThreshold = 100;
        
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > scrollThreshold) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            });
        }
        
        // Scroll to top button
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        
        if (scrollToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            scrollToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Progress bar for blog posts
        const progressBar = document.querySelector('.reading-progress');
        const contentElement = document.querySelector('.blog-content, article');
        
        if (progressBar && contentElement) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const contentHeight = contentElement.offsetHeight;
                const contentTop = contentElement.offsetTop;
                const windowHeight = window.innerHeight;
                
                let progress = (scrollPosition - contentTop) / (contentHeight - windowHeight);
                progress = Math.min(Math.max(progress, 0), 1);
                
                progressBar.style.width = `${progress * 100}%`;
            });
        }
    }

    /**
     * Lazy Loading for Images and Videos
     */
    function initLazyLoading() {
        // Use native lazy loading if available
        if ('loading' in HTMLImageElement.prototype) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.classList.add('loaded');
            });
        } else {
            // Fallback to Intersection Observer
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            if (lazyImages.length > 0) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            
                            if (img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                            }
                            
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
        
        // Lazy load videos
        const lazyVideos = document.querySelectorAll('video[data-src]');
        
        if (lazyVideos.length > 0) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        
                        if (video.dataset.src) {
                            video.src = video.dataset.src;
                        }
                        
                        if (video.dataset.poster) {
                            video.poster = video.dataset.poster;
                        }
                        
                        // Handle source elements inside video
                        const sources = video.querySelectorAll('source[data-src]');
                        sources.forEach(source => {
                            source.src = source.dataset.src;
                        });
                        
                        video.load();
                        video.classList.add('loaded');
                        videoObserver.unobserve(video);
                    }
                });
            });
            
            lazyVideos.forEach(video => {
                videoObserver.observe(video);
            });
        }
    }
})();
