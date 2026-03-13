document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SCROLL ANIMATIONS ---
    const initScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll(
            '.section-title, .section-subtitle, .placeholder, .timeline-step, .deliverable-card, .carousel-wrapper, .weekly-tracker, .architecture-container'
        );

        animateElements.forEach((el, index) => {
            if (!el.classList.contains('slide-in')) {
                el.classList.add('slide-in');
            }
            const delay = (index % 4) * 0.15; 
            el.style.transitionDelay = `${delay}s`;
            scrollObserver.observe(el);
        });
    };

    // --- 2. WEEKLY TRACKER TABS ---
    const initWeekTabs = () => {
        const tabs = document.querySelectorAll('.week-tab');
        const contents = document.querySelectorAll('.week-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');

                const weekNum = tab.getAttribute('data-week');
                const targetContent = document.getElementById(`week-${weekNum}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    };

    // --- 3. DYNAMIC WEEK SELECTOR ---
    const setDynamicCurrentWeek = () => {
        // Set the project start date (February 1st, 2026)
        const startDate = new Date('2026-02-12T00:00:00');
        const currentDate = new Date(); // Gets the user's current date
        
        // Calculate the difference in milliseconds, then convert to days
        const diffInMs = currentDate - startDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        // Calculate the week number (Days 0-6 = Week 1, Days 7-13 = Week 2, etc.)
        let currentWeek = Math.floor(diffInDays / 7) + 1;
        
        // Constrain the bounds so it doesn't break before Feb or after May 1st
        if (currentWeek < 1) currentWeek = 1;
        if (currentWeek > 14) currentWeek = 14;
        
        // Find the matching tab in the HTML and simulate a click
        const activeTab = document.querySelector(`.week-tab[data-week="${currentWeek}"]`);
        if (activeTab) {
            activeTab.click(); 
        }
    };

    // --- INITIALIZE ALL SCRIPTS ---
    initScrollAnimations();
    initWeekTabs(); 
    setDynamicCurrentWeek(); // <-- Must run AFTER initWeekTabs sets up the click listeners
    
});