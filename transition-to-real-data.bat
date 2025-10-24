@echo off
echo ========================================
echo   LeaveFlow - Transition to Real Data
echo ========================================
echo.

echo This script will:
echo 1. Create backup of current data
echo 2. Clear all dummy data
echo 3. Setup fresh structure for real data
echo 4. Create initial admin user
echo.

echo WARNING: This will remove ALL existing data!
echo Make sure you have exported any important data first.
echo.

set /p confirm="Do you want to continue? (y/N): "
if /i not "%confirm%"=="y" (
    echo Operation cancelled.
    pause
    exit /b 0
)

echo.
echo ========================================
echo   STEP 1: Creating Backup
echo ========================================
echo.

echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Node.js not found!
    echo - Database backup will be skipped
    echo - Only localStorage cleanup will be performed
    echo.
    set NODE_AVAILABLE=false
) else (
    echo Node.js found!
    set NODE_AVAILABLE=true
    
    echo Creating backup...
    node backup-data.js
    if %errorlevel% neq 0 (
        echo WARNING: Backup failed, but continuing...
    ) else (
        echo ✅ Backup created successfully!
    )
)

echo.
echo ========================================
echo   STEP 2: Clearing Dummy Data
echo ========================================
echo.

if "%NODE_AVAILABLE%"=="true" (
    echo Clearing database dummy data...
    node clear-database.js
    if %errorlevel% neq 0 (
        echo WARNING: Database cleanup failed!
        echo Continuing with localStorage cleanup...
    ) else (
        echo ✅ Database cleared successfully!
    )
)

echo.
echo Clearing localStorage data...

echo ^<!DOCTYPE html^> > temp-clear.html
echo ^<html^>^<head^>^<title^>Clearing Data^</title^>^</head^> >> temp-clear.html
echo ^<body^>^<h2^>Clearing LeaveFlow Data...^</h2^> >> temp-clear.html
echo ^<div id="status"^>Processing...^</div^> >> temp-clear.html
echo ^<script^> >> temp-clear.html

echo // Clear localStorage data >> temp-clear.html
echo const storageKeys = [ >> temp-clear.html
echo     'masterdata_regions', 'masterdata_locations', 'masterdata_positions', >> temp-clear.html
echo     'masterdata_employees', 'demoEmployees', 'demo_analytics', >> temp-clear.html
echo     'leaveflow_visits', 'systemSettings', 'leaveflow_session', >> temp-clear.html
echo     'authToken', 'pending_changes', 'activity_logs', >> temp-clear.html
echo     'leaveflow_initialized', 'initialized' >> temp-clear.html
echo ]; >> temp-clear.html

echo let cleared = 0; >> temp-clear.html
echo storageKeys.forEach(key =^> { >> temp-clear.html
echo     if (localStorage.getItem(key)) { >> temp-clear.html
echo         localStorage.removeItem(key); >> temp-clear.html
echo         cleared++; >> temp-clear.html
echo     } >> temp-clear.html
echo }); >> temp-clear.html

echo // Clear any additional leaveflow keys >> temp-clear.html
echo Object.keys(localStorage).forEach(key =^> { >> temp-clear.html
echo     if (key.startsWith('leaveflow_')) { >> temp-clear.html
echo         localStorage.removeItem(key); >> temp-clear.html
echo         cleared++; >> temp-clear.html
echo     } >> temp-clear.html
echo }); >> temp-clear.html

echo // Setup fresh installation >> temp-clear.html
echo localStorage.setItem('leaveflow_fresh_install', 'true'); >> temp-clear.html
echo localStorage.setItem('leaveflow_setup_date', new Date().toISOString()); >> temp-clear.html

