/*==================== Navigation Professionnelle ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header'); // Correction: querySelector au lieu de querySelectorAll
let menuIcon = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar');

// Fonction de throttling pour optimiser les performances
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Fonction principale de scroll optimisée
const handleScroll = throttle(() => {
    let top = window.scrollY;
    
    // Mise à jour des liens actifs
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector('header nav a[href="#' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // Header sticky
    if (header) {
        header.classList.toggle('sticky', top > 100);
    }
}, 16);

// Écouteur d'événement
window.addEventListener('scroll', handleScroll);

// Menu mobile toggle
if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

// Smooth scroll pour les liens de navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Fermer le menu mobile
        if (navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });
});

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    handleScroll(); // Définir le lien actif initial
});