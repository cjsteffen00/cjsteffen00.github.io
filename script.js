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
    const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .placeholder, .timeline-step, .deliverable-card');
    elementsToAnimate.forEach((el) => {
        el.classList.add('slide-in');
        observer.observe(el);
    });


    // --- FEATURE 2: CLICKABLE DELIVERABLES GALLERY ---
    
    const cards = document.querySelectorAll('.deliverable-card');
    const dynamicImage = document.getElementById('dynamic-image');
    const displayArea = document.getElementById('display-area');

    // This object holds the text/images that will swap in when a card is clicked
    const contentMap = {
        'dataset': '',
        'scripts': '',
        'dashboard': ''
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Ignore click if the card is already active
            if (card.classList.contains('active')) return;

            // Remove 'active' class from all cards
            cards.forEach(c => c.classList.remove('active'));
            // Add 'active' class to the clicked card
            card.classList.add('active');

            // Fade out the current image
            displayArea.classList.add('fade-out');
            
            // Wait for the fade out to finish (400ms to match CSS), then swap content and fade back in
            setTimeout(() => {
                const imageKey = card.getAttribute('data-image');
                dynamicImage.innerText = contentMap[imageKey];
                displayArea.classList.remove('fade-out');
            }, 400); 
        });
    });
});