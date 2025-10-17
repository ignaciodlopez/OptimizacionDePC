// Custom JavaScript for WebRadioAficionados

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card, section h2, section p');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#')) {
                return; // Don't add loading to anchor links
            }
            
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Cargando...';
            this.disabled = true;
            
            // Simulate loading (remove this in production)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Accordion enhancement
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a small delay for smooth animation
            setTimeout(() => {
                const target = document.querySelector(this.getAttribute('data-bs-target'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple effect to all buttons
    const rippleButtons = document.querySelectorAll('.btn');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add tooltips to download buttons
    const downloadButtons = document.querySelectorAll('a[href="#"]');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Descargar')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Enlace de descarga no disponible en demo';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - 40) + 'px';
                
                setTimeout(() => tooltip.style.opacity = '1', 10);
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => document.body.removeChild(tooltip), 300);
                }, 2000);
            });
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or dropdowns
            const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Página cargada en ${loadTime}ms`);
        });
    }

    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Add form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation logic here
            console.log('Form submitted');
        });
    });

    // Add search functionality (if search is implemented)
    const searchInput = document.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Add dark mode toggle (bonus feature)
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    let isDarkMode = false;
    darkModeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        this.innerHTML = isDarkMode ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    });

    // Dark mode styles are now in styles.css

    console.log('WebRadioAficionados - Página cargada correctamente');
});
