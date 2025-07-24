// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});
        
// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
        
// Portfolio Lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxVideo = document.querySelector('.lightbox-video');
const closeLightbox = document.querySelector('.close-lightbox');
const closeLightboxBtn = document.querySelector('.close-lightbox-btn');
const projectTitle = document.querySelector('.project-title');
const projectDesc = document.querySelector('.project-desc');
const projectLink = document.querySelector('.project-link'); // Tombol "Visit"

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        const link = item.getAttribute('data-link'); // Ambil nilai data-link
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');

        // Populate common data
        projectTitle.textContent = title;
        projectDesc.textContent = desc;

        // === AWAL PERUBAHAN ===
        // Logika untuk menampilkan atau menyembunyikan tombol "Visit"
        if (link && link.trim() !== '') {
            projectLink.href = link; // Atur href tombol
            projectLink.style.display = 'inline-block'; // Tampilkan tombol
        } else {
            projectLink.style.display = 'none'; // Sembunyikan tombol jika data-link kosong
        }
        // === AKHIR PERUBAHAN ===

        if (type === 'video') {
            const videoSrc = item.getAttribute('data-video-src');
            lightboxVideo.src = videoSrc;
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
            lightboxVideo.play();
        } else {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});
        
// Close lightbox
const closeLightboxHandler = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Pause and reset video to stop background playback
    lightboxVideo.pause();
    lightboxVideo.src = '';
};

closeLightbox.addEventListener('click', closeLightboxHandler);
closeLightboxBtn.addEventListener('click', closeLightboxHandler);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxHandler();
    }
});
        
// Experience Slider
const slider = document.querySelector('.experience-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cardWidth = document.querySelector('.experience-card').offsetWidth;
const gap = 30;
let position = 0;

nextBtn.addEventListener('click', () => {
    const maxPosition = -(slider.scrollWidth - slider.clientWidth);
    position = Math.max(position - (cardWidth + gap), maxPosition);
    slider.style.transform = `translateX(${position}px)`;
});
        
prevBtn.addEventListener('click', () => {
    position = Math.min(position + (cardWidth + gap), 0);
    slider.style.transform = `translateX(${position}px)`;
});
        
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]:not(.project-link)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            nav.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
        
// Portfolio Filter
const filterButtons = document.querySelectorAll('.btn-filter');
const portfolioItemsAll = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItemsAll.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});