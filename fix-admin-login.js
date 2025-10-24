// Fix Admin Login Script
// This script ensures admin user exists and can login properly

console.log('🔧 Fixing admin login...');

// Function to create admin user
function createAdminUser() {
    // Get existing employees
    let employees = JSON.parse(localStorage.getItem('leaveflow_employees') || '[]');
    
    // Remove any existing admin users to avoid duplicates
    employees = employees.filter(emp => 
        emp.email !== 'admin@yourcompany.com' && 
        emp.employee_id !== 'ADMIN001' &&
        !emp.is_admin
    );
    
    // Create fresh admin user
    const adminUser = {
        id: 1,
        employee_id: 'ADMIN001',
        name: 'System Administrator',
        email: 'admin@yourcompany.com',
        password: 'admin123',
        position_id: 5,
        position_name: 'Administrator',
        work_location_id: 1,
        location_name: 'Head Office',
        supervisor_id: null,
        supervisor_name: null,
        status: 'active',
        is_admin: true,
        created_at: new Date().toISOString().split('T')[0],
        join_date: new Date().toISOString().split('T')[0]
    };
    
    // Add admin at the beginning
    employees.unshift(adminUser);
    
    // Update IDs for other employees
    employees.forEach((emp, index) => {
        if (index > 0) { // Skip admin user
            emp.id = index + 1;
        }
    });
    
    // Save to localStorage
    localStorage.setItem('leaveflow_employees', JSON.stringify(employees));
    
    console.log('✅ Admin user created/updated');
    return adminUser;
}

// Function to create basic data structure
function createBasicData() {
    // Create positions
    const positions = [
        {id: 1, name: 'Staff', level: 1},
        {id: 2, name: 'Supervisor', level: 2},
        {id: 3, name: 'Manager', level: 3},
        {id: 4, name: 'Director', level: 4},
        {id: 5, name: 'Administrator', level: 5}
    ];
    localStorage.setItem('leaveflow_positions', JSON.stringify(positions));
    
    // Create regions
    const regions = [
        {
            id: 1,
            name: 'Head Office Region',
            code: 'HO'
        }
    ];
    localStorage.setItem('leaveflow_regions', JSON.stringify(regions));
    
    // Create locations
    const locations = [
        {
            id: 1,
            name: 'Head Office',
            address: 'Your Company Address - Please Update',
            region_id: 1,
            region_name: 'Head Office Region'
        }
    ];
    localStorage.setItem('leaveflow_locations', JSON.stringify(locations));
    
    console.log('✅ Basic data structure created');
}

// Function to test admin login
function testAdminLogin() {
    const employees = JSON.parse(localStorage.getItem('leaveflow_employees') || '[]');
    
    console.log('🧪 Testing admin login...');
    console.log('📊 Total employees:', employees.length);
    
    // Find admin user
    const adminUser = employees.find(emp => 
        emp.email === 'admin@yourcompany.com' || 
        emp.employee_id === 'ADMIN001' ||
        emp.is_admin === true
    );
    
    if (adminUser) {
        console.log('✅ Admin user found:');
        console.log('   📧 Email:', adminUser.email);
        console.log('   🆔 Employee ID:', adminUser.employee_id);
        console.log('   🔑 Password:', adminUser.password);
        console.log('   👤 Name:', adminUser.name);
        console.log('   🏢 Position:', adminUser.position_name);
        console.log('   🔐 Is Admin:', adminUser.is_admin);
        console.log('   📍 Position ID:', adminUser.position_id);
        
        // Test login credentials
        if (adminUser.email === 'admin@yourcompany.com' && adminUser.password === 'admin123') {
            console.log('✅ Admin credentials are correct');
            return true;
        } else {
            console.log('❌ Admin credentials are incorrect');
            return false;
        }
    } else {
        console.log('❌ Admin user not found');
        return false;
    }
}

// Function to display all users for debugging
function displayAllUsers() {
    const employees = JSON.parse(localStorage.getItem('leaveflow_employees') || '[]');
    
    console.log('👥 All users in system:');
    employees.forEach((emp, index) => {
        console.log(`${index + 1}. ${emp.name} (${emp.email}) - ${emp.position_name} - Password: ${emp.password}`);
    });
}

// Main execution
function fixAdminLogin() {
    console.log('🚀 Starting admin login fix...');
    
    // Step 1: Create basic data structure
    createBasicData();
    
    // Step 2: Create admin user
    createAdminUser();
    
    // Step 3: Test admin login
    const loginWorks = testAdminLogin();
    
    // Step 4: Display all users
    displayAllUsers();
    
    if (loginWorks) {
        console.log('🎉 Admin login fix completed successfully!');
        console.log('📋 You can now login with:');
        console.log('   📧 Email: admin@yourcompany.com');
        console.log('   🔑 Password: admin123');
    } else {
        console.log('❌ Admin login fix failed. Please check the data.');
    }
    
    return loginWorks;
}

// Auto-execute if in browser
if (typeof window !== 'undefined') {
    // Make functions globally available
    window.fixAdminLogin = fixAdminLogin;
    window.createAdminUser = createAdminUser;
    window.testAdminLogin = testAdminLogin;
    window.displayAllUsers = displayAllUsers;
    
    // Auto-execute
    fixAdminLogin();
} else {
    // Node.js environment
    module.exports = {
        fixAdminLogin,
        createAdminUser,
        testAdminLogin,
        displayAllUsers
    };
}

console.log('🔧 Admin login fix script loaded');
console.log('💡 Usage: fixAdminLogin() or open browser console and run the function');