// AppMuse - Main JavaScript functionality
// Handles animations, interactions, theme switching, and dynamic effects

class AppMuse {
  constructor() {
    this.init();
  }

  init() {
    this.setupThemeSystem();
    this.setupIntersectionObserver();
    this.setupCardTiltEffect();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupFormHandling();
    this.setupLanguageDropdown();
    this.setupContactSecurity();
    this.setupAmbiancePageScrollEffects();
    this.setupBlogFunctionality();
  }

  setupBlogFunctionality() {
    const mobileBlogBtn = document.getElementById('mobile-blog-list-btn');
    const mobileBlogPanel = document.getElementById('mobile-blog-panel');
    const closeBlogPanel = document.getElementById('close-blog-panel');
    const mobileOverlay = document.getElementById('mobile-panel-overlay');
    const articleLinks = document.querySelectorAll('.article-link');
    const articleCards = document.querySelectorAll('.article-card');

    if (!mobileBlogBtn || !mobileBlogPanel) return;

    // Mobile blog panel toggle
    mobileBlogBtn.addEventListener('click', () => {
      this.openBlogPanel();
    });

    // Close panel button
    if (closeBlogPanel) {
      closeBlogPanel.addEventListener('click', () => {
        this.closeBlogPanel();
      });
    }

    // Close panel when clicking overlay
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        this.closeBlogPanel();
      });
    }

    // Article link functionality
    articleLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = link.getAttribute('data-article');
        
        // Update active states
        articleLinks.forEach(l => l.classList.remove('active'));
        articleCards.forEach(c => c.classList.remove('active'));
        
        link.classList.add('active');
        const targetCard = document.getElementById(articleId);
        if (targetCard) {
          targetCard.classList.add('active');
          
          // Scroll to article on desktop, close panel on mobile
          if (window.innerWidth >= 768) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            this.closeBlogPanel();
            setTimeout(() => {
              targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }
      });
    });

    // Close panel on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.closeBlogPanel();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeBlogPanel();
      }
    });
  }

  openBlogPanel() {
    const mobileBlogPanel = document.getElementById('mobile-blog-panel');
    const mobileOverlay = document.getElementById('mobile-panel-overlay');
    
    if (mobileBlogPanel && mobileOverlay) {
      mobileBlogPanel.classList.add('open');
      mobileBlogPanel.style.transform = 'translateX(0)';
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  closeBlogPanel() {
    const mobileBlogPanel = document.getElementById('mobile-blog-panel');
    const mobileOverlay = document.getElementById('mobile-panel-overlay');
    
    if (mobileBlogPanel && mobileOverlay) {
      mobileBlogPanel.classList.remove('open');
      mobileBlogPanel.style.transform = 'translateX(-100%)';
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  setupAmbiancePageScrollEffects() {
    const body = document.body;
    if (body.classList.contains('ambiance-page-background')) {
      let scrollThreshold = 150; 
      const firstSection = document.querySelector('.section-ambiance-profile');
      if (firstSection) {
        // scrollThreshold = firstSection.offsetHeight * 0.25; 
      }
      const handleScrollForAmbianceGradient = () => {
        if (window.scrollY > scrollThreshold) {
          body.classList.add('gradient-overlay-active');
        } else {
          body.classList.remove('gradient-overlay-active');
        }
      };
      window.addEventListener('scroll', handleScrollForAmbianceGradient, { passive: true });
      handleScrollForAmbianceGradient(); 
    }
  }

  setupThemeSystem() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    const sunIcon = themeSwitch?.querySelector('.sun-icon');
    const moonIcon = themeSwitch?.querySelector('.moon-icon');
    if (!themeSwitch) return;
    
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || savedTheme === null;
    
    if (!isDark) {
      body.classList.add('light');
      if (sunIcon && moonIcon) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
    
    themeSwitch.addEventListener('click', () => {
      const isCurrentlyLight = body.classList.contains('light');
      if (isCurrentlyLight) {
        body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        if (sunIcon && moonIcon) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        }
      } else {
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
        if (sunIcon && moonIcon) {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
      themeSwitch.style.transform = 'scale(0.9)';
      setTimeout(() => {
        themeSwitch.style.transform = 'scale(1)';
      }, 150);
    });
  }

  setupLanguageDropdown() {
    const langLinks = document.querySelectorAll('.lang-link');
    const currentLangSpan = document.getElementById('current-lang');
    const langDropdownBtn = document.querySelector('.lang-dropdown-btn');
    const langDropdownMenu = document.querySelector('.lang-dropdown-menu');
    
    // Handle language selection
    langLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const selectedLang = link.getAttribute('data-lang');
        if (currentLangSpan) {
          currentLangSpan.textContent = selectedLang;
        }
        localStorage.setItem('selectedLanguage', selectedLang);
        
        // Close dropdown after selection
        if (langDropdownMenu) {
          langDropdownMenu.classList.remove('mobile-open');
        }
      });
    });

    // Language dropdown toggle - works on all screen sizes
    if (langDropdownBtn && langDropdownMenu) {
      langDropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the dropdown open/closed state
        if (window.innerWidth <= 768) {
          // Mobile: use mobile-open class
          langDropdownMenu.classList.toggle('mobile-open');
        } else {
          // Desktop: toggle visibility directly for immediate response
          const isCurrentlyVisible = langDropdownMenu.style.opacity === '1' || 
                                   langDropdownMenu.classList.contains('force-visible');
          
          if (isCurrentlyVisible) {
            langDropdownMenu.classList.remove('force-visible');
            langDropdownMenu.style.opacity = '0';
            langDropdownMenu.style.visibility = 'hidden';
            langDropdownMenu.style.transform = 'translateY(-10px)';
          } else {
            langDropdownMenu.classList.add('force-visible');
            langDropdownMenu.style.opacity = '1';
            langDropdownMenu.style.visibility = 'visible';
            langDropdownMenu.style.transform = 'translateY(0)';
          }
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!langDropdownBtn.contains(e.target) && !langDropdownMenu.contains(e.target)) {
          // Close for both mobile and desktop
          langDropdownMenu.classList.remove('mobile-open', 'force-visible');
          langDropdownMenu.style.opacity = '';
          langDropdownMenu.style.visibility = '';
          langDropdownMenu.style.transform = '';
        }
      });

      // Reset dropdown state on window resize
      window.addEventListener('resize', () => {
        langDropdownMenu.classList.remove('mobile-open', 'force-visible');
        langDropdownMenu.style.opacity = '';
        langDropdownMenu.style.visibility = '';
        langDropdownMenu.style.transform = '';
      });
    }
    
    // Load saved language
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && currentLangSpan) {
      currentLangSpan.textContent = savedLang;
    }
  }

  setupContactSecurity() {
    const revealEmail = document.getElementById('reveal-email');
    const emailAddress = document.getElementById('email-address');
    const revealPhone = document.getElementById('reveal-phone');
    const phoneNumber = document.getElementById('phone-number');
    const revealAddress = document.getElementById('reveal-address');
    const addressDetails = document.getElementById('address-details');
    
    if (revealEmail && emailAddress) {
      revealEmail.addEventListener('click', () => {
        revealEmail.classList.add('hidden');
        emailAddress.classList.remove('hidden');
      });
    }
    
    if (revealPhone && phoneNumber) {
      revealPhone.addEventListener('click', () => {
        revealPhone.classList.add('hidden');
        phoneNumber.classList.remove('hidden');
      });
    }
    
    if (revealAddress && addressDetails) {
      revealAddress.addEventListener('click', () => {
        revealAddress.classList.add('hidden');
        addressDetails.classList.remove('hidden');
      });
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(element => observer.observe(element));
  }

  setupCardTiltEffect() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.2s ease-out';
        
        if (!document.body.classList.contains('light')) {
          const glowElements = card.querySelectorAll('.glow, .glow-title, .highlight-text');
          glowElements.forEach(glow => {
            glow.style.textShadow = '0 0 12px var(--glow-blue)';
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        card.style.transition = 'transform 0.3s ease-out';
        
        const glowElements = card.querySelectorAll('.glow, .glow-title, .highlight-text');
        glowElements.forEach(glow => {
          glow.style.textShadow = document.body.classList.contains('light') ? 'none' : '0 0 8px var(--glow-blue)';
        });
      });
    });
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isHidden = mobileMenu.classList.contains('hidden');
      const spans = mobileMenuBtn.querySelectorAll('span');
      
      if (isHidden) {
        // Open menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('visible');
        
        // Animate hamburger to X
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        // Close menu
        this.closeMobileMenu();
      }
    });
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('visible');
      
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        if (targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        
        if (targetId.length > 1 && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  setupFormHandling() {
    const contactForm = document.querySelector('#contact-form');
    const newsletterForms = document.querySelectorAll('form[action*="formspree"]');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactForm(contactForm);
      });
    }
    
    newsletterForms.forEach(form => {
      if (form !== contactForm) {
        form.addEventListener('submit', (e) => {
          setTimeout(() => {
            this.showNotification('Thank you for subscribing!', 'success');
          }, 500);
        });
      }
    });
  }

  handleContactForm(form) {
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const email = formData.get('email');
    const message = formData.get('message');
    const captcha = formData.get('captcha');
    
    if (!firstName || !email || !message) {
      this.showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    if (parseInt(captcha) !== 8) {
      this.showNotification('Please answer the security question correctly.', 'error');
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    this.submitToMultipleServices(form, formData)
      .then(() => {
        this.showNotification('Thank you! Your message has been sent.', 'success');
        form.reset();
      })
      .catch((error) => {
        console.error('Submission error:', error);
        this.showNotification('There was an issue sending your message. Please try again.', 'error');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  }

  async submitToMultipleServices(form, formData) {
    const submissionData = {
      timestamp: new Date().toISOString(),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName') || '',
      email: formData.get('email'),
      service: formData.get('service') || '',
      message: formData.get('message')
    };
    
    let formspreeSuccess = false;
    let googleSheetsSuccess = false;
    
    try {
      const formspreeResponse = await fetch('https://formspree.io/f/xdovblvn', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (formspreeResponse.ok) {
        console.log('Successfully submitted to Formspree');
        formspreeSuccess = true;
      } else {
        console.warn('Formspree response not OK:', formspreeResponse.status);
        const errorText = await formspreeResponse.text();
        console.warn('Formspree error details:', errorText);
      }
    } catch (error) {
      console.warn('Formspree submission failed:', error);
    }
    
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzZcT9on-P094WA0wyyMeQydAeBLqKV9JdlJTI5ZewjS_H-tpqua3licDVukCFVyq_0/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      console.log('Submitted to Google Sheets (no-cors mode)');
      googleSheetsSuccess = true;
    } catch (error) {
      console.warn('Google Sheets submission failed:', error);
    }
    
    if (formspreeSuccess || googleSheetsSuccess) {
      console.log(`Submission results - Formspree: ${formspreeSuccess ? 'Success' : 'Failed'}, Google Sheets: ${googleSheetsSuccess ? 'Success' : 'Failed'}`);
      return Promise.resolve();
    } else {
      console.error('Both submission methods failed');
      return Promise.reject(new Error('Both submission methods failed'));
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const isLight = document.body.classList.contains('light');
    
    let typeClasses = '';
    if (type === 'success') {
      typeClasses = isLight ? 'border-green-600 text-green-800 bg-green-50' : 'border-green-400 text-green-200 bg-green-900/20';
    } else if (type === 'error') {
      typeClasses = isLight ? 'border-red-600 text-red-800 bg-red-50' : 'border-red-400 text-red-200 bg-red-900/20';
    } else {
      typeClasses = isLight ? 'border-purple-600 text-purple-800 bg-purple-50' : 'border-blue-400 text-white bg-blue-900/20';
    }
    
    notification.className = `fixed top-24 right-6 z-50 p-4 rounded-lg backdrop-blur-sm max-w-sm transform translate-x-full transition-transform duration-300 ${typeClasses}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AppMuse();
});

// Global utilities
window.AppMuseGlobal = {
  changeLanguage: (lang) => {
    console.log(`Switching to language: ${lang}`);
  },
  playAmbientSound: (soundId) => {
    console.log(`Playing ambient sound: ${soundId}`);
  },
  openScoringTool: () => {
    console.log('Opening music scoring tool');
  },
  getCurrentTheme: () => {
    return document.body.classList.contains('light') ? 'light' : 'dark';
  },
  setTheme: (theme) => {
    const body = document.body;
    const themeSwitch = document.getElementById('theme-switch');
    const sunIcon = themeSwitch?.querySelector('.sun-icon');
    const moonIcon = themeSwitch?.querySelector('.moon-icon');
    
    if (theme === 'light') {
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
      if (sunIcon && moonIcon) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    } else {
      body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      if (sunIcon && moonIcon) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }
  }
};