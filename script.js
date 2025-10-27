/* =====================================================
   SCRIPT.JS - Division Zeitung (OPTIMISÉ)
   Version 2.0 - Code modulaire et performant
   Compatible avec tous les fichiers HTML existants
   ===================================================== */

'use strict';

/* =====================================================
   CONFIGURATION GLOBALE
   ===================================================== */

const CONFIG = {
    isDev: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    debounceDelay: 250,
    animationDuration: 300,
    scrollThreshold: 100
};

/* =====================================================
   UTILITAIRES
   ===================================================== */

const Utils = {
    /**
     * Debounce une fonction
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },
    
    /**
     * Throttle une fonction
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Valider un email
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    /**
     * Logger uniquement en dev
     */
    log(...args) {
        if (CONFIG.isDev) {
            console.log(...args);
        }
    },
    
    /**
     * Attendre que le DOM soit prêt
     */
    ready(callback) {
        if (document.readyState !== 'loading') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }
};

/* =====================================================
   CACHE DOM (évite les requêtes répétées)
   ===================================================== */

const DOM = {
    mobileMenuToggle: null,
    navMenu: null,
    navOverlay: null,
    dropdownToggle: null,
    body: null,
    
    init() {
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navOverlay = document.querySelector('.nav-overlay');
        this.dropdownToggle = document.getElementById('archives-dropdown');
        this.body = document.body;
    }
};

/* =====================================================
   MODULE MENU MOBILE
   ===================================================== */

const MobileMenu = {
    isOpen: false,
    escapeHandler: null,
    
    init() {
        if (!DOM.mobileMenuToggle || !DOM.navMenu || !DOM.navOverlay) {
            Utils.log('Mobile menu elements not found, skipping initialization');
            return;
        }
        
        // Toggle menu
        DOM.mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Fermer sur overlay click
        DOM.navOverlay.addEventListener('click', () => this.close());
        
        // Fermer sur clic lien (sauf dropdown toggle)
        DOM.navMenu.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('nav-item') && 
                !target.classList.contains('nav-dropdown-toggle')) {
                this.close();
            }
        });
        
        Utils.log('Mobile menu initialized');
    },
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    },
    
    open() {
        DOM.navMenu.classList.add('open');
        DOM.navOverlay.classList.add('active');
        DOM.mobileMenuToggle.classList.add('active');
        DOM.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        DOM.body.classList.add('menu-open');
        this.isOpen = true;
        
        // Ajouter listener Escape
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
        
        Utils.log('Mobile menu opened');
    },
    
    close() {
        if (!this.isOpen) return;
        
        DOM.navMenu.classList.remove('open');
        DOM.navOverlay.classList.remove('active');
        DOM.mobileMenuToggle.classList.remove('active');
        DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        DOM.body.classList.remove('menu-open');
        this.isOpen = false;
        
        // Retirer listener Escape
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
        
        Utils.log('Mobile menu closed');
    }
};

/* =====================================================
   MODULE DROPDOWN MENU
   ===================================================== */

const Dropdown = {
    init() {
        if (!DOM.dropdownToggle) {
            Utils.log('Dropdown toggle not found, skipping initialization');
            return;
        }
        
        // Toggle dropdown
        DOM.dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle(e.currentTarget);
        });
        
        // Event delegation pour fermer
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-dropdown-content a')) {
                this.closeAll();
            } else if (!e.target.closest('.nav-dropdown')) {
                this.closeAll();
            }
        });
        
        Utils.log('Dropdown initialized');
    },
    
    toggle(toggleElement) {
        const dropdown = toggleElement.closest('.nav-dropdown');
        if (!dropdown) return;
        
        const content = dropdown.querySelector('.nav-dropdown-content');
        const arrow = toggleElement.querySelector('.arrow');
        const isOpen = content.classList.contains('open');
        
        // Fermer tous les autres
        this.closeAll();
        
        // Toggle celui-ci
        if (!isOpen) {
            content.classList.add('open');
            if (arrow) arrow.style.transform = 'rotate(180deg)';
            Utils.log('Dropdown opened');
        }
    },
    
    closeAll() {
        document.querySelectorAll('.nav-dropdown-content.open')
            .forEach(content => content.classList.remove('open'));
        document.querySelectorAll('.arrow')
            .forEach(arrow => arrow.style.transform = 'rotate(0deg)');
    }
};

