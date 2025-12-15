// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}// Rebamotaki Consultants Website - Main JavaScript

// ===== MOBILE NAVIGATION =====// Rebamotaki Consultants Website - Complete JavaScript File

// ===== MOBILE NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideDrawer = document.getElementById('sideDrawer');
    const closeDrawer = document.getElementById('closeDrawer');
    
    // ===== OPEN SIDE DRAWER =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sideDrawer.style.left === '0px') {
                sideDrawer.style.left = '-300px';
                document.body.style.overflow = 'auto';
            } else {
                sideDrawer.style.left = '0';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // ===== CLOSE SIDE DRAWER =====
    if (closeDrawer) {
        closeDrawer.addEventListener('click', function() {
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close drawer when clicking on links
    const drawerLinks = document.querySelectorAll('.side-drawer a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close drawer when clicking outside
    document.addEventListener('click', function(e) {
        if (sideDrawer.style.left === '0px' && 
            !sideDrawer.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close drawer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sideDrawer.style.left === '0px') {
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== FORM VALIDATION =====
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
    
    // Enquiry Form Validation
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateEnquiryForm()) {
                const successMessage = document.getElementById('enquirySuccess');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    enquiryForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
    
    // Quick Estimate Form
    const quickEstimateBtn = document.getElementById('quickEstimateBtn');
    if (quickEstimateBtn) {
        quickEstimateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calculateQuickEstimate();
        });
    }
    
    // ===== HIGHLIGHT ACTIVE NAV LINK =====
    highlightActiveNavLink();
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for same-page anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== INITIALIZE ALL FORMS =====
    initializeAllForms();
});

// ===== FORM VALIDATION FUNCTIONS =====
function validateContactForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Name validation
    const name = document.getElementById('name');
    if (name && name.value.trim().length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (message && message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}

function validateEnquiryForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Company Name validation
    const companyName = document.getElementById('companyName');
    if (companyName && companyName.value.trim().length < 2) {
        document.getElementById('companyNameError').textContent = 'Company name is required';
        isValid = false;
    }
    
    // Contact Name validation
    const contactName = document.getElementById('contactName');
    if (contactName && contactName.value.trim().length < 2) {
        document.getElementById('contactNameError').textContent = 'Full name is required';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('contactEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('contactPhone');
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (phone && !phoneRegex.test(phone.value.trim())) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Services validation
    const services = document.querySelectorAll('input[name="services"]:checked');
    if (services.length === 0) {
        document.getElementById('servicesError').textContent = 'Please select at least one service';
        isValid = false;
    }
    
    // Privacy policy validation
    const privacyPolicy = document.getElementById('privacyPolicy');
    if (privacyPolicy && !privacyPolicy.checked) {
        document.getElementById('privacyError').textContent = 'You must agree to the privacy policy';
        isValid = false;
    }
    
    return isValid;
}

// ===== QUICK ESTIMATE CALCULATOR =====
function calculateQuickEstimate() {
    const serviceSelect = document.getElementById('estimateService');
    const employeesInput = document.getElementById('companyEmployees');
    const turnoverSelect = document.getElementById('companyTurnover');
    const timelineSelect = document.getElementById('timelinePreference');
    
    if (!serviceSelect || !employeesInput || !turnoverSelect || !timelineSelect) {
        alert('Form elements not found');
        return;
    }
    
    const service = serviceSelect.value;
    const employees = parseInt(employeesInput.value) || 0;
    const turnover = turnoverSelect.value;
    const timeline = timelineSelect.value;
    
    // Validate inputs
    if (!service) {
        alert('Please select a service');
        serviceSelect.focus();
        return;
    }
    
    if (employees <= 0 || isNaN(employees)) {
        alert('Please enter a valid number of employees');
        employeesInput.focus();
        return;
    }
    
    if (!turnover) {
        alert('Please select your annual turnover range');
        turnoverSelect.focus();
        return;
    }
    
    if (!timeline) {
        alert('Please select your preferred timeline');
        timelineSelect.focus();
        return;
    }
    
    // Base prices
    const basePrices = {
        'iso-9001': 25000,
        'iso-14001': 28000,
        'iso-45001': 30000,
        'iso-27001': 32000,
        'bbbee-full': 15000,
        'bbbee-improvement': 20000,
        'skills-wsp': 12000,
        'skills-grants': 10000,
        'combo': 50000
    };
    
    // Multipliers
    let employeeMultiplier = 1;
    if (employees <= 10) employeeMultiplier = 0.8;
    else if (employees <= 50) employeeMultiplier = 1.0;
    else if (employees <= 200) employeeMultiplier = 1.3;
    else employeeMultiplier = 1.6;
    
    const turnoverMultipliers = {
        'micro': 0.7,
        'small': 1.0,
        'medium': 1.2,
        'large': 1.5,
        'enterprise': 2.0
    };
    
    const timelineMultipliers = {
        'urgent': 1.4,
        'standard': 1.0,
        'extended': 0.9
    };
    
    const serviceNames = {
        'iso-9001': 'ISO 9001 Certification',
        'iso-14001': 'ISO 14001 Certification',
        'iso-45001': 'ISO 45001 Certification',
        'iso-27001': 'ISO 27001 Certification',
        'bbbee-full': 'B-BBEE Full Assessment',
        'bbbee-improvement': 'B-BBEE Score Improvement',
        'skills-wsp': 'Skills Development (WSP/ATR)',
        'skills-grants': 'Grant Management',
        'combo': 'Multiple Services Package'
    };
    
    const basePrice = basePrices[service] || 20000;
    let totalPrice = basePrice * employeeMultiplier * turnoverMultipliers[turnover] * timelineMultipliers[timeline];
    totalPrice = totalPrice * 1.15; // Add 15% VAT
    
    // Display result
    const resultDiv = document.getElementById('estimateResult');
    const detailsDiv = document.getElementById('estimateDetails');
    
    if (resultDiv && detailsDiv) {
        detailsDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="padding: 12px; background: white; border-radius: 5px; border-left: 3px solid #d4af37;">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 5px;">Service</div>
                    <div style="font-weight: bold; color: #1a365d;">${serviceNames[service]}</div>
                </div>
                <div style="padding: 12px; background: white; border-radius: 5px; border-left: 3px solid #d4af37;">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 5px;">Company Size</div>
                    <div style="font-weight: bold; color: #1a365d;">${employees} employees</div>
                </div>
                <div style="padding: 12px; background: white; border-radius: 5px; border-left: 3px solid #d4af37;">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 5px;">Timeline</div>
                    <div style="font-weight: bold; color: #1a365d;">${timeline.charAt(0).toUpperCase() + timeline.slice(1)}</div>
                </div>
            </div>
            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; border: 2px dashed #d4af37;">
                <div style="font-size: 0.9rem; color: #6c757d; margin-bottom: 10px;">Estimated Cost</div>
                <div style="font-size: 2rem; font-weight: bold; color: #d4af37;">R${totalPrice.toFixed(2)}</div>
                <div style="font-size: 0.85rem; color: #6c757d; margin-top: 5px;">incl. 15% VAT</div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #1a365d;">
                <p style="margin: 0; font-style: italic; color: #1a365d; font-size: 0.9rem;">
                    <i class="fas fa-info-circle" style="color: #d4af37; margin-right: 10px;"></i>
                    This is a preliminary estimate. For a detailed proposal with exact pricing, please complete the full enquiry form.
                </p>
            </div>
        `;
        
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== HIGHLIGHT ACTIVE NAV LINK =====
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerLinks = document.querySelectorAll('.side-drawer a');
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    drawerLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    drawerLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== INITIALIZE ALL FORMS =====
function initializeAllForms() {
    // Add real-time validation to form inputs
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// ===== SINGLE FIELD VALIDATION =====
function validateSingleField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (!errorElement) return;
    
    // Clear previous error
    errorElement.textContent = '';
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        errorElement.textContent = 'This field is required';
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorElement.textContent = 'Please enter a valid email address';
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorElement.textContent = 'Please enter a valid phone number';
            return false;
        }
    }
    
    if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
        errorElement.textContent = `Minimum ${field.getAttribute('minlength')} characters required`;
        return false;
    }
    
    return true;
}

// ===== CLEAR FIELD ERROR =====
function clearFieldError(field) {
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// ===== SERVICE CALCULATOR (for index.html) =====
function calculateServiceQuote() {
    const service = document.getElementById('calcService')?.value;
    const employees = parseInt(document.getElementById('employees')?.value) || 0;
    const timeline = document.getElementById('timeline')?.value;
    
    if (!service || employees <= 0 || !timeline) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    // Base prices for different services
    const basePrices = {
        'iso-9001': 15000,
        'iso-14001': 18000,
        'iso-45001': 20000,
        'iso-27001': 22000,
        'bbbee-assessment': 8000,
        'skills-development': 12000,
        'full-compliance': 35000
    };
    
    // Employee multiplier
    const employeeMultiplier = Math.max(1, employees / 10);
    
    // Timeline multiplier
    const timelineMultipliers = {
        'urgent': 1.5,
        'normal': 1.0,
        'flexible': 0.8
    };
    
    const basePrice = basePrices[service] || 15000;
    let totalPrice = basePrice * employeeMultiplier * timelineMultipliers[timeline];
    
    // Add VAT (15%)
    totalPrice = totalPrice * 1.15;
    
    // Service names for display
    const serviceSelect = document.getElementById('calcService');
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    
    // Display result
    const resultDiv = document.getElementById('quoteResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3 style="color: #1a365d; margin-bottom: 15px;">Estimated Quote</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #d4af37;">
                <p style="margin-bottom: 10px;"><strong>Service:</strong> ${serviceName}</p>
                <p style="margin-bottom: 10px;"><strong>Company Size:</strong> ${employees} employees</p>
                <p style="margin-bottom: 10px;"><strong>Timeline:</strong> ${timeline.charAt(0).toUpperCase() + timeline.slice(1)}</p>
                <p style="margin-bottom: 15px; font-size: 1.2rem;"><strong>Estimated Cost:</strong> <span style="color: #d4af37; font-weight: bold;">R${totalPrice.toFixed(2)}</span> (incl. VAT)</p>
                <p class="disclaimer" style="font-size: 0.9rem; color: #6c757d; font-style: italic; margin: 0;">
                    This is an estimate. Contact us for a detailed proposal.
                </p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== INITIALIZE SERVICE CALCULATOR ON INDEX PAGE =====
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function() {
        const serviceCalculator = document.getElementById('serviceCalculator');
        if (serviceCalculator) {
            serviceCalculator.addEventListener('submit', function(e) {
                e.preventDefault();
                calculateServiceQuote();
            });
        }
    });
}

// ===== ENHANCED FORM SUBMISSION (Simulate AJAX) =====
function simulateFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate server delay
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        const successId = formId === 'contactForm' ? 'successMessage' : 'enquirySuccess';
        const successMessage = document.getElementById(successId);
        
        if (successMessage) {
            successMessage.style.display = 'block';
            form.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }, 1500);
}// Rebamotaki Consultants Website - COMPLETE FIXED JAVASCRIPT

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION - COMPLETE FIX =====
    const menuToggle = document.getElementById('menuToggle');
    const sideDrawer = document.getElementById('sideDrawer');
    const closeDrawer = document.getElementById('closeDrawer');
    
    console.log('Menu Toggle:', menuToggle); // Debug
    console.log('Side Drawer:', sideDrawer); // Debug
    console.log('Close Drawer:', closeDrawer); // Debug
    
    // Open side drawer
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Menu button clicked');
            sideDrawer.style.left = '0';
            document.body.style.overflow = 'hidden';
        });
    } else {
        console.error('Menu toggle button not found!');
    }
    
    // Close side drawer
    if (closeDrawer) {
        closeDrawer.addEventListener('click', function() {
            console.log('Close button clicked');
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close drawer when clicking on drawer links
    const drawerLinks = document.querySelectorAll('.drawer-menu a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close drawer when clicking outside
    document.addEventListener('click', function(e) {
        if (sideDrawer && sideDrawer.style.left === '0px') {
            if (!sideDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
                sideDrawer.style.left = '-300px';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Close drawer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sideDrawer && sideDrawer.style.left === '0px') {
            sideDrawer.style.left = '-300px';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    highlightActiveNavLink();
    
    // ===== FORM VALIDATION =====
    setupFormValidation();
    
    // ===== QUICK ESTIMATE FORM =====
    setupQuickEstimate();
    
    // ===== SMOOTH SCROLL =====
    setupSmoothScroll();
});

// ===== FORM VALIDATION FUNCTIONS =====
function setupFormValidation() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                showSuccessMessage('successMessage');
                contactForm.reset();
            }
        });
    }
    
    // Enquiry Form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateEnquiryForm()) {
                showSuccessMessage('enquirySuccess');
                enquiryForm.reset();
            }
        });
    }
}

function validateContactForm() {
    let isValid = true;
    clearErrors();
    
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    
    if (name && name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (email && !isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (message && message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateEnquiryForm() {
    let isValid = true;
    clearErrors();
    
    const companyName = document.getElementById('companyName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const privacyPolicy = document.getElementById('privacyPolicy');
    
    if (companyName && companyName.length < 2) {
        showError('companyNameError', 'Company name is required');
        isValid = false;
    }
    
    if (email && !isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (phone && !isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (privacyPolicy && !privacyPolicy.checked) {
        showError('privacyError', 'You must agree to the privacy policy');
        isValid = false;
    }
    
    return isValid;
}

// ===== QUICK ESTIMATE FUNCTIONS =====
function setupQuickEstimate() {
    const estimateBtn = document.querySelector('button[onclick="calculateQuickEstimate()"]');
    if (estimateBtn) {
        estimateBtn.addEventListener('click', calculateQuickEstimate);
    }
}

function calculateQuickEstimate() {
    const service = document.getElementById('estimateService')?.value;
    const employees = parseInt(document.getElementById('companyEmployees')?.value) || 0;
    const turnover = document.getElementById('companyTurnover')?.value;
    const timeline = document.getElementById('timelinePreference')?.value;
    
    if (!service || employees <= 0 || !turnover || !timeline) {
        alert('Please fill in all fields in the quick estimate form.');
        return;
    }
    
    // Calculate price
    const basePrices = {
        'iso-9001': 25000, 'iso-14001': 28000, 'iso-45001': 30000,
        'iso-27001': 32000, 'bbbee-full': 15000, 'bbbee-improvement': 20000,
        'skills-wsp': 12000, 'skills-grants': 10000, 'combo': 50000
    };
    
    const serviceNames = {
        'iso-9001': 'ISO 9001 Certification', 'iso-14001': 'ISO 14001 Certification',
        'iso-45001': 'ISO 45001 Certification', 'iso-27001': 'ISO 27001 Certification',
        'bbbee-full': 'B-BBEE Full Assessment', 'bbbee-improvement': 'B-BBEE Score Improvement',
        'skills-wsp': 'Skills Development (WSP/ATR)', 'skills-grants': 'Grant Management',
        'combo': 'Multiple Services Package'
    };
    
    let employeeMultiplier = 1;
    if (employees <= 10) employeeMultiplier = 0.8;
    else if (employees <= 50) employeeMultiplier = 1.0;
    else if (employees <= 200) employeeMultiplier = 1.3;
    else employeeMultiplier = 1.6;
    
    const turnoverMultipliers = {
        'micro': 0.7, 'small': 1.0, 'medium': 1.2, 'large': 1.5, 'enterprise': 2.0
    };
    
    const timelineMultipliers = {
        'urgent': 1.4, 'standard': 1.0, 'extended': 0.9
    };
    
    const basePrice = basePrices[service] || 20000;
    let totalPrice = basePrice * employeeMultiplier * turnoverMultipliers[turnover] * timelineMultipliers[timeline];
    totalPrice = totalPrice * 1.15; // Add VAT
    
    // Display result
    const resultDiv = document.getElementById('estimateResult');
    const detailsDiv = document.getElementById('estimateDetails');
    
    if (resultDiv && detailsDiv) {
        detailsDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="padding: 12px; background: white; border-radius: 5px; border-left: 3px solid var(--secondary-color);">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 5px;">Service</div>
                    <div style="font-weight: bold; color: #1a365d;">${serviceNames[service]}</div>
                </div>
                <div style="padding: 12px; background: white; border-radius: 5px; border-left: 3px solid var(--secondary-color);">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 5px;">Company Size</div>
                    <div style="font-weight: bold; color: #1a365d;">${employees} employees</div>
                </div>
                <div style="padding: 12px; background: white; border-radius: 5px; border-left: 3px solid var(--secondary-color);">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 5px;">Timeline</div>
                    <div style="font-weight: bold; color: #1a365d;">${timeline.charAt(0).toUpperCase() + timeline.slice(1)}</div>
                </div>
            </div>
            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; border: 2px dashed #d4af37;">
                <div style="font-size: 0.9rem; color: #6c757d; margin-bottom: 10px;">Estimated Cost</div>
                <div style="font-size: 2rem; font-weight: bold; color: #d4af37;">R${totalPrice.toFixed(2)}</div>
                <div style="font-size: 0.85rem; color: #6c757d; margin-top: 5px;">incl. 15% VAT</div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== HELPER FUNCTIONS =====
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight desktop nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Highlight mobile nav
    const drawerLinks = document.querySelectorAll('.drawer-menu a');
    drawerLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    return phoneRegex.test(phone);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

function showSuccessMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Make calculateQuickEstimate available globally
window.calculateQuickEstimate = calculateQuickEstimate;

// ===== ADD LOADING STATE TO ALL FORMS =====
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.classList.contains('prevent-loading')) {
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    simulateFormSubmission(this.id);
                    e.preventDefault();
                }
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideDrawer = document.getElementById('sideDrawer');
    const closeDrawer = document.getElementById('closeDrawer');
    
    // Toggle side drawer
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sideDrawer.style.left = '0';
        });
    }
    
    // Close side drawer
    if (closeDrawer) {
        closeDrawer.addEventListener('click', function() {
            sideDrawer.style.left = '-300px';
        });
    }
    
    // Close drawer when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#sideDrawer') && !e.target.closest('#menuToggle')) {
            sideDrawer.style.left = '-300px';
        }
    });
    
    // Close drawer when clicking links
    const drawerLinks = document.querySelectorAll('.side-drawer a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideDrawer.style.left = '-300px';
        });
    });
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Simulate form submission
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // ===== ENQUIRY FORM =====
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateEnquiryForm()) {
                const successMessage = document.getElementById('enquirySuccess');
                successMessage.style.display = 'block';
                enquiryForm.reset();
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // ===== SERVICE CALCULATOR =====
    const serviceCalculator = document.getElementById('serviceCalculator');
    if (serviceCalculator) {
        serviceCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateServiceQuote();
        });
    }
});

// ===== FORM VALIDATION FUNCTIONS =====
function validateContactForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Company validation
    const company = document.getElementById('company').value.trim();
    if (company.length < 2) {
        document.getElementById('companyError').textContent = 'Company name is required';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}

function validateEnquiryForm() {
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Service type validation
    const serviceType = document.getElementById('serviceType').value;
    if (!serviceType) {
        document.getElementById('serviceError').textContent = 'Please select a service';
        isValid = false;
    }
    
    // Industry validation
    const industry = document.getElementById('industry').value;
    if (!industry) {
        document.getElementById('industryError').textContent = 'Please select your industry';
        isValid = false;
    }
    
    // Company size validation
    const companySize = document.getElementById('companySize').value;
    if (!companySize) {
        document.getElementById('sizeError').textContent = 'Please select company size';
        isValid = false;
    }
    
    return isValid;
}

// ===== SERVICE QUOTE CALCULATOR =====
function calculateServiceQuote() {
    const service = document.getElementById('calcService').value;
    const employees = parseInt(document.getElementById('employees').value) || 0;
    const timeline = document.getElementById('timeline').value;
    
    if (!service || employees <= 0 || !timeline) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    // Base prices for different services
    const basePrices = {
        'iso-9001': 15000,
        'iso-14001': 18000,
        'iso-45001': 20000,
        'iso-27001': 22000,
        'bbbee-assessment': 8000,
        'skills-development': 12000,
        'full-compliance': 35000
    };
    
    // Employee multiplier
    const employeeMultiplier = Math.max(1, employees / 10);
    
    // Timeline multiplier
    const timelineMultipliers = {
        'urgent': 1.5,
        'normal': 1.0,
        'flexible': 0.8
    };
    
    const basePrice = basePrices[service] || 15000;
    let totalPrice = basePrice * employeeMultiplier * timelineMultipliers[timeline];
    
    // Add VAT (15%)
    totalPrice = totalPrice * 1.15;
    
    // Display result
    const resultDiv = document.getElementById('quoteResult');
    resultDiv.innerHTML = `
        <h3>Estimated Quote</h3>
        <div class="quote-details">
            <p><strong>Service:</strong> ${document.getElementById('calcService').options[document.getElementById('calcService').selectedIndex].text}</p>
            <p><strong>Company Size:</strong> ${employees} employees</p>
            <p><strong>Timeline:</strong> ${timeline.charAt(0).toUpperCase() + timeline.slice(1)}</p>
            <p><strong>Estimated Cost:</strong> R${totalPrice.toFixed(2)} (incl. VAT)</p>
            <p class="disclaimer"><em>This is an estimate. Contact us for a detailed proposal.</em></p>
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements you want to animate
    document.querySelectorAll('.service-card, .value-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real implementation, you would send this to a server
        // For now, we'll simulate a successful submission
        alert('Thank you for your message! We will contact you within 24 hours.');
        this.reset();
        
        // You would typically use fetch() to send to a backend:
        /*
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
        */
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-menu a[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-menu a[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
});// Rebamotaki Consultants Website - Main JavaScript

// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideDrawer = document.getElementById('sideDrawer');
    const closeDrawer = document.getElementById('closeDrawer');
    
    // Toggle side drawer
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sideDrawer.style.left = '0';
        });
    }
    
    // Close side drawer
    if (closeDrawer) {
        closeDrawer.addEventListener('click', function() {
            sideDrawer.style.left = '-300px';
        });
    }
    
    // Close drawer when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#sideDrawer') && !e.target.closest('#menuToggle')) {
            sideDrawer.style.left = '-300px';
        }
    });
    
    // Close drawer when clicking links
    const drawerLinks = document.querySelectorAll('.side-drawer a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideDrawer.style.left = '-300px';
        });
    });
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Simulate form submission
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // ===== ENQUIRY FORM =====
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateEnquiryForm()) {
                const successMessage = document.getElementById('enquirySuccess');
                successMessage.style.display = 'block';
                enquiryForm.reset();
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // ===== SERVICE CALCULATOR =====
    const serviceCalculator = document.getElementById('serviceCalculator');
    if (serviceCalculator) {
        serviceCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateServiceQuote();
        });
    }
});

