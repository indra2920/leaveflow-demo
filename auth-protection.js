// Auth Protection Script
// This script provides authentication protection for all pages

// Global logout function
window.logout = function() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear all user session data
        localStorage.removeItem('leaveflow_current_user');
        localStorage.removeItem('leaveflow_session');
        sessionStorage.clear();
        
        // Show logout message
        alert('You have been logged out successfully.');
        
        // Redirect to login page
        window.location.href = 'auth-system.html';
    }
};

// Check authentication
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('leaveflow_current_user') || 'null');
    if (!currentUser) {
        alert('Please login first.');
        window.location.href = 'auth-system.html';
        return false;
    }
    return currentUser;
}

// Check role-based access
function checkRole(requiredRole) {
    const currentUser = checkAuth();
    if (!currentUser) return false;
    
    const userRole = currentUser.position_id;
    
    // Role hierarchy: 1=Staff, 2=Supervisor, 3=Manager, 4=Director, 5=Admin
    if (requiredRole === 'admin' && (userRole !== 5 && !currentUser.is_admin)) {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'auth-system.html';
        return false;
    }
    
    if (requiredRole === 'supervisor' && userRole < 2) {
        alert('Access denied. Supervisor privileges required.');
        window.location.href = 'auth-system.html';
        return false;
    }
    
    if (requiredRole === 'manager' && userRole < 3) {
        alert('Access denied. Manager privileges required.');
        window.location.href = 'auth-system.html';
        return false;
    }
    
    return currentUser;
}

// Update user display in navbar
function updateUserDisplay() {
    const currentUser = checkAuth();
    if (!currentUser) return;
    
    // Find user display elements
    const userDisplays = document.querySelectorAll('.navbar-text, .user-info');
    userDisplays.forEach(element => {
        if (element.innerHTML.includes('fas fa-user')) {
            element.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name} (${currentUser.position_name || 'Employee'})`;
        }
    });
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication for all pages except auth-system.html
    if (!window.location.pathname.includes('auth-system.html')) {
        checkAuth();
        updateUserDisplay();
    }
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        logout,
        checkAuth,
        checkRole,
        updateUserDisplay
    };
}