/* =====================================================
   MODULE FORMULAIRES
   ===================================================== */

const Forms = {
    init() {
        this.initNewsletter();
        this.initContact();
        this.initCharCounter();
        Utils.log('Forms initialized');
    },
    
    initNewsletter() {
        const forms = document.querySelectorAll('form[name^="newsletter"]');
        if (forms.length === 0) return;
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const email = form.querySelector('input[type="email"]');
                if (email && Utils.isValidEmail(email.value)) {
                    setTimeout(() => this.showSuccess(), 1000);
                }
            });
        });
        
        Utils.log(`Newsletter forms initialized: ${forms.length}`);
    },
    
    initContact() {
        const form = document.querySelector('form[name="contact"]');
        if (!form) return;
        
        form.addEventListener('submit', () => {
            setTimeout(() => {
                const successMsg = document.getElementById('success-message');
                const formContainer = document.querySelector('.contact-form');
                
                if (successMsg && formContainer) {
                    formContainer.style.display = 'none';
                    successMsg.style.display = 'block';
                }
            }, 100);
        });
        
        Utils.log('Contact form initialized');
    },
    
    initCharCounter() {
        const textarea = document.getElementById('message');
        const charCount = document.getElementById('char-count');
        
        if (textarea && charCount) {
            textarea.addEventListener('input', () => {
                charCount.textContent = textarea.value.length;
            });
            Utils.log('Char counter initialized');
        }
    },
    
    showSuccess() {
        const successMsg = document.getElementById('success-message');
        if (successMsg) {
            successMsg.classList.add('show');
            successMsg.style.display = 'block';
            Utils.log('Success message shown');
        }
    }
};

/* =====================================================
   MODULE FAQ
   ===================================================== */

const FAQ = {
    init() {
        // Event delegation pour les questions FAQ
        document.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (question) {
                this.toggle(question.parentElement);
            }
        });
        
        Utils.log('FAQ initialized');
    },
    
    toggle(faqItem) {
        if (!faqItem) return;
        
        const isActive = faqItem.classList.contains('active');
        
        // Fermer tous les autres
        document.querySelectorAll('.faq-item.active')
            .forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
        
        // Toggle celui-ci
        if (!isActive) {
            faqItem.classList.add('active');
        } else {
            faqItem.classList.remove('active');
        }
    }
};

/* =====================================================
   MODULE ANIMATIONS
   ===================================================== */

const Animations = {
    observer: null,
    
    init() {
        this.initScrollAnimations();
        this.initLazyImages();
        this.optimizeHovers();
        Utils.log('Animations initialized');
    },
    
    initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            Utils.log('IntersectionObserver not supported, skipping scroll animations');
            return;
        }
        
        // Créer observer pour les animations au scroll
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observer les éléments avec animations
        const animatedElements = document.querySelectorAll('.card, .archive-item, .feature');
        animatedElements.forEach(el => {
            // Préparer l'élément pour l'animation
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            this.observer.observe(el);
        });
        
        Utils.log(`Scroll animations set for ${animatedElements.length} elements`);
    },
    
    initLazyImages() {
        if (!('IntersectionObserver' in window)) {
            Utils.log('IntersectionObserver not supported, skipping lazy images');
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
        
        Utils.log(`Lazy loading set for ${lazyImages.length} images`);
    },
    
    optimizeHovers() {
        const animatedElements = document.querySelectorAll('.cta, .card, .archive-item');
        
        animatedElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.willChange = 'transform';
            }, { passive: true });
            
            el.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    el.style.willChange = 'auto';
                }, CONFIG.animationDuration);
            }, { passive: true });
        });
        
        Utils.log(`Hover optimization set for ${animatedElements.length} elements`);
    }
};

/* =====================================================
   MODULE ZOOM IMAGE
   ===================================================== */

