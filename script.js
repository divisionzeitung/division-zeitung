/* =====================================================
   SCRIPT.JS - Division Zeitung
   Script global pour toutes les pages
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // MENU DÉROULANT
    // =====================================================
    
    const dropdownToggle = document.getElementById('archives-dropdown');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Trouve le parent li.nav-dropdown
            const dropdownParent = this.closest('.nav-dropdown');
            const dropdownContent = dropdownParent.querySelector('.nav-dropdown-content');
            
            // Toggle la classe open
            dropdownContent.classList.toggle('open');
            
            // Anime la flèche
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = dropdownContent.classList.contains('open')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)';
            }
        });
    }
    
    // Fermeture automatique du menu au clic ailleurs
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
    // DÉTECTION DU THÈME SOMBRE (Optionnel - Future feature)
    // =====================================================
    
    // Détecter si l'utilisateur préfère le mode sombre
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // if (prefersDark) {
    //     document.body.classList.add('dark-mode');
    // }

    // =====================================================
    // ANALYTICS / TRACKING (À ajouter si besoin)
    // =====================================================
    
    // Exemple : Google Analytics, Plausible, etc.
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'page_view', {
    //         page_title: document.title,
    //         page_location: window.location.href
    //     });
    // }

    // =====================================================
    // CONSOLE MESSAGE (Optionnel - Pour les curieux)
    // =====================================================
    
    console.log('%c📖 Division Zeitung', 'font-size: 20px; font-weight: bold; color: #b8860b;');
    console.log('%cRevue d\'histoire militaire - divisionzeitung.fr', 'font-size: 12px; color: #6b5b47;');
    console.log('%cVous êtes curieux ? Contactez-moi : divisionzeitung@gmail.com', 'font-size: 11px; color: #999;');

});

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
