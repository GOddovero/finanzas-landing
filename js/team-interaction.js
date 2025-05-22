// Team Section Enhanced Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Team cards hover effects
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            teamCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            teamCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });
    
    // Animate team section elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation to team cards
                const cards = document.querySelectorAll('.team-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * index);
                });
                
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing the team section
    const teamSection = document.querySelector('.team');
    if (teamSection) {
        // Set initial state for animation
        const cards = document.querySelectorAll('.team-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
        });
        
        observer.observe(teamSection);
    }
});
