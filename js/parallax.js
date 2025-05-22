// Funciones para efectos parallax y elementos interactivos innovadores

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto Parallax en secciones
    initParallaxEffect();
    
    // Cursor personalizado
    initCustomCursor();
    
    // Inicializar efectos de visualización de datos creativos
    initCreativeDataViz();
    
    // Inicializar las pestañas interactivas
    initInteractiveTabs();
    
    // Inicializar las barras de progreso circulares
    initCircularProgress();
    
    // Inicializar efectos de revelación al hacer scroll
    initScrollReveal();
    
    // Inicializar botones magnéticos
    initMagneticButtons();
    
    // Inicializar gráfico 3D dinámico
    initDynamicChart();
});

// Efectos de Parallax
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const offset = element.getAttribute('data-offset') || 0;
            const direction = element.getAttribute('data-direction') || 1;
            
            element.style.transform = `translateY(${direction * (scrollTop * speed) + parseFloat(offset)}px)`;
        });
    });

    // Inicializar posiciones en carga
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
}

// Cursor personalizado
function initCustomCursor() {
    const customCursorAreas = document.querySelectorAll('.custom-cursor-area');
    
    if (customCursorAreas.length === 0) return;
    
    customCursorAreas.forEach(area => {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        area.appendChild(cursor);
        
        area.addEventListener('mousemove', (e) => {
            const rect = area.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
        });
        
        area.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        area.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        area.addEventListener('click', () => {
            cursor.classList.add('expand');
            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 500);
        });
    });
}

// Visualización de datos creativa
function initCreativeDataViz() {
    const tickerContainer = document.querySelector('.ticker-items');
    
    if (!tickerContainer) return;
    
    // Duplicar elementos para crear movimiento infinito
    tickerContainer.innerHTML += tickerContainer.innerHTML;
    
    // Actualizar datos del mercado de forma creativa
    updateCreativeMarketData();
    setInterval(updateCreativeMarketData, 5000);
}

function updateCreativeMarketData() {
    const marketValues = document.querySelectorAll('.ticker-value');
    
    if (marketValues.length === 0) return;
    
    marketValues.forEach(value => {
        // Obtener el valor actual como número
        const currentVal = parseFloat(value.textContent.replace('%', ''));
        
        // Generar cambio aleatorio en un rango realista
        const randomChange = (Math.random() - 0.5) * 2;
        let newVal = currentVal + randomChange;
        
        // Redondear a 2 decimales
        newVal = Math.round(newVal * 100) / 100;
        
        // Actualizar el valor
        value.textContent = (newVal > 0 ? '+' : '') + newVal + '%';
        
        // Actualizar clase para color
        if (newVal > 0) {
            value.classList.remove('down');
            value.classList.add('up');
        } else {
            value.classList.remove('up');
            value.classList.add('down');
        }
    });
    
    // Actualizar valores en las tarjetas monetarias creativas
    const mainValue = document.querySelector('.currency-main-value');
    if (mainValue) {
        const currentValue = parseFloat(mainValue.textContent.replace(',', ''));
        const randomChange = (Math.random() - 0.5) * (currentValue * 0.002);
        const newValue = currentValue + randomChange;
        mainValue.textContent = newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // Efecto visual de cambio
        mainValue.classList.add('value-changed');
        setTimeout(() => {
            mainValue.classList.remove('value-changed');
        }, 1000);
    }
}

// Pestañas interactivas
function initInteractiveTabs() {
    const tabContainers = document.querySelectorAll('.interactive-tabs');
    
    tabContainers.forEach(container => {
        const tabItems = container.querySelectorAll('.tab-item');
        const tabSelector = container.querySelector('.tab-selector');
        const tabPanels = document.querySelectorAll('[data-tab-panel]');
        
        if (!tabSelector || tabItems.length === 0) return;
        
        // Configurar selector inicialmente
        updateTabSelector(tabItems[0], tabSelector);
        
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                // Actualizar clases activas
                tabItems.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Mover el selector
                updateTabSelector(tab, tabSelector);
                
                // Mostrar panel correspondiente
                const targetPanel = tab.getAttribute('data-tab-target');
                if (targetPanel && tabPanels.length > 0) {
                    tabPanels.forEach(panel => {
                        panel.style.display = panel.getAttribute('data-tab-panel') === targetPanel ? 'block' : 'none';
                    });
                }
            });
        });
    });
}

function updateTabSelector(activeTab, selector) {
    const tabWidth = activeTab.offsetWidth;
    const tabLeft = activeTab.offsetLeft;
    
    selector.style.width = tabWidth + 'px';
    selector.style.left = tabLeft + 'px';
}

// Barras de progreso circulares
function initCircularProgress() {
    const progressElements = document.querySelectorAll('.circular-progress');
    
    progressElements.forEach(element => {
        const percentage = element.getAttribute('data-percentage') || 0;
        element.style.setProperty('--percentage', percentage + '%');
        
        const valueElement = element.querySelector('.circular-value');
        if (valueElement) {
            // Animar el conteo
            let currentValue = 0;
            const targetValue = parseInt(percentage);
            const duration = 1500; // ms
            const step = targetValue / (duration / 16);
            
            const animate = () => {
                currentValue += step;
                
                if (currentValue < targetValue) {
                    valueElement.textContent = Math.floor(currentValue) + '%';
                    requestAnimationFrame(animate);
                } else {
                    valueElement.textContent = targetValue + '%';
                }
            };
            
            animate();
        }
    });
}

// Efectos de revelación al hacer scroll
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Inicializar en carga
    window.addEventListener('load', revealOnScroll);
    
    // Actualizar en scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Botones magnéticos
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 12;
            const moveY = (y - centerY) / 12;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Gráfico 3D dinámico
function initDynamicChart() {
    const chartContainer = document.querySelector('.dynamic-chart');
    
    if (!chartContainer) return;
    
    const bars = chartContainer.querySelectorAll('.chart-bar');
    
    // Ajustar alturas aleatorias iniciales y rotación
    bars.forEach((bar, index) => {
        const height = 50 + Math.random() * 200; // Altura entre 50px y 250px
        const delay = index * 100; // Retraso escalonado
        
        // Rotación para efecto 3D
        const rotateY = -20 + (index * 10); // Giro para efecto 3D
        
        setTimeout(() => {
            bar.style.height = height + 'px';
            bar.style.transform = `rotateY(${rotateY}deg)`;
            
            // Actualizar valor
            const valueEl = bar.querySelector('.chart-value');
            if (valueEl) {
                valueEl.textContent = Math.round(height / 3);
            }
        }, delay);
    });
    
    // Animar gráfico al hacer scroll cuando sea visible
    window.addEventListener('scroll', () => {
        const chartRect = chartContainer.getBoundingClientRect();
        const isVisible = chartRect.top < window.innerHeight && chartRect.bottom > 0;
        
        if (isVisible) {
            bars.forEach((bar, index) => {
                const newHeight = 50 + Math.random() * 200;
                const delay = index * 100;
                
                setTimeout(() => {
                    bar.style.height = newHeight + 'px';
                    
                    // Actualizar valor
                    const valueEl = bar.querySelector('.chart-value');
                    if (valueEl) {
                        valueEl.textContent = Math.round(newHeight / 3);
                    }
                }, delay);
            });
        }
    });
}

// Texto de revelación
document.addEventListener('DOMContentLoaded', function() {
    const revealTextElements = document.querySelectorAll('.reveal-text');
    
    revealTextElements.forEach(element => {
        // Obtener el texto y establecerlo como atributo de datos
        const text = element.textContent.trim();
        element.setAttribute('data-text', text);
    });
});
