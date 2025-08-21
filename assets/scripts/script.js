/**
 * Chef Alexandre - Site Vitrine JavaScript
 * Navigation mobile, galerie, formulaires, accessibilité
 */

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.nav-mobile');
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');

// Gallery data
const galleryData = [
    {
        src: 'images/dish-1.jpg',
        alt: 'Plat gastronomique élégamment dressé sur assiette blanche',
        title: 'Création Gastronomique',
        description: 'Un plat signature alliant techniques modernes et saveurs traditionnelles'
    },
    {
        src: 'images/dish-2.jpg',
        alt: 'Plat de poisson sophistiqué avec sauce dorée',
        title: 'Spécialité de Poisson',
        description: 'Poisson de ligne accompagné de sa sauce signature aux agrumes'
    },
    {
        src: 'images/chef-hero.jpg',
        alt: 'Chef Alexandre en action dans sa cuisine',
        title: 'L\'Art Culinaire',
        description: 'La passion et la précision au cœur de chaque création'
    },
    {
        src: 'images/dessert-1.jpg',
        alt: 'Présentation artistique d\'un dessert',
        title: 'Dessert d\'Exception',
        description: 'Création sucrée alliant textures et saveurs inattendues'
    },
    {
        src: 'images/dish-2.jpg',
        alt: 'Mise en scène culinaire raffinée',
        title: 'Art de la Table',
        description: 'Chaque plat est une œuvre d\'art visuelle et gustative'
    },
    {
        src: 'images/chef-hero.jpg',
        alt: 'Préparation minutieuse d\'un plat',
        title: 'Précision Culinaire',
        description: 'L\'excellence se trouve dans les détails de chaque geste'
    }
];

let currentImageIndex = 0;

// Mobile Menu Toggle
function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// Gallery Functions
function openGalleryModal(index) {
    currentImageIndex = index;
    const imageData = galleryData[index];
    
    modalImage.src = imageData.src;
    modalImage.alt = imageData.alt;
    modalTitle.textContent = imageData.title;
    modalDescription.textContent = imageData.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalImage.focus();
}

function closeGalleryModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    openGalleryModal(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = currentImageIndex === 0 ? galleryData.length - 1 : currentImageIndex - 1;
    openGalleryModal(currentImageIndex);
}

// Form Functions
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success modal
        showSuccessModal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

function showSuccessModal() {
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
    }
}

function closeSuccessModal() {
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Check URL parameters for success message
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sent') === 'true') {
        showSuccessModal();
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Keyboard Navigation
function handleKeyDown(e) {
    if (modal.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeGalleryModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
    
    if (mobileMenu.classList.contains('active') && e.key === 'Escape') {
        closeMobileMenu();
    }
}

// Initialize Event Listeners
function initEventListeners() {
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openGalleryModal(index));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGalleryModal(index);
            }
        });
    });
    
    // Modal controls
    if (modal) {
        const modalClose = modal.querySelector('.modal-close');
        const modalPrev = modal.querySelector('.modal-prev');
        const modalNext = modal.querySelector('.modal-next');
        const modalBackdrop = modal.querySelector('.modal-backdrop');
        
        if (modalClose) modalClose.addEventListener('click', closeGalleryModal);
        if (modalPrev) modalPrev.addEventListener('click', showPrevImage);
        if (modalNext) modalNext.addEventListener('click', showNextImage);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeGalleryModal);
    }
    
    // Success modal
    if (successModal) {
        const successBackdrop = successModal.querySelector('.modal-backdrop');
        if (successBackdrop) {
            successBackdrop.addEventListener('click', closeSuccessModal);
        }
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    checkURLParams();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.card, .specialty-card, .menu-card, .texture-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Global functions for inline event handlers
window.closeSuccessModal = closeSuccessModal;