document.addEventListener('DOMContentLoaded', function() {
    
    // --- MENU DÉROULANT SIMPLIFIÉ ---
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
                arrow.style.transform = dropdownContent.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }
    
    // Fermer au clic extérieur
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

    // --- NAVIGATION ENTRE PAGES ---
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-dropdown-content a)');
    const pageSections = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            let targetId;
            if (href === 'index.html') {
                targetId = 'accueil'; 
            } else {
                targetId = href.substring(0, href.lastIndexOf('.'));
            }

            const targetPage = document.getElementById(targetId);

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            if (targetPage) {
                e.preventDefault(); 
                pageSections.forEach(page => page.classList.remove('active'));
                targetPage.classList.add('active');
            }
        });
    });
});
