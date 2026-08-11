document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-open");
        });
    }

    const metrics = document.querySelectorAll("[data-target]");

    const animateMetric = (element) => {
        const target = Number(element.dataset.target);
        let current = 0;
        const duration = 1200;
        const start = performance.now();

        const update = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            current = Math.floor(progress * target);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                observerInstance.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    metrics.forEach((metric) => observer.observe(metric));
});