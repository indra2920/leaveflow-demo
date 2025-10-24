// Clear Dummy Data Script
// This script will clear all dummy data from localStorage and prepare for real data

console.log('🧹 Clearing all dummy data...');

// List of localStorage keys used by the application
const storageKeys = [
    // Master Data
    'masterdata_regions',
    'masterdata_locations', 
    'masterdata_positions',
    'masterdata_employees',
    
    // Demo Data
    'demoEmployees',
    'demo_analytics',
    'leaveflow_visits',
    
    // System Settings
    'systemSettings',
    'leaveflow_session',
    'authToken',
    
    // Activity Logs
    'pending_changes',
    'activity_logs',
    
    // Initialization flags
    'leaveflow_initialized',
    'initialized'
];

// Function to clear all dummy data
function clearAllDummyData() {
    let clearedCount = 0;
    
    storageKeys.forEach(key => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            clearedCount++;
            console.log(`✅ Cleared: ${key}`);
        }
    });
    
    // Clear any keys that start with 'leaveflow_'
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('leaveflow_') && !storageKeys.includes(key)) {
            localStorage.removeItem(key);
            clearedCount++;
            console.log(`✅ Cleared additional: ${key}`);
        }
    });
    
    console.log(`\n🎯 Total items cleared: ${clearedCount}`);
    console.log('✨ All dummy data has been removed!');
    console.log('\n📋 Next steps:');
    console.log('1. Refresh the page');
    console.log('2. Start adding your real data');
    console.log('3. Create your first admin user');
    
    return clearedCount;
}

// Function to setup fresh installation
function setupFreshInstallation() {
    console.log('\n🚀 Setting up fresh installation...');
    
    // Set fresh installation flag
    localStorage.setItem('leaveflow_fresh_install', 'true');
    localStorage.setItem('leaveflow_setup_date', new Date().toISOString());
    
    console.log('✅ Fresh installation setup complete!');
}

// Function to create initial admin user (real data)
function createInitialAdmin() {
    const adminData = {
        id: 1,
        employee_id: 'ADMIN001',
        name: 'System Administrator',
        email: 'admin@yourcompany.com', // Change this to real email
        position_id: 5,
        position_name: 'Administrator',
        work_location_id: 1,
        location_name: 'Head Office',
        supervisor_id: null,
        supervisor_name: null,
        status: 'active',
        created_at: new Date().toISOString().split('T')[0]
    };
    
    // Create minimal required data structure
    const initialData = {
        regions: [
            {
                id: 1,
                name: 'Head Office Region',
                code: 'HO',
                locationCount: 1,
                created_at: new Date().toISOString().split('T')[0]
            }
        ],
        locations: [
            {
                id: 1,
                name: 'Head Office',
                address: 'Your Company Address',
                region_id: 1,
                region_name: 'Head Office Region',
                employeeCount: 1,
                created_at: new Date().toISOString().split('T')[0]
            }
        ],
        positions: [
            {
                id: 1,
                name: 'Staff',
                level: 1,
                approval_level: 1,
                employeeCount: 0,
                created_at: new Date().toISOString().split('T')[0]
            },
            {
                id: 2,
                name: 'Supervisor',
                level: 2,
                approval_level: 2,
                employeeCount: 0,
                created_at: new Date().toISOString().split('T')[0]
            },
            {
                id: 3,
                name: 'Manager',
                level: 3,
                approval_level: 3,
                employeeCount: 0,
                created_at: new Date().toISOString().split('T')[0]
            },
            {
                id: 4,
                name: 'Director',
                level: 4,
                approval_level: 4,
                employeeCount: 0,
                created_at: new Date().toISOString().split('T')[0]
            },
            {
                id: 5,
                name: 'Administrator',
                level: 5,
                approval_level: 5,
                employeeCount: 1,
                created_at: new Date().toISOString().split('T')[0]
            }
        ],
        employees: [adminData]
    };
    
    // Save initial real data
    localStorage.setItem('masterdata_regions', JSON.stringify(initialData.regions));
    localStorage.setItem('masterdata_locations', JSON.stringify(initialData.locations));
    localStorage.setItem('masterdata_positions', JSON.stringify(initialData.positions));
    localStorage.setItem('masterdata_employees', JSON.stringify(initialData.employees));
    
    console.log('✅ Initial admin user created');
    console.log('📧 Admin email: admin@yourcompany.com');
    console.log('🔑 Please change the email to your real admin email');
    
    return adminData;
}

// Main execution
if (typeof window !== 'undefined') {
    // Browser environment
    window.clearAllDummyData = clearAllDummyData;
    window.setupFreshInstallation = setupFreshInstallation;
    window.createInitialAdmin = createInitialAdmin;
    
    // Auto-execute if called directly
    if (window.location.search.includes('clear=true')) {
        clearAllDummyData();
        setupFreshInstallation();
        createInitialAdmin();
        
        // Redirect to clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        alert('✅ All dummy data cleared! Page will refresh with fresh data.');
        window.location.reload();
    }
} else {
    // Node.js environment
    module.exports = {
        clearAllDummyData,
        setupFreshInstallation,
        createInitialAdmin
    };
}

console.log('🔧 Clear Dummy Data Script Loaded');
console.log('💡 Usage:');
console.log('- Browser: Add ?clear=true to URL');
console.log('- Console: clearAllDummyData()');
console.log('- Fresh setup: setupFreshInstallation()');
console.log('- Initial admin: createInitialAdmin()');