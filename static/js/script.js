// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight effect to the target element
                if (targetElement.classList.contains('contact-form')) {
                    targetElement.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
                    targetElement.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3)';
                    
                    // Remove highlight after 3 seconds
                    setTimeout(() => {
                        targetElement.style.background = '';
                        targetElement.style.boxShadow = '';
                    }, 3000);
                }
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
    
    // Modal functions
    window.openContactModal = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };
    
    window.closeContactModal = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    };
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeContactModal();
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeContactModal();
        }
    });

    // Form submission handling for all forms
    const forms = [
        { id: '#contactForm', requiredFields: ['name', 'company', 'email', 'subject', 'message'] },
        { id: '#quickContactForm', requiredFields: ['name', 'email', 'reason'] },
        { id: '#serviceContactForm', requiredFields: ['name', 'email', 'reason'] },
        { id: '#trackRecordContactForm', requiredFields: ['name', 'email', 'reason'] },
        { id: '#mediaContactForm', requiredFields: ['name', 'email', 'reason'] },
        { id: '#modalContactForm', requiredFields: ['name', 'email', 'subject', 'message'] }
    ];
    
    forms.forEach(formConfig => {
        const form = document.querySelector(formConfig.id);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitButton = this.querySelector('button[type="submit"]');
                const buttonText = submitButton.querySelector('.button-text');
                const buttonLoader = submitButton.querySelector('.button-loader');
                const formMessage = this.querySelector('.form-message');
                
                // Show loading state
                submitButton.classList.add('loading');
                buttonText.style.display = 'none';
                buttonLoader.style.display = 'flex';
                
                // Get form data
                const formData = new FormData(this);
                
                // Simple validation
                let isValid = true;
                
                formConfig.requiredFields.forEach(field => {
                    const input = this.querySelector(`[name="${field}"]`);
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#ff6b6b';
                    } else {
                        input.style.borderColor = '#333333';
                    }
                });
                
                if (!isValid) {
                    // Reset button state
                    submitButton.classList.remove('loading');
                    buttonText.style.display = 'block';
                    buttonLoader.style.display = 'none';
                    
                    formMessage.innerHTML = 'Please fill in all required fields.';
                    formMessage.className = 'form-message error';
                    return;
                }
                
                // Send form data to server
                fetch('/send_email', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Reset button state
                    submitButton.classList.remove('loading');
                    buttonText.style.display = 'block';
                    buttonLoader.style.display = 'none';
                    
                    if (data.success) {
                        formMessage.innerHTML = data.message;
                        formMessage.className = 'form-message success';
                        this.reset();
                        
                        // Close modal after successful submission
                        if (this.id === 'modalContactForm') {
                            setTimeout(() => {
                                closeContactModal();
                            }, 2000);
                        }
                    } else {
                        formMessage.innerHTML = data.message;
                        formMessage.className = 'form-message error';
                    }
                })
                .catch(error => {
                    // Reset button state
                    submitButton.classList.remove('loading');
                    buttonText.style.display = 'block';
                    buttonLoader.style.display = 'none';
                    
                    formMessage.innerHTML = 'Sorry, there was an error sending your message. Please try again.';
                    formMessage.className = 'form-message error';
                    console.error('Error:', error);
                });
            });
        }
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .transaction-item, .press-item, .office-card, .edge-item, .recognition-item, .award-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add loading animation for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .submit-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) {
                e.preventDefault();
                return;
            }
            
            this.classList.add('loading');
            this.style.position = 'relative';
            
            // Create loading spinner
            const spinner = document.createElement('div');
            spinner.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                border: 2px solid transparent;
                border-top: 2px solid #000000;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            `;
            
            this.appendChild(spinner);
            this.style.color = 'transparent';
            
            // Add CSS for spinner animation
            if (!document.querySelector('#spinner-styles')) {
                const style = document.createElement('style');
                style.id = 'spinner-styles';
                style.textContent = `
                    @keyframes spin {
                        0% { transform: translate(-50%, -50%) rotate(0deg); }
                        100% { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.color = '';
                if (spinner.parentNode) {
                    spinner.parentNode.removeChild(spinner);
                }
            }, 2000);
        });
    });
});