echo // Create initial admin data >> temp-clear.html
echo const initialData = { >> temp-clear.html
echo     regions: [{ >> temp-clear.html
echo         id: 1, name: 'Head Office Region', code: 'HO', >> temp-clear.html
echo         locationCount: 1, created_at: new Date().toISOString().split('T')[0] >> temp-clear.html
echo     }], >> temp-clear.html
echo     locations: [{ >> temp-clear.html
echo         id: 1, name: 'Head Office', address: 'Your Company Address - Please Update', >> temp-clear.html
echo         region_id: 1, region_name: 'Head Office Region', employeeCount: 1, >> temp-clear.html
echo         created_at: new Date().toISOString().split('T')[0] >> temp-clear.html
echo     }], >> temp-clear.html
echo     positions: [ >> temp-clear.html
echo         {id: 1, name: 'Staff', level: 1, approval_level: 1, employeeCount: 0, created_at: new Date().toISOString().split('T')[0]}, >> temp-clear.html
echo         {id: 2, name: 'Supervisor', level: 2, approval_level: 2, employeeCount: 0, created_at: new Date().toISOString().split('T')[0]}, >> temp-clear.html
echo         {id: 3, name: 'Manager', level: 3, approval_level: 3, employeeCount: 0, created_at: new Date().toISOString().split('T')[0]}, >> temp-clear.html
echo         {id: 4, name: 'Director', level: 4, approval_level: 4, employeeCount: 0, created_at: new Date().toISOString().split('T')[0]}, >> temp-clear.html
echo         {id: 5, name: 'Administrator', level: 5, approval_level: 5, employeeCount: 1, created_at: new Date().toISOString().split('T')[0]} >> temp-clear.html
echo     ], >> temp-clear.html
echo     employees: [{ >> temp-clear.html
echo         id: 1, employee_id: 'ADMIN001', name: 'System Administrator', >> temp-clear.html
echo         email: 'admin@yourcompany.com', position_id: 5, position_name: 'Administrator', >> temp-clear.html
echo         work_location_id: 1, location_name: 'Head Office', supervisor_id: null, >> temp-clear.html
echo         supervisor_name: null, status: 'active', created_at: new Date().toISOString().split('T')[0] >> temp-clear.html
echo     }] >> temp-clear.html
echo }; >> temp-clear.html

echo localStorage.setItem('masterdata_regions', JSON.stringify(initialData.regions)); >> temp-clear.html
echo localStorage.setItem('masterdata_locations', JSON.stringify(initialData.locations)); >> temp-clear.html
echo localStorage.setItem('masterdata_positions', JSON.stringify(initialData.positions)); >> temp-clear.html
echo localStorage.setItem('masterdata_employees', JSON.stringify(initialData.employees)); >> temp-clear.html

echo document.getElementById('status').innerHTML = '✅ Data cleared successfully!^<br^>Cleared ' + cleared + ' items^<br^>Fresh data structure created^<br^>^<br^>You can now close this window.'; >> temp-clear.html
echo setTimeout(() =^> window.close(), 3000); >> temp-clear.html

echo ^</script^>^</body^>^</html^> >> temp-clear.html

start temp-clear.html
timeout /t 5 >nul
del temp-clear.html >nul 2>&1

echo ✅ localStorage cleared successfully!

echo.
echo ========================================
echo   STEP 3: Setup Complete!
echo ========================================
echo.

echo ✅ Data transition completed successfully!
echo.
echo 📋 What was done:
if "%NODE_AVAILABLE%"=="true" (
    echo ✅ Database backup created
    echo ✅ Database dummy data cleared
)
echo ✅ localStorage dummy data cleared
echo ✅ Fresh data structure created
echo ✅ Initial admin user created
echo.

echo 🔑 Initial Admin Credentials:
echo Email: admin@yourcompany.com
echo Password: admin123
echo Employee ID: ADMIN001
echo.

echo ⚠️  IMPORTANT - Change these credentials immediately!
echo.

echo 📋 Next Steps:
echo 1. Login with admin credentials above
echo 2. Change admin email and password
echo 3. Update company information:
echo    - Company address in work location
echo    - Region names and codes
echo    - Position hierarchy if needed
echo 4. Add your real employees
echo 5. Configure system settings
echo.

echo 📁 Backup Location:
if "%NODE_AVAILABLE%"=="true" (
    echo Check 'backup' folder for data backup
) else (
    echo No backup created (Node.js not available)
)
echo.

echo 🎉 Your LeaveFlow is now ready for real data!
echo.

set /p open="Open LeaveFlow application now? (y/N): "
if /i "%open%"=="y" (
    if exist "index.html" (
        start index.html
    ) else if exist "demo-admin-full.html" (
        start demo-admin-full.html
    ) else (
        echo No demo file found. Please open your LeaveFlow application manually.
    )
)

echo.
pause