// ===== FORM VALIDATION FUNCTIONS =====
function validateContactForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Company validation
    const company = document.getElementById('company').value.trim();
    if (company.length < 2) {
        document.getElementById('companyError').textContent = 'Company name is required';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}

function validateEnquiryForm() {
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Service type validation
    const serviceType = document.getElementById('serviceType').value;
    if (!serviceType) {
        document.getElementById('serviceError').textContent = 'Please select a service';
        isValid = false;
    }
    
    // Industry validation
    const industry = document.getElementById('industry').value;
    if (!industry) {
        document.getElementById('industryError').textContent = 'Please select your industry';
        isValid = false;
    }
    
    // Company size validation
    const companySize = document.getElementById('companySize').value;
    if (!companySize) {
        document.getElementById('sizeError').textContent = 'Please select company size';
        isValid = false;
    }
    
    return isValid;
}

// ===== SERVICE QUOTE CALCULATOR =====
function calculateServiceQuote() {
    const service = document.getElementById('calcService').value;
    const employees = parseInt(document.getElementById('employees').value) || 0;
    const timeline = document.getElementById('timeline').value;
    
    if (!service || employees <= 0 || !timeline) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    // Base prices for different services
    const basePrices = {
        'iso-9001': 15000,
        'iso-14001': 18000,
        'iso-45001': 20000,
        'iso-27001': 22000,
        'bbbee-assessment': 8000,
        'skills-development': 12000,
        'full-compliance': 35000
    };
    
    // Employee multiplier
    const employeeMultiplier = Math.max(1, employees / 10);
    
    // Timeline multiplier
    const timelineMultipliers = {
        'urgent': 1.5,
        'normal': 1.0,
        'flexible': 0.8
    };
    
    const basePrice = basePrices[service] || 15000;
    let totalPrice = basePrice * employeeMultiplier * timelineMultipliers[timeline];
    
    // Add VAT (15%)
    totalPrice = totalPrice * 1.15;
    
    // Display result
    const resultDiv = document.getElementById('quoteResult');
    resultDiv.innerHTML = `
        <h3>Estimated Quote</h3>
        <div class="quote-details">
            <p><strong>Service:</strong> ${document.getElementById('calcService').options[document.getElementById('calcService').selectedIndex].text}</p>
            <p><strong>Company Size:</strong> ${employees} employees</p>
            <p><strong>Timeline:</strong> ${timeline.charAt(0).toUpperCase() + timeline.slice(1)}</p>
            <p><strong>Estimated Cost:</strong> R${totalPrice.toFixed(2)} (incl. VAT)</p>
            <p class="disclaimer"><em>This is an estimate. Contact us for a detailed proposal.</em></p>
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements you want to animate
    document.querySelectorAll('.service-card, .value-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('RebaMotaki Consultants website loaded successfully.');
    
    // Add current year to copyright
    const copyrightElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(el => {
        if (el.textContent.includes('2023')) {
            el.textContent = el.textContent.replace('2023', currentYear);
        }
    });
});