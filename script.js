
// Animated Skill Progress Bars

function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = progress + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}


// Open Portfolio Projects (NO <a> TAG)

function setupProjectLinks() {
  const projectBoxes = document.querySelectorAll('.project-box');
  
  projectBoxes.forEach(box => {
    box.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });

    // Add visual feedback
    box.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });
}

// Canvas Drawing (HTML5)

function drawOnCanvas() {
  const canvas = document.getElementById('myCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');

  // Draw a gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#0078ff');
  gradient.addColorStop(1, '#00a2ff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw some shapes
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Welcome!', canvas.width / 2, 60);

  // Draw a circle
  ctx.beginPath();
  ctx.arc(150, 130, 40, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fill();

  // Draw a rectangle
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillRect(50, 150, 80, 30);
}

// Image Slider

function setupImageSlider() {
  const images = document.querySelectorAll('.slider-img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  
  let currentIndex = 0;

  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function showSlide(index) {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    images[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
  }

  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// Dark/Light Mode Toggle

function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}

// Back-to-Top Button

function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  // Show button on scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top smoothly when clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize all features when DOM is loaded

document.addEventListener('DOMContentLoaded', function() {
  animateSkills();
  setupProjectLinks();
  drawOnCanvas();
  setupImageSlider();
  setupThemeToggle();
  setupBackToTop();
  
  console.log('Portfolio Week 02 features loaded successfully! 🚀');
});