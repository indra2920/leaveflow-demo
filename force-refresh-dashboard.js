// Force Refresh Dashboard Script
// This script will force refresh the admin dashboard and clear all cache

console.log('🔄 Force Refresh Dashboard Script');

// Function to clear all browser cache and storage
function forceClearCache() {
    console.log('🧹 Clearing all cache and storage...');
    
    // Clear localStorage
    const allKeys = Object.keys(localStorage);
    let clearedCount = 0;
    
    allKeys.forEach(key => {
        if (key.startsWith('leaveflow_') || key.startsWith('masterdata_') || key.startsWith('demo')) {
            localStorage.removeItem(key);
            clearedCount++;
            console.log(`✓ Cleared localStorage: ${key}`);
        }
    });
    
    // Clear sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
        if (key.startsWith('leaveflow_') || key.startsWith('masterdata_') || key.startsWith('demo')) {
            sessionStorage.removeItem(key);
            console.log(`✓ Cleared sessionStorage: ${key}`);
        }
    });
    
    // Clear browser cache if supported
    if ('caches' in window) {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                if (cacheName.includes('leaveflow') || cacheName.includes('admin')) {
                    caches.delete(cacheName);
                    console.log(`✓ Cleared cache: ${cacheName}`);
                }
            });
        });
    }
    
    console.log(`✅ Cleared ${clearedCount} localStorage items`);
    return clearedCount;
}

// Function to force reload dashboard data
function forceReloadDashboard() {
    console.log('🔄 Force reloading dashboard data...');
    
    // Clear any cached data
    forceClearCache();
    
    // Reset all counters to 0
    const counters = [
        'totalEmployees',
        'totalRequests', 
        'pendingRequests',
        'approvedRequests',
        'rejectedRequests',
        'totalLocations'
    ];
    
    counters.forEach(counterId => {
        const element = document.getElementById(counterId);
        if (element) {
            element.textContent = '0';
            console.log(`✓ Reset counter: ${counterId}`);
        }
    });
    
    // Clear all dynamic content areas
    const contentAreas = [
        'systemStatus',
        'employeesTable',
        'requestsTable',
        'locationsData',
        'positionsData'
    ];
    
    contentAreas.forEach(areaId => {
        const element = document.getElementById(areaId);
        if (element) {
            element.innerHTML = `
                <div class="text-center p-4">
                    <i class="fas fa-spinner fa-spin fa-2x text-muted mb-3"></i>
                    <p class="text-muted">Loading fresh data...</p>
                </div>
            `;
            console.log(`✓ Cleared content area: ${areaId}`);
        }
    });
    
    // Show data status alert
    const alertElement = document.getElementById('dataStatusAlert');
    if (alertElement) {
        alertElement.style.display = 'block';
        console.log('✓ Showed cleanup alert');
    }
    
    console.log('✅ Dashboard force reload complete!');
}

// Function to setup clean state
function setupCleanState() {
    console.log('🆕 Setting up clean state...');
    
    // Remove all LeaveFlow data
    forceClearCache();
    
    // Set clean state flag
    localStorage.setItem('leaveflow_clean_state', 'true');
    localStorage.setItem('leaveflow_cleanup_date', new Date().toISOString());
    
    // Create minimal structure for fresh start
    const cleanStructure = {
        employees: [],
        leave_requests: [],
        regions: [],
        locations: [],
        positions: [
            {id: 1, name: 'Staff', level: 1},
            {id: 2, name: 'Supervisor', level: 2},
            {id: 3, name: 'Manager', level: 3},
            {id: 4, name: 'Director', level: 4},
            {id: 5, name: 'Administrator', level: 5}
        ]
    };
    
    // Save clean structure
    Object.keys(cleanStructure).forEach(key => {
        localStorage.setItem(`leaveflow_${key}`, JSON.stringify(cleanStructure[key]));
        console.log(`✓ Created clean structure: ${key}`);
    });
    
    console.log('✅ Clean state setup complete!');
}

// Function to refresh page with clean state
function refreshWithCleanState() {
    console.log('🔄 Refreshing page with clean state...');
    
    setupCleanState();
    
    // Add cleanup parameter to URL
    const url = new URL(window.location);
    url.searchParams.set('cleanup', 'true');
    url.searchParams.set('timestamp', Date.now());
    
    // Force reload with new URL
    window.location.href = url.toString();
}

// Function to detect if cleanup was performed
function detectCleanupState() {
    const urlParams = new URLSearchParams(window.location.search);
    const isCleanup = urlParams.get('cleanup') === 'true';
    const hasCleanFlag = localStorage.getItem('leaveflow_clean_state') === 'true';
    
    if (isCleanup || hasCleanFlag) {
        console.log('🧹 Cleanup state detected');
        
        // Show cleanup notification
        showCleanupNotification();
        
        // Clean URL
        if (isCleanup) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
        
        return true;
    }
    
    return false;
}

// Function to show cleanup notification
function showCleanupNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'cleanupNotification';
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-check-circle fa-2x text-success me-3"></i>
            <div>
                <h6 class="mb-1">Data Berhasil Dibersihkan!</h6>
                <small>Dashboard telah di-refresh dengan data bersih.</small>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    console.log('✅ Cleanup notification shown');
}

// Auto-execute functions
if (typeof window !== 'undefined') {
    // Make functions globally available
    window.forceClearCache = forceClearCache;
    window.forceReloadDashboard = forceReloadDashboard;
    window.setupCleanState = setupCleanState;
    window.refreshWithCleanState = refreshWithCleanState;
    window.detectCleanupState = detectCleanupState;
    
    // Auto-detect cleanup state on page load
    document.addEventListener('DOMContentLoaded', function() {
        detectCleanupState();
    });
    
    console.log('✅ Force Refresh Dashboard Script loaded');
    console.log('💡 Available functions:');
    console.log('- forceClearCache()');
    console.log('- forceReloadDashboard()');
    console.log('- setupCleanState()');
    console.log('- refreshWithCleanState()');
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        forceClearCache,
        forceReloadDashboard,
        setupCleanState,
        refreshWithCleanState,
        detectCleanupState
    };
}