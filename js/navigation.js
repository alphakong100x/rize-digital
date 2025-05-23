document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Mobile submenu toggles
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    
    mobileSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSubmenu = document.getElementById(targetId);
            
            if (targetSubmenu) {
                targetSubmenu.classList.toggle('hidden');
                targetSubmenu.classList.toggle('active');
            }
        });
    });
    
    // Sticky header
    const header = document.getElementById('site-header');
    
    function toggleHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    toggleHeaderClass();
    
    // Check on scroll
    window.addEventListener('scroll', toggleHeaderClass);
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Handle dropdown on mobile
    document.querySelector('.flex.items-center.justify-between').addEventListener('click', function() {
        const submenu = document.querySelector('.mobile-submenu');
        submenu.classList.toggle('hidden');
    });
});





