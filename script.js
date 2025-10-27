/* =====================================================
   SCRIPT.JS - Division Zeitung
   Version avec menu mobile hamburger
   Script global pour toutes les pages
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // MENU MOBILE HAMBURGER
    // =====================================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    if (mobileMenuToggle && navMenu && navOverlay) {
        // Ouvrir/fermer le menu mobile
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Fermer en cliquant sur l'overlay
        navOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Fermer en cliquant sur un lien (sauf dropdown toggle)
        navMenu.querySelectorAll('.nav-item:not(.nav-dropdown-toggle)').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.contains('open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navMenu.classList.add('open');
        navOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    }
    
    // =====================================================
    // MENU DÉROULANT (Desktop + Mobile)
    // =====================================================
    
    const dropdownToggle = document.getElementById('archives-dropdown');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownParent = this.closest('.nav-dropdown');
            const dropdownContent = dropdownParent.querySelector('.nav-dropdown-content');
            const arrow = this.querySelector('.arrow');
            
            // Toggle
            const isOpen = dropdownContent.classList.contains('open');
            
            // Fermer tous les autres dropdowns
            document.querySelectorAll('.nav-dropdown-content.open').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('open');
                }
            });
            
            document.querySelectorAll('.arrow').forEach(arr => {
                if (arr !== arrow) {
                    arr.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle celui-ci
            if (isOpen) {
                dropdownContent.classList.remove('open');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            } else {
                dropdownContent.classList.add('open');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        });
    }
    
    // Fermer dropdown en cliquant sur un lien
    document.querySelectorAll('.nav-dropdown-content a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-dropdown-content.open').forEach(content => {
                content.classList.remove('open');
            });
            document.querySelectorAll('.arrow').forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        });
    });
    
    // Fermer dropdown en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown-content.open').forEach(content => {
                content.classList.remove('open');
            });
            document.querySelectorAll('.arrow').forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        }
    });

    // =====================================================
    // SMOOTH SCROLL POUR LES ANCRES
    // =====================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ne pas empêcher le comportement par défaut si c'est juste "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =====================================================
    // GESTION DES FORMULAIRES
    // =====================================================
    
    // Formulaire Newsletter
    const newsletterForms = document.querySelectorAll('form[name^="newsletter"]');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Netlify gère la soumission
            const email = this.querySelector('input[type="email"]').value;
            
            // Optionnel : validation simple
            if (email && email.includes('@')) {
                setTimeout(() => {
                    const successMsg = document.getElementById('success-message');
                    if (successMsg) {
                        successMsg.classList.add('show');
                        successMsg.style.display = 'block';
                    }
                }, 1000);
            }
        });
    });

    // Formulaire Contact
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Netlify gère la soumission
            setTimeout(() => {
                const successMsg = document.getElementById('success-message');
                const formContainer = document.querySelector('.contact-form');
                if (successMsg && formContainer) {
                    formContainer.style.display = 'none';
                    successMsg.style.display = 'block';
                }
            }, 100);
        });
    }

    // =====================================================
    // COMPTEUR DE CARACTÈRES (Page Contact)
    // =====================================================
    
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // =====================================================
    // FAQ TOGGLE (Page Newsletter)
    // =====================================================
    
    window.toggleFaq = function(element) {
        const faqItem = element.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fermer tous les autres FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Ouvrir celui-ci si il n'était pas actif
        if (!isActive) {
            faqItem.classList.add('active');
        }
    };

    // =====================================================
    // ZOOM IMAGE DOCUMENT (Page Newsletter)
    // =====================================================
    
    // Attacher l'événement de zoom au badge
    const zoomBadge = document.querySelector('.zoom-badge');
    if (zoomBadge) {
        zoomBadge.addEventListener('click', zoomImage);
        zoomBadge.style.cursor = 'pointer';
    }
    
    // On peut aussi ajouter le zoom directement sur l'image
    const documentImage = document.querySelector('.document-image');
    if (documentImage) {
        documentImage.style.cursor = 'zoom-in';
        documentImage.addEventListener('click', zoomImage);
    }

    // =====================================================
    // LAZY LOADING DES IMAGES (Optionnel)
    // =====================================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // =====================================================
    // CONSOLE MESSAGE (Optionnel - Pour les curieux)
    // =====================================================
    
    console.log('%c📖 Division Zeitung', 'font-size: 20px; font-weight: bold; color: #b8860b;');
    console.log('%cRevue d\'histoire militaire - divisionzeitung.fr', 'font-size: 12px; color: #6b5b47;');
    console.log('%cVous êtes curieux ? Contactez-moi : divisionzeitung@gmail.com', 'font-size: 11px; color: #999;');

});

// =====================================================
// FONCTION ZOOM IMAGE (Appelée depuis le DOM)
// =====================================================

function zoomImage() {
    const imageContainer = document.querySelector('.document-image-container');
    if (!imageContainer) return;
    
    const image = imageContainer.querySelector('.document-image');
    const imageSrcMatch = image.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    
    if (!imageSrcMatch) return;
    const imageSrc = imageSrcMatch[1];
    
    // Créer l'overlay de zoom (fond noir)
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        animation: fadeIn 0.3s ease;
    `;
    
    // Créer l'image zoomée
    const zoomedImage = document.createElement('img');
    zoomedImage.src = imageSrc;
    zoomedImage.alt = 'Document agrandi';
    zoomedImage.style.cssText = `
        max-width: 95%;
        max-height: 95%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        animation: zoomIn 0.3s ease;
    `;
    
    // Ajouter un indicateur de fermeture
    const closeIndicator = document.createElement('div');
    closeIndicator.textContent = '✕ Cliquez ou appuyez sur Échap pour fermer';
    closeIndicator.style.cssText = `
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
    
    // Ajouter les animations CSS si elles n'existent pas déjà
    if (!document.getElementById('zoom-animations')) {
        const style = document.createElement('style');
        style.id = 'zoom-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Assembler et afficher
    overlay.appendChild(zoomedImage);
    overlay.appendChild(closeIndicator);
    document.body.appendChild(overlay);
    
    // Empêcher le scroll du body quand l'overlay est ouvert
    document.body.style.overflow = 'hidden';
    
    // Fonction de fermeture
    function closeOverlay() {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = ''; // Rétablir le scroll
        }, 300);
    }
    
    // Fermer au clic sur l'overlay
    overlay.addEventListener('click', closeOverlay);
    
    // Empêcher la fermeture si on clique sur l'image elle-même
    zoomedImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Fermer avec la touche Échap
    const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);
}

// =====================================================
// FONCTIONS UTILITAIRES GLOBALES
// =====================================================

// Fonction pour valider un email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fonction pour formatter une date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

// Fonction pour copier dans le presse-papier
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copié dans le presse-papier !');
        });
    } else {
        // Fallback pour les anciens navigateurs
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// =====================================================
// GESTION DES ERREURS GLOBALES
// =====================================================

window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript détectée:', e.error);
    // Optionnel : envoyer à un service de monitoring
});

// Protection contre scripts bloqués
if (!window.fetch) {
    console.warn('Fetch API non disponible, certaines fonctionnalités peuvent ne pas fonctionner');
}

// =====================================================
// FIN DU SCRIPT
// =====================================================
