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
    
    // --- FEATURE 2: CLICKABLE DELIVERABLES GALLERY ---
    
    const cards = document.querySelectorAll('.deliverable-card');
    const dynamicImage = document.getElementById('dynamic-image');
    const displayArea = document.getElementById('display-area');

    // Swap empty strings with Tableau iframe embed codes
    // Swap empty strings with temporary placeholder images
    const contentMap = {
        'dataset': '<img src="https://placehold.co/1000x450/241F20/C00031?text=Cleaned+Dataset+Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">',
        
        'scripts': '<img src="https://placehold.co/1000x450/241F20/C00031?text=Forecasting+Model+Output" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">',
        
        'dashboard': '<img src="https://placehold.co/1000x450/241F20/C00031?text=Interactive+Tableau+Dashboard" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">'
    };

    // Load the default image on page load
    dynamicImage.innerHTML = contentMap['dataset'];
    dynamicImage.style.border = "none"; // Removes the dashed border
    dynamicImage.style.backgroundColor = "transparent"; // Clears the grey background

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) return;

            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            displayArea.classList.add('fade-out');
            
            setTimeout(() => {
                const imageKey = card.getAttribute('data-image');
                // CRITICAL FIX: Changed innerText to innerHTML to render the iframe
                dynamicImage.innerHTML = contentMap[imageKey];
                
                // Remove the dashed placeholder border if an iframe is present
                dynamicImage.style.border = "none"; 
                
                displayArea.classList.remove('fade-out');
            }, 400); 
        });
    });
});