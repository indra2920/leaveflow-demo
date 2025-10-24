@echo off
echo ========================================
echo   LeaveFlow - Fix Dashboard After Cleanup
echo ========================================
echo.

echo This script will fix dashboard display issues after cleanup:
echo 1. Force clear all browser cache
echo 2. Reset dashboard counters to 0
echo 3. Clear any cached data
echo 4. Open fresh admin dashboard
echo.

echo Creating dashboard fix script...

echo ^<!DOCTYPE html^> > dashboard-fix.html
echo ^<html lang="id"^> >> dashboard-fix.html
echo ^<head^> >> dashboard-fix.html
echo     ^<meta charset="UTF-8"^> >> dashboard-fix.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> dashboard-fix.html
echo     ^<title^>LeaveFlow - Dashboard Fix^</title^> >> dashboard-fix.html
echo     ^<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"^> >> dashboard-fix.html
echo     ^<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"^> >> dashboard-fix.html
echo     ^<style^> >> dashboard-fix.html
echo         body { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); min-height: 100vh; font-family: 'Segoe UI', sans-serif; } >> dashboard-fix.html
echo         .fix-container { max-width: 600px; margin: 50px auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); } >> dashboard-fix.html
echo         .fix-header { text-align: center; margin-bottom: 30px; } >> dashboard-fix.html
echo         .fix-header h1 { color: #6f42c1; margin-bottom: 10px; } >> dashboard-fix.html
echo         .progress { height: 25px; border-radius: 15px; margin: 20px 0; } >> dashboard-fix.html
echo         .btn-primary { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); border: none; border-radius: 10px; padding: 12px 30px; } >> dashboard-fix.html
echo         .alert { border-radius: 15px; border: none; } >> dashboard-fix.html
echo         .step { margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 10px; } >> dashboard-fix.html
echo     ^</style^> >> dashboard-fix.html
echo ^</head^> >> dashboard-fix.html
echo ^<body^> >> dashboard-fix.html
echo     ^<div class="fix-container"^> >> dashboard-fix.html
echo         ^<div class="fix-header"^> >> dashboard-fix.html
echo             ^<h1^>^<i class="fas fa-tools"^>^</i^> Dashboard Fix^</h1^> >> dashboard-fix.html
echo             ^<p class="text-muted"^>Fixing dashboard display after cleanup^</p^> >> dashboard-fix.html
echo         ^</div^> >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         ^<div id="fixStatus"^> >> dashboard-fix.html
echo             ^<div class="alert alert-info"^> >> dashboard-fix.html
echo                 ^<i class="fas fa-info-circle me-2"^>^</i^> >> dashboard-fix.html
echo                 Starting dashboard fix process... >> dashboard-fix.html
echo             ^</div^> >> dashboard-fix.html
echo         ^</div^> >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         ^<div class="progress"^> >> dashboard-fix.html
echo             ^<div class="progress-bar progress-bar-striped progress-bar-animated" id="progressBar" style="width: 0%%"^>^</div^> >> dashboard-fix.html
echo         ^</div^> >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         ^<div id="steps"^>^</div^> >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         ^<div class="text-center mt-4"^> >> dashboard-fix.html
echo             ^<button class="btn btn-primary" onclick="startFix()" id="startBtn"^> >> dashboard-fix.html
echo                 ^<i class="fas fa-play me-2"^>^</i^>Start Fix >> dashboard-fix.html
echo             ^</button^> >> dashboard-fix.html
echo             ^<button class="btn btn-success" onclick="openDashboard()" id="openBtn" style="display: none;"^> >> dashboard-fix.html
echo                 ^<i class="fas fa-external-link-alt me-2"^>^</i^>Open Dashboard >> dashboard-fix.html
echo             ^</button^> >> dashboard-fix.html
echo         ^</div^> >> dashboard-fix.html
echo     ^</div^> >> dashboard-fix.html
echo. >> dashboard-fix.html
echo     ^<script^> >> dashboard-fix.html
echo         let currentStep = 0; >> dashboard-fix.html
echo         const totalSteps = 6; >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function updateProgress(step, message, success = true) { >> dashboard-fix.html
echo             const progress = (step / totalSteps) * 100; >> dashboard-fix.html
echo             document.getElementById('progressBar').style.width = progress + '%%'; >> dashboard-fix.html
echo. >> dashboard-fix.html
echo             const stepDiv = document.createElement('div'); >> dashboard-fix.html
echo             stepDiv.className = 'step'; >> dashboard-fix.html
echo             stepDiv.innerHTML = '^<i class="fas ' + (success ? 'fa-check text-success' : 'fa-times text-danger') + ' me-2"^>^</i^>' + message; >> dashboard-fix.html
echo             document.getElementById('steps').appendChild(stepDiv); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function startFix() { >> dashboard-fix.html
echo             document.getElementById('startBtn').style.display = 'none'; >> dashboard-fix.html
echo             document.getElementById('fixStatus').innerHTML = '^<div class="alert alert-warning"^>^<i class="fas fa-cog fa-spin me-2"^>^</i^>Fixing dashboard...^</div^>'; >> dashboard-fix.html
echo. >> dashboard-fix.html
echo             setTimeout(() =^> fixStep1(), 500); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function fixStep1() { >> dashboard-fix.html
echo             updateProgress(1, 'Clearing localStorage cache...'); >> dashboard-fix.html
echo             const keysToRemove = ['masterdata_regions', 'masterdata_locations', 'masterdata_positions', 'masterdata_employees', 'demoEmployees', 'demo_analytics', 'leaveflow_visits', 'systemSettings', 'leaveflow_session', 'authToken', 'pending_changes', 'activity_logs', 'leaveflow_initialized', 'initialized']; >> dashboard-fix.html
echo             let cleared = 0; >> dashboard-fix.html
echo             keysToRemove.forEach(key =^> { >> dashboard-fix.html
echo                 if (localStorage.getItem(key)) { >> dashboard-fix.html
echo                     localStorage.removeItem(key); >> dashboard-fix.html
echo                     cleared++; >> dashboard-fix.html
echo                 } >> dashboard-fix.html
echo             }); >> dashboard-fix.html
echo             Object.keys(localStorage).forEach(key =^> { >> dashboard-fix.html
echo                 if (key.startsWith('leaveflow_')) { >> dashboard-fix.html
echo                     localStorage.removeItem(key); >> dashboard-fix.html
echo                     cleared++; >> dashboard-fix.html
echo                 } >> dashboard-fix.html
echo             }); >> dashboard-fix.html
echo             setTimeout(() =^> fixStep2(), 800); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function fixStep2() { >> dashboard-fix.html
echo             updateProgress(2, 'Clearing sessionStorage...'); >> dashboard-fix.html
echo             Object.keys(sessionStorage).forEach(key =^> { >> dashboard-fix.html
echo                 if (key.startsWith('leaveflow_') ^|^| key.startsWith('masterdata_') ^|^| key.startsWith('demo')) { >> dashboard-fix.html
echo                     sessionStorage.removeItem(key); >> dashboard-fix.html
echo                 } >> dashboard-fix.html
echo             }); >> dashboard-fix.html
echo             setTimeout(() =^> fixStep3(), 800); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function fixStep3() { >> dashboard-fix.html
echo             updateProgress(3, 'Setting up clean data structure...'); >> dashboard-fix.html
echo             const cleanData = { >> dashboard-fix.html
echo                 leaveflow_employees: [], >> dashboard-fix.html
echo                 leaveflow_leave_requests: [], >> dashboard-fix.html
echo                 leaveflow_regions: [], >> dashboard-fix.html
echo                 leaveflow_locations: [], >> dashboard-fix.html
echo                 leaveflow_positions: [ >> dashboard-fix.html
echo                     {id: 1, name: 'Staff', level: 1}, >> dashboard-fix.html
echo                     {id: 2, name: 'Supervisor', level: 2}, >> dashboard-fix.html
echo                     {id: 3, name: 'Manager', level: 3}, >> dashboard-fix.html
echo                     {id: 4, name: 'Director', level: 4}, >> dashboard-fix.html
echo                     {id: 5, name: 'Administrator', level: 5} >> dashboard-fix.html
echo                 ] >> dashboard-fix.html
echo             }; >> dashboard-fix.html
echo             Object.keys(cleanData).forEach(key =^> { >> dashboard-fix.html
echo                 localStorage.setItem(key, JSON.stringify(cleanData[key])); >> dashboard-fix.html
echo             }); >> dashboard-fix.html
echo             setTimeout(() =^> fixStep4(), 800); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function fixStep4() { >> dashboard-fix.html
echo             updateProgress(4, 'Setting cleanup flags...'); >> dashboard-fix.html
echo             localStorage.setItem('leaveflow_clean_state', 'true'); >> dashboard-fix.html
echo             localStorage.setItem('leaveflow_cleanup_date', new Date().toISOString()); >> dashboard-fix.html
echo             localStorage.setItem('leaveflow_fresh_install', 'true'); >> dashboard-fix.html
echo             setTimeout(() =^> fixStep5(), 800); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function fixStep5() { >> dashboard-fix.html
echo             updateProgress(5, 'Clearing browser cache...'); >> dashboard-fix.html
echo             if ('caches' in window) { >> dashboard-fix.html
echo                 caches.keys().then(cacheNames =^> { >> dashboard-fix.html
echo                     cacheNames.forEach(cacheName =^> { >> dashboard-fix.html
echo                         if (cacheName.includes('leaveflow') ^|^| cacheName.includes('admin')) { >> dashboard-fix.html
echo                             caches.delete(cacheName); >> dashboard-fix.html
echo                         } >> dashboard-fix.html
echo                     }); >> dashboard-fix.html
echo                 }); >> dashboard-fix.html
echo             } >> dashboard-fix.html
echo             setTimeout(() =^> fixStep6(), 800); >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function fixStep6() { >> dashboard-fix.html
echo             updateProgress(6, 'Dashboard fix completed!'); >> dashboard-fix.html
echo             document.getElementById('fixStatus').innerHTML = '^<div class="alert alert-success"^>^<i class="fas fa-check-circle me-2"^>^</i^>Dashboard fix completed successfully!^</div^>'; >> dashboard-fix.html
echo             document.getElementById('openBtn').style.display = 'inline-block'; >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo. >> dashboard-fix.html
echo         function openDashboard() { >> dashboard-fix.html
echo             if (confirm('Dashboard will open with clean data. Continue?')) { >> dashboard-fix.html
echo                 window.open('admin-dashboard-fixed.html?cleanup=true&timestamp=' + Date.now(), '_blank'); >> dashboard-fix.html
echo                 setTimeout(() =^> window.close(), 1000); >> dashboard-fix.html
echo             } >> dashboard-fix.html
echo         } >> dashboard-fix.html
echo     ^</script^> >> dashboard-fix.html
echo ^</body^> >> dashboard-fix.html
echo ^</html^> >> dashboard-fix.html

echo ✅ Dashboard fix script created!
echo.

echo Opening dashboard fix tool...
start dashboard-fix.html

echo.
echo ========================================
echo   Dashboard Fix Instructions
echo ========================================
echo.
echo 1. ✅ Dashboard fix tool opened in browser
echo 2. 🔧 Click "Start Fix" to begin the process
echo 3. ⏳ Wait for all steps to complete
echo 4. 🚀 Click "Open Dashboard" when done
echo 5. 📊 Dashboard will show clean data (all zeros)
echo.
echo If dashboard still shows old data:
echo - Close all browser windows
echo - Clear browser cache manually (Ctrl+Shift+Del)
echo - Open admin-dashboard-fixed.html directly
echo.
echo 🎯 Expected result: All counters should show 0
echo.

pause

echo.
echo Cleaning up temporary files...
timeout /t 3 >nul
del dashboard-fix.html >nul 2>&1

echo ✅ Dashboard fix process completed!
echo.
echo Next steps:
echo 1. Verify dashboard shows clean data (zeros)
echo 2. Use real-data-wizard.html to setup company data
echo 3. Or manually add employees through admin panel
echo.

pause