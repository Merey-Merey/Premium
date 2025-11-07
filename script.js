document.addEventListener('DOMContentLoaded', function() {
    // Инициализация каруселей
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const items = Array.from(carouselInner.children);
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth + 20; // 20px - gap
        
        // Создание точек
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            if (index < 0) index = items.length - 1;
            if (index >= items.length) index = 0;
            
            currentIndex = index;
            carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            updateDots();
        }
        
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // Автоматическая смена слайдов (опционально)
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

    // Плавная прокрутка по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация при прокрутке (опционально)
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});



const slider = document.querySelector('.reviews-slider');
const dotsContainer = document.querySelector('.carousel-dots');
const slides = document.querySelectorAll('.review-card, .review-video');

// Создание точек
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('div');
let index = 0;

// Автопрокрутка каждые 4 секунды
setInterval(() => {
  index = (index + 1) % slides.length;
  slider.scrollTo({
    left: slides[index].offsetLeft,
    behavior: 'smooth'
  });
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}, 4000);


// Бургер-меню
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
});