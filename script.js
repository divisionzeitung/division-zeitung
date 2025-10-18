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
                arrow.style.transform = dropdownContent.classList.contains('open')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)';
            }
        });
    }
    
    // --- FERMETURE AUTOMATIQUE DU MENU ---
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

    // ✅ NAVIGATION CLASSIQUE LAISSÉE À L'ÉTAT NATUREL
    // (on ne bloque plus les clics sur les liens)
});

