// Clear Database Script - Remove all dummy data from SQLite database
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database/leave_requests.db');

console.log('🗄️ Clearing database dummy data...');

// Check if database exists
if (!fs.existsSync(dbPath)) {
    console.log('❌ Database file not found:', dbPath);
    console.log('💡 Run "node setup.js" first to create database');
    process.exit(1);
}

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
});

// Function to clear all data from tables
function clearAllTables() {
    return new Promise((resolve, reject) => {
        const tables = ['approvals', 'leave_requests', 'employees', 'work_locations', 'positions', 'regions'];
        let completed = 0;
        
        console.log('\n🧹 Clearing all tables...');
        
        tables.forEach(table => {
            db.run(`DELETE FROM ${table}`, (err) => {
                if (err) {
                    console.error(`❌ Error clearing ${table}:`, err.message);
                } else {
                    console.log(`✅ Cleared table: ${table}`);
                }
                
                completed++;
                if (completed === tables.length) {
                    resolve();
                }
            });
        });
    });
}

// Function to reset auto-increment counters
function resetAutoIncrement() {
    return new Promise((resolve, reject) => {
        const tables = ['regions', 'work_locations', 'positions', 'employees', 'leave_requests', 'approvals'];
        let completed = 0;
        
        console.log('\n🔄 Resetting auto-increment counters...');
        
        tables.forEach(table => {
            db.run(`DELETE FROM sqlite_sequence WHERE name = ?`, [table], (err) => {
                if (err) {
                    console.log(`ℹ️ No sequence for ${table} (normal for new tables)`);
                } else {
                    console.log(`✅ Reset sequence for: ${table}`);
                }
                
                completed++;
                if (completed === tables.length) {
                    resolve();
                }
            });
        });
    });
}

// Function to create minimal real data structure
function createMinimalData() {
    return new Promise((resolve, reject) => {
        console.log('\n📋 Creating minimal data structure...');
        
        // Insert minimal regions
        db.run(`INSERT INTO regions (name, code) VALUES (?, ?)`, 
            ['Head Office Region', 'HO'], function(err) {
            if (err) {
                console.error('❌ Error creating region:', err.message);
                return reject(err);
            }
            
            const regionId = this.lastID;
            console.log('✅ Created region: Head Office Region');
            
            // Insert minimal work location
            db.run(`INSERT INTO work_locations (name, address, region_id) VALUES (?, ?, ?)`,
                ['Head Office', 'Your Company Address - Please Update', regionId], function(err) {
                if (err) {
                    console.error('❌ Error creating work location:', err.message);
                    return reject(err);
                }
                
                const locationId = this.lastID;
                console.log('✅ Created work location: Head Office');
                
                // Insert positions
                const positions = [
                    ['Staff', 1, 1],
                    ['Supervisor', 2, 2],
                    ['Manager', 3, 3],
                    ['Director', 4, 4],
                    ['Administrator', 5, 5]
                ];
                
                let positionCount = 0;
                positions.forEach(([name, level, approvalLevel]) => {
                    db.run(`INSERT INTO positions (name, level, approval_level) VALUES (?, ?, ?)`,
                        [name, level, approvalLevel], function(err) {
                        if (err) {
                            console.error(`❌ Error creating position ${name}:`, err.message);
                        } else {
                            console.log(`✅ Created position: ${name}`);
                        }
                        
                        positionCount++;
                        if (positionCount === positions.length) {
                            // Create initial admin user
                            createInitialAdmin(locationId, resolve, reject);
                        }
                    });
                });
            });
        });
    });
}

// Function to create initial admin user
function createInitialAdmin(locationId, resolve, reject) {
    const bcrypt = require('bcryptjs');
    
    bcrypt.hash('admin123', 10, (err, hashedPassword) => {
        if (err) {
            console.error('❌ Error hashing password:', err.message);
            return reject(err);
        }
        
        db.run(`INSERT INTO employees (employee_id, name, email, password, position_id, work_location_id, supervisor_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            ['ADMIN001', 'System Administrator', 'admin@yourcompany.com', hashedPassword, 5, locationId, null],
            function(err) {
                if (err) {
                    console.error('❌ Error creating admin user:', err.message);
                    return reject(err);
                }
                
                console.log('✅ Created initial admin user');
                console.log('📧 Email: admin@yourcompany.com');
                console.log('🔑 Password: admin123');
                console.log('⚠️  IMPORTANT: Change these credentials immediately!');
                
                resolve();
            });
    });
}

// Main execution
async function main() {
    try {
        await clearAllTables();
        await resetAutoIncrement();
        await createMinimalData();
        
        console.log('\n🎉 Database cleanup completed successfully!');
        console.log('\n📋 Summary:');
        console.log('✅ All dummy data removed');
        console.log('✅ Auto-increment counters reset');
        console.log('✅ Minimal real data structure created');
        console.log('✅ Initial admin user created');
        
        console.log('\n🔧 Next Steps:');
        console.log('1. Change admin email and password');
        console.log('2. Update company address in work location');
        console.log('3. Add your real regions and locations');
        console.log('4. Add your real employees');
        console.log('5. Configure system settings');
        
    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
            } else {
                console.log('✅ Database connection closed');
            }
        });
    }
}

// Run the cleanup
main();