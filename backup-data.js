// Backup Data Script - Create backup before clearing dummy data
const fs = require('fs');
const path = require('path');

console.log('💾 Creating data backup...');

// Create backup directory
const backupDir = path.join(__dirname, 'backup');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log('✅ Created backup directory');
}

// Generate timestamp for backup
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const backupPath = path.join(backupDir, `leaveflow-backup-${timestamp}`);

if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath);
}

console.log(`📁 Backup location: ${backupPath}`);

// Function to backup database
function backupDatabase() {
    const dbPath = path.join(__dirname, 'database/leave_requests.db');
    
    if (fs.existsSync(dbPath)) {
        const backupDbPath = path.join(backupPath, 'leave_requests.db');
        fs.copyFileSync(dbPath, backupDbPath);
        console.log('✅ Database backed up');
        return true;
    } else {
        console.log('ℹ️ No database file found to backup');
        return false;
    }
}

// Function to backup localStorage data (from browser)
function backupLocalStorageData() {
    const localStorageData = {};
    
    // List of localStorage keys to backup
    const storageKeys = [
        'masterdata_regions',
        'masterdata_locations', 
        'masterdata_positions',
        'masterdata_employees',
        'systemSettings',
        'demo_analytics',
        'leaveflow_visits'
    ];
    
    // In browser environment, this would read from localStorage
    // For Node.js, we'll create a template
    storageKeys.forEach(key => {
        localStorageData[key] = `localStorage.getItem('${key}')`;
    });
    
    const backupFile = path.join(backupPath, 'localStorage-backup.json');
    fs.writeFileSync(backupFile, JSON.stringify(localStorageData, null, 2));
    console.log('✅ localStorage template backed up');
    
    return localStorageData;
}

// Function to create backup info
function createBackupInfo() {
    const backupInfo = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'LeaveFlow data backup before clearing dummy data',
        contents: {
            database: fs.existsSync(path.join(__dirname, 'database/leave_requests.db')),
            localStorage: true,
            configFiles: true
        },
        instructions: {
            restore: 'Copy files back to original locations',
            database: 'Replace database/leave_requests.db with backed up version',
            localStorage: 'Manually restore localStorage keys from backup file'
        }
    };
    
    const infoFile = path.join(backupPath, 'backup-info.json');
    fs.writeFileSync(infoFile, JSON.stringify(backupInfo, null, 2));
    console.log('✅ Backup info created');
    
    return backupInfo;
}

// Function to backup configuration files
function backupConfigFiles() {
    const configFiles = [
        'package.json',
        'setup.js',
        'backend/app.js',
        'backend/config/database.js'
    ];
    
    configFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const backupFilePath = path.join(backupPath, file.replace('/', '_'));
            fs.copyFileSync(filePath, backupFilePath);
            console.log(`✅ Backed up: ${file}`);
        }
    });
}

// Main backup function
function createFullBackup() {
    console.log('\n🚀 Starting full backup...');
    
    try {
        // Backup database
        const dbBackedUp = backupDatabase();
        
        // Backup localStorage data template
        backupLocalStorageData();
        
        // Backup configuration files
        backupConfigFiles();
        
        // Create backup info
        const backupInfo = createBackupInfo();
        
        console.log('\n🎉 Backup completed successfully!');
        console.log(`📁 Backup location: ${backupPath}`);
        console.log('\n📋 Backup contents:');
        console.log(`✅ Database: ${dbBackedUp ? 'Yes' : 'No'}`);
        console.log('✅ localStorage template: Yes');
        console.log('✅ Configuration files: Yes');
        console.log('✅ Backup info: Yes');
        
        console.log('\n💡 To restore:');
        console.log('1. Copy database file back to database/ folder');
        console.log('2. Restore localStorage manually from backup file');
        console.log('3. Check backup-info.json for details');
        
        return backupPath;
        
    } catch (error) {
        console.error('❌ Backup failed:', error.message);
        throw error;
    }
}

// Browser-compatible localStorage backup function
function createBrowserBackup() {
    if (typeof window === 'undefined') {
        console.log('ℹ️ Browser backup function - use in browser console');
        return;
    }
    
    const backup = {};
    const keys = [
        'masterdata_regions',
        'masterdata_locations', 
        'masterdata_positions',
        'masterdata_employees',
        'systemSettings',
        'demo_analytics',
        'leaveflow_visits'
    ];
    
    keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            backup[key] = value;
        }
    });
    
    // Download backup as JSON file
    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `leaveflow-localStorage-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    console.log('✅ localStorage backup downloaded');
    return backup;
}

// Export functions
if (typeof window !== 'undefined') {
    // Browser environment
    window.createBrowserBackup = createBrowserBackup;
    console.log('💾 Browser backup function loaded');
    console.log('💡 Usage: createBrowserBackup()');
} else {
    // Node.js environment
    module.exports = {
        createFullBackup,
        backupDatabase,
        backupLocalStorageData,
        createBackupInfo
    };
    
    // Auto-execute if called directly
    if (require.main === module) {
        createFullBackup();
    }
}

console.log('💾 Backup script loaded successfully');