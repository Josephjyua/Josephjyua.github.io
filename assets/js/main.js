document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('is-active');
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Animated Metrics Counter (IntersectionObserver)
    const metricElements = document.querySelectorAll('[data-target]');
    
    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1500; // 1.5s
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease-out curve
            const currentCount = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
            
            el.textContent = currentCount.toLocaleString('es-CL');

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                el.textContent = target.toLocaleString('es-CL');
            }
        };

        requestAnimationFrame(updateNumber);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    metricElements.forEach(el => observer.observe(el));
});