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


    // --- FEATURE 2: CLICKABLE DELIVERABLES GALLERY ---
    // --- FEATURE 3: SWIPEABLE CAROUSEL ---
        
        const track = document.getElementById('project-carousel');
        const slides = Array.from(document.querySelectorAll('.carousel-item'));
        const nextBtn = document.querySelector('.ctrl-right');
        const prevBtn = document.querySelector('.ctrl-left');

        let currentIndex = 0;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let isDragging = false;

        function setSliderPosition() {
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        function snapToSlide() {
            currentTranslate = currentIndex * -track.offsetWidth;
            prevTranslate = currentTranslate;
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            setSliderPosition();
        }

        // Touch events for mobile swiping
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none'; 
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            currentTranslate = prevTranslate + diff;
            setSliderPosition();
        }, { passive: true });

        track.addEventListener('touchend', () => {
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex += 1;
            if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

            snapToSlide();
        });

        // Button click events
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) currentIndex++;
                snapToSlide();
            });

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) currentIndex--;
                snapToSlide();
            });
        }

        // Keep slides aligned if the browser is resized
        window.addEventListener('resize', snapToSlide);
});