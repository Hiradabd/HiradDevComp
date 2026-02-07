// Smooth scroll with offset for fixed navbar
function scrollToSection(id) {
  const element = document.getElementById(id);
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const elementPosition = element.offsetTop - navbarHeight - 20;
  
  window.scrollTo({
    top: elementPosition,
    behavior: "smooth"
  });
}

// Dark / Light mode toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  
  // Save preference to localStorage
  localStorage.setItem('theme', document.body.classList.contains("dark") ? 'dark' : 'light');
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = "☀️";
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Resume download function
function downloadResume() {
  // Create a simple resume content (you can replace this with actual PDF generation)
  const resumeContent = `
HiradDevComp - Full Stack Developer Resume

CONTACT
Email: hirad@devcomp.com
Phone: +1 (234) 567-890
Location: San Francisco, CA
GitHub: github.com/HiradDevComp
LinkedIn: linkedin.com/in/HiradDevComp

SUMMARY
Passionate full-stack developer with 3+ years of experience creating modern web applications. 
Specialized in React, Node.js, and MongoDB with a focus on user experience and clean code.

SKILLS
Frontend: HTML5, CSS3, JavaScript, React, Vue.js
Backend: Node.js, Express, Python
Database: MongoDB, SQL
Tools: Git, Docker, Figma
Other: REST APIs, Responsive Design, UI/UX

EXPERIENCE
Senior Frontend Developer | TechCorp Solutions | 2023-Present
- Lead frontend development for enterprise applications
- Mentor junior developers and implement best practices
- Technologies: React, TypeScript, Redux

Full Stack Developer | Digital Innovations Inc | 2021-2023
- Developed and maintained multiple web applications
- Collaborated with design teams and optimized performance
- Technologies: Node.js, MongoDB, Express

EDUCATION
Bachelor of Computer Science | University of Technology | 2017-2021
- Graduated with honors
- Specialized in web development and software engineering

PROJECTS
- E-Commerce Platform: Full-stack solution with React, Node.js, MongoDB
- Task Management App: Collaborative app with Vue.js and Firebase
- Weather Dashboard: Interactive weather app with Chart.js
- Portfolio Website: Modern responsive portfolio with animations

COURSES & TEACHING
- React Mastery Course: 2.5k+ students, 4.8/5 rating
- JavaScript Essentials: 1.8k+ students, 4.9/5 rating
- Creative Web Design: 1.2k+ students, 4.7/5 rating
  `;
  
  // Create and download file
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'HiradDevComp_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  // Show success message
  showNotification('Resume downloaded successfully!', 'success');
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission (replace with actual backend integration)
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      // Simulate successful submission
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.project-card, .skill-category, .course-card, .timeline-item');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'var(--card)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'var(--card)';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  skillBars.forEach(bar => {
    const level = bar.dataset.level || '0';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = `${level}%`;
    }, 500);
  });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);
}

// Project card hover effects
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-text h2');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

