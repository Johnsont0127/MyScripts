/* Mobile Testing Script */

document.addEventListener('DOMContentLoaded', function() {
  // Add page identifier to body for mobile-specific styling
  const currentPath = window.location.pathname;
  
  // Set active state for bottom navigation
  if (currentPath === '/') {
    document.body.classList.add('page-home');
  } else if (currentPath.includes('/dashboard')) {
    document.body.classList.add('page-dashboard');
  } else if (currentPath.includes('/scripts/generate')) {
    document.body.classList.add('page-generate');
  } else if (currentPath.includes('/scripts')) {
    document.body.classList.add('page-scripts');
  } else if (currentPath.includes('/users/account')) {
    document.body.classList.add('page-account');
  }
  
  // Enhance form elements for mobile
  const enhanceFormElements = () => {
    // Make labels tap targets for their inputs
    document.querySelectorAll('.form-label').forEach(label => {
      label.addEventListener('click', function() {
        const forAttr = this.getAttribute('for');
        if (forAttr) {
          const input = document.getElementById(forAttr);
          if (input) {
            input.focus();
          }
        }
      });
    });
    
    // Improve radio and checkbox tap targets
    document.querySelectorAll('.form-check-label').forEach(label => {
      label.addEventListener('click', function() {
        const forAttr = this.getAttribute('for');
        if (forAttr) {
          const input = document.getElementById(forAttr);
          if (input) {
            input.checked = !input.checked;
          }
        }
      });
    });
  };
  
  // Only run on mobile devices
  if (window.innerWidth < 992) {
    enhanceFormElements();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add active state to navbar items
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
    
    // Log mobile optimization is active
    console.log('Mobile optimizations active');
  }
});
