document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-open");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("mobile-open");
            });
        });
    }

    const metrics = document.querySelectorAll("[data-target]");

    const animateMetric = (element) => {
        const target = Number(element.dataset.target);
        const duration = 1200;
        const start = performance.now();

        const update = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            element.textContent = Math.floor(progress * target).toLocaleString("es-CL");

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