const ImageZoom = {
    overlay: null,
    escapeHandler: null,
    
    init() {
        // Attacher événements aux éléments zoomables
        const zoomableElements = document.querySelectorAll('.zoom-badge, .document-image');
        
        zoomableElements.forEach(el => {
            el.style.cursor = 'zoom-in';
            el.addEventListener('click', (e) => {
                const imageContainer = e.target.closest('.document-image-container');
                if (imageContainer) {
                    this.open(imageContainer);
                }
            });
        });
        
        if (zoomableElements.length > 0) {
            Utils.log(`Image zoom initialized for ${zoomableElements.length} elements`);
        }
    },
    
    open(container) {
        const image = container.querySelector('.document-image');
        if (!image) return;
        
        const imageSrcMatch = image.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (!imageSrcMatch) return;
        
        this.createOverlay(imageSrcMatch[1]);
    },
    
    createOverlay(imageSrc) {
        // Créer overlay
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-out;
            animation: fadeIn 0.3s ease;
        `;
        
        // Créer image
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Document agrandi';
        img.style.cssText = `
            max-width: 95%;
            max-height: 95%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.3s ease;
        `;
        
        // Indicateur fermeture
        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✕ Cliquez ou appuyez sur Échap pour fermer';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            color: white;
            background: rgba(0, 0, 0, 0.7);
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10001;
        `;
        
        this.overlay.appendChild(img);
        this.overlay.appendChild(closeBtn);
        document.body.appendChild(this.overlay);
        document.body.style.overflow = 'hidden';
        
        // Événements
        this.overlay.addEventListener('click', () => this.close());
        img.addEventListener('click', (e) => e.stopPropagation());
        
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') this.close();
        };
        document.addEventListener('keydown', this.escapeHandler);
        
        Utils.log('Image zoom overlay opened');
    },
    
    close() {
        if (!this.overlay) return;
        
        this.overlay.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            this.overlay = null;
            document.body.style.overflow = '';
        }, CONFIG.animationDuration);
        
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
        
        Utils.log('Image zoom overlay closed');
    }
};

/* =====================================================
   MODULE SMOOTH SCROLL
   ===================================================== */

const SmoothScroll = {
    init() {
        // Event delegation pour tous les liens avec ancres
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                Utils.log(`Smooth scroll to ${href}`);
            }
        });
        
        Utils.log('Smooth scroll initialized');
    }
};

/* =====================================================
   MODULE GESTION ERREURS
   ===================================================== */

const ErrorHandler = {
    init() {
        window.addEventListener('error', (e) => {
            Utils.log('JavaScript error detected:', e.error);
            
            // En production, envoyer vers service de logs
            if (!CONFIG.isDev) {
                this.logToServer(e);
            }
            
            // Afficher message utilisateur (optionnel)
            // this.showUserError();
        });
        
        // Erreurs de chargement de ressources
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                Utils.log('Resource loading error:', e.target.src || e.target.href);
            }
        }, true);
        
        Utils.log('Error handler initialized');
    },
    
    logToServer(error) {
        // À implémenter avec votre service de logs (Sentry, LogRocket, etc.)
        if (CONFIG.isDev) return;
        
        try {
            const errorData = {
                message: error.message,
                stack: error.error?.stack,
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
            
            // Exemple d'envoi (à adapter)
            // fetch('https://your-logging-service.com/log', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(errorData)
            // }).catch(() => {});
            
            Utils.log('Error logged to server:', errorData);
        } catch (err) {
            // Échec silencieux du logging
        }
    },
    
    showUserError() {
        const toast = document.createElement('div');
        toast.textContent = 'Une erreur est survenue. Veuillez rafraîchir la page.';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInUp 0.3s ease;
            font-family: inherit;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
};

/* =====================================================
   INITIALISATION PRINCIPALE
   ===================================================== */

Utils.ready(() => {
    // Message console (uniquement en dev)
    if (CONFIG.isDev) {
        console.log(
            '%c📖 Division Zeitung',
            'font-size: 20px; font-weight: bold; color: #b8860b;'
        );
        console.log(
            '%cRevue d\'histoire militaire - divisionzeitung.fr',
            'font-size: 12px; color: #6b5b47;'
        );
    }
    
    // Initialiser le cache DOM
    DOM.init();
    
    // Initialiser tous les modules
    MobileMenu.init();
    Dropdown.init();
    Forms.init();
    FAQ.init();
    Animations.init();
    ImageZoom.init();
    SmoothScroll.init();
    ErrorHandler.init();
    
    Utils.log('✅ All modules initialized successfully');
});

/* =====================================================
   EXPORTS (si besoin pour tests)
   ===================================================== */

// Si tu veux tester les modules individuellement
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        MobileMenu,
        Dropdown,
        Forms,
        FAQ,
        Animations,
        ImageZoom,
        SmoothScroll,
        ErrorHandler
    };
}

/* =====================================================
   FIN DU FICHIER
   ===================================================== */
