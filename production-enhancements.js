// 🚀 LeaveFlow - Production Enhancements
// Additional features for production-ready application

// 1. Enhanced Security Functions
function enhancedSecurity() {
    // Password strength validation
    function validatePasswordStrength(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        const score = [
            password.length >= minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChar
        ].filter(Boolean).length;
        
        return {
            isValid: score >= 4,
            score: score,
            feedback: getPasswordFeedback(score)
        };
    }
    
    function getPasswordFeedback(score) {
        switch(score) {
            case 5: return 'Very Strong';
            case 4: return 'Strong';
            case 3: return 'Medium';
            case 2: return 'Weak';
            default: return 'Very Weak';
        }
    }
    
    // Session timeout
    function initSessionTimeout() {
        let timeoutId;
        const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
        
        function resetTimeout() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                alert('Session expired. Please login again.');
                logout();
            }, TIMEOUT_DURATION);
        }
        
        // Reset on user activity
        document.addEventListener('click', resetTimeout);
        document.addEventListener('keypress', resetTimeout);
        resetTimeout();
    }
    
    return { validatePasswordStrength, initSessionTimeout };
}

// 2. Data Validation & Sanitization
function dataValidation() {
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Employee ID validation
    function validateEmployeeId(id) {
        const idRegex = /^[A-Z0-9]{3,10}$/;
        return idRegex.test(id);
    }
    
    // Phone number validation
    function validatePhone(phone) {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
        return phoneRegex.test(phone.replace(/\s|-/g, ''));
    }
    
    // Sanitize input
    function sanitizeInput(input) {
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                   .replace(/[<>]/g, '');
    }
    
    return { validateEmail, validateEmployeeId, validatePhone, sanitizeInput };
}

// 3. Performance Optimization
function performanceOptimization() {
    // Lazy loading for large datasets
    function lazyLoadEmployees(page = 1, limit = 20) {
        const employees = getEmployees();
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
            data: employees.slice(start, end),
            pagination: {
                page: page,
                limit: limit,
                total: employees.length,
                totalPages: Math.ceil(employees.length / limit)
            }
        };
    }
    
    // Debounce search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Cache management
    const cache = new Map();
    function getCachedData(key, fetchFunction, ttl = 5 * 60 * 1000) {
        const cached = cache.get(key);
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.data;
        }
        
        const data = fetchFunction();
        cache.set(key, { data, timestamp: Date.now() });
        return data;
    }
    
    return { lazyLoadEmployees, debounce, getCachedData };
}

// 4. Error Handling & Logging
function errorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
        logError('JavaScript Error', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack
        });
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        logError('Unhandled Promise Rejection', {
            reason: event.reason
        });
    });
    
    function logError(type, details) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            type: type,
            details: details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Store in localStorage for debugging
        const errors = JSON.parse(localStorage.getItem('leaveflow_errors') || '[]');
        errors.push(errorLog);
        
        // Keep only last 50 errors
        if (errors.length > 50) {
            errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('leaveflow_errors', JSON.stringify(errors));
        
        // In production, send to error tracking service
        console.error('LeaveFlow Error:', errorLog);
    }
    
    function getErrorLogs() {
        return JSON.parse(localStorage.getItem('leaveflow_errors') || '[]');
    }
    
    function clearErrorLogs() {
        localStorage.removeItem('leaveflow_errors');
    }
    
    return { logError, getErrorLogs, clearErrorLogs };
}

// 5. Backup & Export Functions
function backupExport() {
    // Export all data
    function exportAllData() {
        const data = {
            employees: getEmployees(),
            leaveRequests: getLeaveRequests(),
            regions: getRegions(),
            locations: getLocations(),
            positions: getPositions(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leaveflow-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Import data
    function importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validate data structure
                    if (!data.employees || !data.leaveRequests) {
                        throw new Error('Invalid backup file format');
                    }
                    
                    // Restore data
                    localStorage.setItem('leaveflow_employees', JSON.stringify(data.employees));
                    localStorage.setItem('leaveflow_leave_requests', JSON.stringify(data.leaveRequests));
                    localStorage.setItem('leaveflow_regions', JSON.stringify(data.regions));
                    localStorage.setItem('leaveflow_locations', JSON.stringify(data.locations));
                    localStorage.setItem('leaveflow_positions', JSON.stringify(data.positions));
                    
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
    
    return { exportAllData, importData };
}

// 6. Notification System
function notificationSystem() {
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease-out;
        `;
        
        // Type-specific colors
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Close button
        notification.querySelector('.notification-close').onclick = () => {
            notification.remove();
        };
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, duration);
        }
    }
    
    return { showNotification };
}

// 7. Initialize Production Features
function initProductionFeatures() {
    const security = enhancedSecurity();
    const validation = dataValidation();
    const performance = performanceOptimization();
    const errorHandler = errorHandling();
    const backup = backupExport();
    const notifications = notificationSystem();
    
    // Initialize session timeout
    if (getCurrentUser()) {
        security.initSessionTimeout();
    }
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Make functions globally available
    window.LeaveFlowPro = {
        security,
        validation,
        performance,
        errorHandler,
        backup,
        notifications
    };
    
    console.log('🚀 LeaveFlow Production Features Initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductionFeatures);
} else {
    initProductionFeatures();
}