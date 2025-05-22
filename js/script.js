// Navegación responsive
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
            }, 500);
        });
    }
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle navigation menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
      // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > scrollThreshold) {
            header.classList.add('scrolled');
            
            // Efecto de ocultar el header al hacer scroll hacia abajo y mostrarlo al hacer scroll hacia arriba
            if (currentScrollY > lastScrollY) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }
            
            // Here you would normally send the data to a server
            // For this example, we'll just show a success message
            alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
            contactForm.reset();
        });
    }
      // Simulate real-time market data updates
    function updateMarketData() {
        const marketValues = document.querySelectorAll('.market-value');
        const marketChanges = document.querySelectorAll('.market-change');
        
        marketValues.forEach((value, index) => {
            const currentValue = parseFloat(value.textContent.replace(',', ''));
            // Crear cambios más realistas con tendencia
            const trend = Math.random() > 0.5 ? 1 : -1;
            const volatility = currentValue * 0.005; // 0.5% de volatilidad máxima
            const randomChange = trend * (Math.random() * volatility);
            const newValue = currentValue + randomChange;
            
            // Update the value with thousands separator
            value.textContent = newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            // Update the change percentage
            const percentChange = (randomChange / currentValue) * 100;
            const change = marketChanges[index];
            
            if (percentChange >= 0) {
                change.textContent = `+${percentChange.toFixed(2)}%`;
                change.classList.remove('down');
                change.classList.add('up');
                value.classList.remove('down');
                value.classList.add('up');
            } else {
                change.textContent = `${percentChange.toFixed(2)}%`;
                change.classList.remove('up');
                change.classList.add('down');
                value.classList.remove('up');
                value.classList.add('down');
            }
        });
        
        // Update currency values with realistic relationships
        const currencyValue = document.querySelector('.currency-value');
        const currencyAltValues = document.querySelectorAll('.currency-alt-value');
        
        if (currencyValue) {
            const currentValue = parseFloat(currencyValue.textContent.replace(',', ''));
            // Cambio más sutil para la cotización oficial
            const randomChange = (Math.random() - 0.5) * (currentValue * 0.002);
            const newValue = currentValue + randomChange;
            currencyValue.textContent = newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            // Update alternative currency values with relationship to official rate
            if (currencyAltValues.length >= 3) {
                // Blue siempre más alto que el oficial con cierta volatilidad
                const blueValue = newValue * (1.3 + (Math.random() - 0.5) * 0.05);
                currencyAltValues[0].textContent = blueValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                // MEP ligeramente menor que el blue
                const mepValue = blueValue * (0.97 + (Math.random() - 0.5) * 0.02);
                currencyAltValues[1].textContent = mepValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                // CCL entre blue y MEP
                const cclValue = blueValue * (0.98 + (Math.random() - 0.5) * 0.02);
                currencyAltValues[2].textContent = cclValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
        
        // Update disclaimer time with Argentine timezone
        const disclaimer = document.querySelector('.market-disclaimer');
        if (disclaimer) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            
            disclaimer.textContent = `Datos actualizados al ${day}/${month}/${year}, ${hours}:${minutes} (ARG)`;
        }
    }
      // Initial update and set interval for real-time effect
    const marketDataSection = document.querySelector('.market-data');
    if (marketDataSection) {
        updateMarketData();
        setInterval(updateMarketData, 3000); // Update every 3 seconds para mostrar más dinamismo
    }
      // Animations on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.portfolio-item, .service-card, .testimonial, .market-card, .currency-box, .about-stats');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation targets
    const animationTargets = document.querySelectorAll('.portfolio-item, .service-card, .testimonial, .market-card, .currency-box, .about-stats');
    animationTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';
        target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animations on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
