document.addEventListener("DOMContentLoaded", () => {
    
    // --- FEATURE 1: IMAGES & SECTIONS SLIDING IN ON SCROLL ---
    
    // Set up the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stops observing once it has animated in
            }
        });
    }, observerOptions);

    // Automatically apply the slide-in class to major elements if not already applied
    const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .placeholder, .timeline-step, .deliverable-card, .carousel-wrapper');
    elementsToAnimate.forEach((el) => {
        el.classList.add('slide-in');
        observer.observe(el);
    });
});