const bcrypt = require('bcryptjs');
const db = require('./backend/config/database');

// Setup sample employees with proper hierarchy
const setupSampleEmployees = async () => {
  console.log('Setting up sample employees...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Insert sample employees with hierarchy
  const employees = [
    // Director (Level 4)
    {
      employee_id: 'DIR001',
      name: 'Budi Santoso',
      email: 'director@company.com',
      password: hashedPassword,
      position_id: 4, // Director
      work_location_id: 1, // Jakarta
      supervisor_id: null
    },
    // Manager (Level 3)
    {
      employee_id: 'MGR001',
      name: 'Siti Rahayu',
      email: 'manager@company.com',
      password: hashedPassword,
      position_id: 3, // Manager
      work_location_id: 1, // Jakarta
      supervisor_id: 1 // Reports to Director
    },
    // Supervisor (Level 2)
    {
      employee_id: 'SPV001',
      name: 'Ahmad Wijaya',
      email: 'supervisor@company.com',
      password: hashedPassword,
      position_id: 2, // Supervisor
      work_location_id: 1, // Jakarta
      supervisor_id: 2 // Reports to Manager
    },
    // Staff (Level 1)
    {
      employee_id: 'STF001',
      name: 'Dewi Lestari',
      email: 'staff@company.com',
      password: hashedPassword,
      position_id: 1, // Staff
      work_location_id: 1, // Jakarta
      supervisor_id: 3 // Reports to Supervisor
    },
    // Admin user for testing
    {
      employee_id: 'ADM001',
      name: 'Admin User',
      email: 'admin@company.com',
      password: hashedPassword,
      position_id: 5, // Administrator level
      work_location_id: 1, // Jakarta
      supervisor_id: null // No supervisor - highest level
    }
  ];

  for (const employee of employees) {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT OR REPLACE INTO employees (employee_id, name, email, password, position_id, work_location_id, supervisor_id)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [employee.employee_id, employee.name, employee.email, employee.password, 
           employee.position_id, employee.work_location_id, employee.supervisor_id],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
      console.log(`✓ Created employee: ${employee.name} (${employee.email})`);
    } catch (error) {
      console.error(`✗ Error creating employee ${employee.name}:`, error.message);
    }
  }
};

// Run setup
const runSetup = async () => {
  console.log('🚀 Starting application setup...\n');
  
  try {
    // Initialize database (tables are created in initDb.js)
    require('./backend/config/initDb');
    
    // Wait a bit for database initialization
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Setup sample employees
    await setupSampleEmployees();
    
    console.log('\n✅ Setup completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('🔑 ADMINISTRATOR: admin@company.com / password123 (FULL ACCESS)');
    console.log('👑 Director: director@company.com / password123');
    console.log('👔 Manager: manager@company.com / password123');
    console.log('👨‍💼 Supervisor: supervisor@company.com / password123');
    console.log('👤 Staff: staff@company.com / password123');
    
    console.log('\n🚀 To start the application:');
    console.log('npm install');
    console.log('npm start');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    // Close database connection
    setTimeout(() => {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed');
        }
        process.exit(0);
      });
    }, 1000);
  }
};

runSetup();