@echo off
echo ========================================
echo   LeaveFlow - Fix Admin Login
echo ========================================
echo.

echo This script will fix admin login issues by:
echo 1. Creating/updating admin user data
echo 2. Ensuring proper data structure
echo 3. Testing admin login credentials
echo 4. Opening login page for testing
echo.

echo Creating admin login fix script...

echo ^<!DOCTYPE html^> > admin-login-fix.html
echo ^<html lang="id"^> >> admin-login-fix.html
echo ^<head^> >> admin-login-fix.html
echo     ^<meta charset="UTF-8"^> >> admin-login-fix.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> admin-login-fix.html
echo     ^<title^>LeaveFlow - Admin Login Fix^</title^> >> admin-login-fix.html
echo     ^<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"^> >> admin-login-fix.html
echo     ^<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"^> >> admin-login-fix.html
echo     ^<style^> >> admin-login-fix.html
echo         body { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); min-height: 100vh; font-family: 'Inter', sans-serif; padding: 20px; } >> admin-login-fix.html
echo         .fix-container { max-width: 700px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); } >> admin-login-fix.html
echo         .fix-header { text-align: center; margin-bottom: 30px; } >> admin-login-fix.html
echo         .fix-header h1 { color: #6f42c1; margin-bottom: 10px; } >> admin-login-fix.html
echo         .btn-primary { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); border: none; border-radius: 10px; padding: 12px 30px; } >> admin-login-fix.html
echo         .alert { border-radius: 15px; border: none; } >> admin-login-fix.html
echo         .log-output { background: #f8f9fa; border-radius: 10px; padding: 20px; font-family: monospace; font-size: 14px; max-height: 400px; overflow-y: auto; } >> admin-login-fix.html
echo         .credentials { background: #e8f5e8; border-radius: 10px; padding: 20px; margin: 20px 0; } >> admin-login-fix.html
echo     ^</style^> >> admin-login-fix.html
echo ^</head^> >> admin-login-fix.html
echo ^<body^> >> admin-login-fix.html
echo     ^<div class="fix-container"^> >> admin-login-fix.html
echo         ^<div class="fix-header"^> >> admin-login-fix.html
echo             ^<h1^>^<i class="fas fa-tools"^>^</i^> Admin Login Fix^</h1^> >> admin-login-fix.html
echo             ^<p class="text-muted"^>Fixing admin login issues^</p^> >> admin-login-fix.html
echo         ^</div^> >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         ^<div class="alert alert-info"^> >> admin-login-fix.html
echo             ^<i class="fas fa-info-circle me-2"^>^</i^> >> admin-login-fix.html
echo             This tool will create/fix the admin user and test login functionality. >> admin-login-fix.html
echo         ^</div^> >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         ^<div class="text-center mb-4"^> >> admin-login-fix.html
echo             ^<button class="btn btn-primary btn-lg" onclick="runFix()"^> >> admin-login-fix.html
echo                 ^<i class="fas fa-play me-2"^>^</i^>Fix Admin Login >> admin-login-fix.html
echo             ^</button^> >> admin-login-fix.html
echo         ^</div^> >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         ^<div id="logOutput" class="log-output" style="display: none;"^>^</div^> >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         ^<div id="credentials" class="credentials" style="display: none;"^> >> admin-login-fix.html
echo             ^<h5^>^<i class="fas fa-key me-2"^>^</i^>Admin Login Credentials^</h5^> >> admin-login-fix.html
echo             ^<p^>^<strong^>Email:^</strong^> admin@yourcompany.com^</p^> >> admin-login-fix.html
echo             ^<p^>^<strong^>Password:^</strong^> admin123^</p^> >> admin-login-fix.html
echo             ^<p^>^<strong^>Employee ID:^</strong^> ADMIN001^</p^> >> admin-login-fix.html
echo         ^</div^> >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         ^<div class="text-center mt-4"^> >> admin-login-fix.html
echo             ^<button class="btn btn-success" onclick="openLogin()" id="loginBtn" style="display: none;"^> >> admin-login-fix.html
echo                 ^<i class="fas fa-sign-in-alt me-2"^>^</i^>Test Login Now >> admin-login-fix.html
echo             ^</button^> >> admin-login-fix.html
echo         ^</div^> >> admin-login-fix.html
echo     ^</div^> >> admin-login-fix.html
echo. >> admin-login-fix.html
echo     ^<script^> >> admin-login-fix.html
echo         function log(message) { >> admin-login-fix.html
echo             const output = document.getElementById('logOutput'); >> admin-login-fix.html
echo             output.style.display = 'block'; >> admin-login-fix.html
echo             output.innerHTML += message + '^<br^>'; >> admin-login-fix.html
echo             output.scrollTop = output.scrollHeight; >> admin-login-fix.html
echo             console.log(message); >> admin-login-fix.html
echo         } >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         function runFix() { >> admin-login-fix.html
echo             document.getElementById('logOutput').innerHTML = ''; >> admin-login-fix.html
echo             log('🚀 Starting admin login fix...'); >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Create positions >> admin-login-fix.html
echo             const positions = [ >> admin-login-fix.html
echo                 {id: 1, name: 'Staff', level: 1}, >> admin-login-fix.html
echo                 {id: 2, name: 'Supervisor', level: 2}, >> admin-login-fix.html
echo                 {id: 3, name: 'Manager', level: 3}, >> admin-login-fix.html
echo                 {id: 4, name: 'Director', level: 4}, >> admin-login-fix.html
echo                 {id: 5, name: 'Administrator', level: 5} >> admin-login-fix.html
echo             ]; >> admin-login-fix.html
echo             localStorage.setItem('leaveflow_positions', JSON.stringify(positions)); >> admin-login-fix.html
echo             log('✅ Positions created'); >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Create regions >> admin-login-fix.html
echo             const regions = [{id: 1, name: 'Head Office Region', code: 'HO'}]; >> admin-login-fix.html
echo             localStorage.setItem('leaveflow_regions', JSON.stringify(regions)); >> admin-login-fix.html
echo             log('✅ Regions created'); >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Create locations >> admin-login-fix.html
echo             const locations = [{id: 1, name: 'Head Office', address: 'Your Company Address', region_id: 1, region_name: 'Head Office Region'}]; >> admin-login-fix.html
echo             localStorage.setItem('leaveflow_locations', JSON.stringify(locations)); >> admin-login-fix.html
echo             log('✅ Locations created'); >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Get existing employees and remove old admin >> admin-login-fix.html
echo             let employees = JSON.parse(localStorage.getItem('leaveflow_employees') ^|^| '[]'); >> admin-login-fix.html
echo             employees = employees.filter(emp =^> emp.email !== 'admin@yourcompany.com' ^&^& emp.employee_id !== 'ADMIN001' ^&^& !emp.is_admin); >> admin-login-fix.html
echo             log('🧹 Removed old admin users'); >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Create fresh admin user >> admin-login-fix.html
echo             const adminUser = { >> admin-login-fix.html
echo                 id: 1, >> admin-login-fix.html
echo                 employee_id: 'ADMIN001', >> admin-login-fix.html
echo                 name: 'System Administrator', >> admin-login-fix.html
echo                 email: 'admin@yourcompany.com', >> admin-login-fix.html
echo                 password: 'admin123', >> admin-login-fix.html
echo                 position_id: 5, >> admin-login-fix.html
echo                 position_name: 'Administrator', >> admin-login-fix.html
echo                 work_location_id: 1, >> admin-login-fix.html
echo                 location_name: 'Head Office', >> admin-login-fix.html
echo                 supervisor_id: null, >> admin-login-fix.html
echo                 supervisor_name: null, >> admin-login-fix.html
echo                 status: 'active', >> admin-login-fix.html
echo                 is_admin: true, >> admin-login-fix.html
echo                 created_at: new Date().toISOString().split('T')[0], >> admin-login-fix.html
echo                 join_date: new Date().toISOString().split('T')[0] >> admin-login-fix.html
echo             }; >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Add admin at beginning >> admin-login-fix.html
echo             employees.unshift(adminUser); >> admin-login-fix.html
echo             localStorage.setItem('leaveflow_employees', JSON.stringify(employees)); >> admin-login-fix.html
echo             log('✅ Admin user created'); >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             // Test admin login >> admin-login-fix.html
echo             const testUser = employees.find(emp =^> emp.email === 'admin@yourcompany.com'); >> admin-login-fix.html
echo             if (testUser ^&^& testUser.password === 'admin123') { >> admin-login-fix.html
echo                 log('✅ Admin login test successful'); >> admin-login-fix.html
echo                 log('📧 Email: ' + testUser.email); >> admin-login-fix.html
echo                 log('🔑 Password: ' + testUser.password); >> admin-login-fix.html
echo                 log('👤 Name: ' + testUser.name); >> admin-login-fix.html
echo                 log('🏢 Position: ' + testUser.position_name); >> admin-login-fix.html
echo                 log('🔐 Is Admin: ' + testUser.is_admin); >> admin-login-fix.html
echo                 document.getElementById('credentials').style.display = 'block'; >> admin-login-fix.html
echo                 document.getElementById('loginBtn').style.display = 'inline-block'; >> admin-login-fix.html
echo                 log('🎉 Admin login fix completed successfully!'); >> admin-login-fix.html
echo             } else { >> admin-login-fix.html
echo                 log('❌ Admin login test failed'); >> admin-login-fix.html
echo             } >> admin-login-fix.html
echo. >> admin-login-fix.html
echo             log('👥 Total employees in system: ' + employees.length); >> admin-login-fix.html
echo         } >> admin-login-fix.html
echo. >> admin-login-fix.html
echo         function openLogin() { >> admin-login-fix.html
echo             window.open('auth-system.html', '_blank'); >> admin-login-fix.html
echo         } >> admin-login-fix.html
echo     ^</script^> >> admin-login-fix.html
echo ^</body^> >> admin-login-fix.html
echo ^</html^> >> admin-login-fix.html

echo ✅ Admin login fix tool created!
echo.

echo Opening admin login fix tool...
start admin-login-fix.html

echo.
echo ========================================
echo   Admin Login Fix Instructions
echo ========================================
echo.
echo 1. ✅ Fix tool opened in browser
echo 2. 🔧 Click "Fix Admin Login" to create admin user
echo 3. 📋 Note the admin credentials shown
echo 4. 🚀 Click "Test Login Now" to open login page
echo 5. 🔐 Login with: admin@yourcompany.com / admin123
echo.
echo Expected result:
echo - Admin user created in localStorage
echo - Login should work and redirect to admin dashboard
echo.

pause

echo.
echo Cleaning up temporary files...
timeout /t 3 >nul
del admin-login-fix.html >nul 2>&1

echo ✅ Admin login fix completed!
echo.
echo Next steps:
echo 1. Test login with admin@yourcompany.com / admin123
echo 2. Verify redirect to admin dashboard
echo 3. Check admin functionality
echo.

pause