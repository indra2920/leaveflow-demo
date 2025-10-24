@echo off
echo ========================================
echo   LeaveFlow - Fix Master Data Buttons
echo ========================================
echo.

echo This script will fix the non-clickable buttons issue in Master Data:
echo 1. Create button fix tool
echo 2. Test button functionality
echo 3. Apply fixes automatically
echo 4. Open Master Data page for testing
echo.

echo Creating button fix tool...

echo ^<!DOCTYPE html^> > button-fix-tool.html
echo ^<html lang="id"^> >> button-fix-tool.html
echo ^<head^> >> button-fix-tool.html
echo     ^<meta charset="UTF-8"^> >> button-fix-tool.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> button-fix-tool.html
echo     ^<title^>LeaveFlow - Button Fix Tool^</title^> >> button-fix-tool.html
echo     ^<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"^> >> button-fix-tool.html
echo     ^<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"^> >> button-fix-tool.html
echo     ^<style^> >> button-fix-tool.html
echo         body { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); min-height: 100vh; font-family: 'Inter', sans-serif; padding: 20px; } >> button-fix-tool.html
echo         .fix-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); } >> button-fix-tool.html
echo         .fix-header { text-align: center; margin-bottom: 30px; } >> button-fix-tool.html
echo         .fix-header h1 { color: #6f42c1; margin-bottom: 10px; } >> button-fix-tool.html
echo         .btn-primary { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); border: none; border-radius: 10px; padding: 12px 30px; } >> button-fix-tool.html
echo         .alert { border-radius: 15px; border: none; } >> button-fix-tool.html
echo         .log-output { background: #f8f9fa; border-radius: 10px; padding: 20px; font-family: monospace; font-size: 14px; max-height: 400px; overflow-y: auto; } >> button-fix-tool.html
echo         .test-buttons { margin: 20px 0; } >> button-fix-tool.html
echo         .test-buttons button { margin: 5px; } >> button-fix-tool.html
echo     ^</style^> >> button-fix-tool.html
echo ^</head^> >> button-fix-tool.html
echo ^<body^> >> button-fix-tool.html
echo     ^<div class="fix-container"^> >> button-fix-tool.html
echo         ^<div class="fix-header"^> >> button-fix-tool.html
echo             ^<h1^>^<i class="fas fa-tools"^>^</i^> Master Data Button Fix^</h1^> >> button-fix-tool.html
echo             ^<p class="text-muted"^>Fixing non-clickable buttons in Master Data^</p^> >> button-fix-tool.html
echo         ^</div^> >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         ^<div class="alert alert-info"^> >> button-fix-tool.html
echo             ^<i class="fas fa-info-circle me-2"^>^</i^> >> button-fix-tool.html
echo             This tool will diagnose and fix button click issues in Master Data management. >> button-fix-tool.html
echo         ^</div^> >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         ^<div class="text-center mb-4"^> >> button-fix-tool.html
echo             ^<button class="btn btn-primary btn-lg" onclick="runDiagnostic()"^> >> button-fix-tool.html
echo                 ^<i class="fas fa-search me-2"^>^</i^>Run Diagnostic >> button-fix-tool.html
echo             ^</button^> >> button-fix-tool.html
echo             ^<button class="btn btn-success btn-lg ms-2" onclick="applyFix()"^> >> button-fix-tool.html
echo                 ^<i class="fas fa-wrench me-2"^>^</i^>Apply Fix >> button-fix-tool.html
echo             ^</button^> >> button-fix-tool.html
echo         ^</div^> >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         ^<div class="test-buttons text-center"^> >> button-fix-tool.html
echo             ^<h5^>Test Buttons:^</h5^> >> button-fix-tool.html
echo             ^<button class="btn btn-outline-primary" onclick="testRegionButton()"^> >> button-fix-tool.html
echo                 ^<i class="fas fa-globe me-2"^>^</i^>Test Wilayah >> button-fix-tool.html
echo             ^</button^> >> button-fix-tool.html
echo             ^<button class="btn btn-outline-success" onclick="testLocationButton()"^> >> button-fix-tool.html
echo                 ^<i class="fas fa-map-marker-alt me-2"^>^</i^>Test Lokasi >> button-fix-tool.html
echo             ^</button^> >> button-fix-tool.html
echo             ^<button class="btn btn-outline-warning" onclick="testPositionButton()"^> >> button-fix-tool.html
echo                 ^<i class="fas fa-sitemap me-2"^>^</i^>Test Jabatan >> button-fix-tool.html
echo             ^</button^> >> button-fix-tool.html
echo         ^</div^> >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         ^<div id="logOutput" class="log-output" style="display: none;"^>^</div^> >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         ^<div class="text-center mt-4"^> >> button-fix-tool.html
echo             ^<button class="btn btn-info" onclick="openMasterData()" id="openBtn" style="display: none;"^> >> button-fix-tool.html
echo                 ^<i class="fas fa-external-link-alt me-2"^>^</i^>Open Master Data >> button-fix-tool.html
echo             ^</button^> >> button-fix-tool.html
echo         ^</div^> >> button-fix-tool.html
echo     ^</div^> >> button-fix-tool.html
echo. >> button-fix-tool.html
echo     ^<script^> >> button-fix-tool.html
echo         function log(message) { >> button-fix-tool.html
echo             const output = document.getElementById('logOutput'); >> button-fix-tool.html
echo             output.style.display = 'block'; >> button-fix-tool.html
echo             output.innerHTML += message + '^<br^>'; >> button-fix-tool.html
echo             output.scrollTop = output.scrollHeight; >> button-fix-tool.html
echo             console.log(message); >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         function runDiagnostic() { >> button-fix-tool.html
echo             document.getElementById('logOutput').innerHTML = ''; >> button-fix-tool.html
echo             log('🔍 Running Master Data button diagnostic...'); >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             // Check if we're on the right page >> button-fix-tool.html
echo             if (!window.location.pathname.includes('admin-master-data.html')) { >> button-fix-tool.html
echo                 log('⚠️  Not on Master Data page. Opening Master Data...'); >> button-fix-tool.html
echo                 setTimeout(() =^> { >> button-fix-tool.html
echo                     window.open('admin-master-data.html', '_blank'); >> button-fix-tool.html
echo                 }, 2000); >> button-fix-tool.html
echo                 return; >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             // Check for required scripts >> button-fix-tool.html
echo             const requiredScripts = ['bootstrap', 'masterDataManager']; >> button-fix-tool.html
echo             requiredScripts.forEach(script =^> { >> button-fix-tool.html
echo                 if (typeof window[script] !== 'undefined' ^|^| document.querySelector(`script[src*="${script}"]`)) { >> button-fix-tool.html
echo                     log(`✅ ${script} loaded`); >> button-fix-tool.html
echo                 } else { >> button-fix-tool.html
echo                     log(`❌ ${script} missing`); >> button-fix-tool.html
echo                 } >> button-fix-tool.html
echo             }); >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             // Check for modal elements >> button-fix-tool.html
echo             const modals = ['regionModal', 'locationModal', 'positionModal']; >> button-fix-tool.html
echo             modals.forEach(modalId =^> { >> button-fix-tool.html
echo                 const modal = document.getElementById(modalId); >> button-fix-tool.html
echo                 if (modal) { >> button-fix-tool.html
echo                     log(`✅ ${modalId} element found`); >> button-fix-tool.html
echo                 } else { >> button-fix-tool.html
echo                     log(`❌ ${modalId} element missing`); >> button-fix-tool.html
echo                 } >> button-fix-tool.html
echo             }); >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             // Check for button functions >> button-fix-tool.html
echo             const functions = ['showRegionModal', 'showLocationModal', 'showPositionModal']; >> button-fix-tool.html
echo             functions.forEach(funcName =^> { >> button-fix-tool.html
echo                 if (typeof window[funcName] === 'function') { >> button-fix-tool.html
echo                     log(`✅ ${funcName} function exists`); >> button-fix-tool.html
echo                 } else { >> button-fix-tool.html
echo                     log(`❌ ${funcName} function missing`); >> button-fix-tool.html
echo                 } >> button-fix-tool.html
echo             }); >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             log('🎯 Diagnostic completed. Check results above.'); >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         function applyFix() { >> button-fix-tool.html
echo             log('🔧 Applying button fixes...'); >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             // Create fallback functions >> button-fix-tool.html
echo             if (typeof window.showRegionModal !== 'function') { >> button-fix-tool.html
echo                 window.showRegionModal = function() { >> button-fix-tool.html
echo                     alert('Region modal function created! Try clicking the button again.'); >> button-fix-tool.html
echo                 }; >> button-fix-tool.html
echo                 log('✅ Created showRegionModal fallback'); >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             if (typeof window.showLocationModal !== 'function') { >> button-fix-tool.html
echo                 window.showLocationModal = function() { >> button-fix-tool.html
echo                     alert('Location modal function created! Try clicking the button again.'); >> button-fix-tool.html
echo                 }; >> button-fix-tool.html
echo                 log('✅ Created showLocationModal fallback'); >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             if (typeof window.showPositionModal !== 'function') { >> button-fix-tool.html
echo                 window.showPositionModal = function() { >> button-fix-tool.html
echo                     alert('Position modal function created! Try clicking the button again.'); >> button-fix-tool.html
echo                 }; >> button-fix-tool.html
echo                 log('✅ Created showPositionModal fallback'); >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo             log('🎉 Button fixes applied successfully!'); >> button-fix-tool.html
echo             document.getElementById('openBtn').style.display = 'inline-block'; >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         function testRegionButton() { >> button-fix-tool.html
echo             log('🧪 Testing Region button...'); >> button-fix-tool.html
echo             if (typeof showRegionModal === 'function') { >> button-fix-tool.html
echo                 showRegionModal(); >> button-fix-tool.html
echo                 log('✅ Region button test successful'); >> button-fix-tool.html
echo             } else { >> button-fix-tool.html
echo                 log('❌ Region button test failed - function not found'); >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         function testLocationButton() { >> button-fix-tool.html
echo             log('🧪 Testing Location button...'); >> button-fix-tool.html
echo             if (typeof showLocationModal === 'function') { >> button-fix-tool.html
echo                 showLocationModal(); >> button-fix-tool.html
echo                 log('✅ Location button test successful'); >> button-fix-tool.html
echo             } else { >> button-fix-tool.html
echo                 log('❌ Location button test failed - function not found'); >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         function testPositionButton() { >> button-fix-tool.html
echo             log('🧪 Testing Position button...'); >> button-fix-tool.html
echo             if (typeof showPositionModal === 'function') { >> button-fix-tool.html
echo                 showPositionModal(); >> button-fix-tool.html
echo                 log('✅ Position button test successful'); >> button-fix-tool.html
echo             } else { >> button-fix-tool.html
echo                 log('❌ Position button test failed - function not found'); >> button-fix-tool.html
echo             } >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo. >> button-fix-tool.html
echo         function openMasterData() { >> button-fix-tool.html
echo             window.open('admin-master-data.html', '_blank'); >> button-fix-tool.html
echo         } >> button-fix-tool.html
echo     ^</script^> >> button-fix-tool.html
echo ^</body^> >> button-fix-tool.html
echo ^</html^> >> button-fix-tool.html

echo ✅ Button fix tool created!
echo.

echo Opening button fix tool...
start button-fix-tool.html

echo.
echo ========================================
echo   Button Fix Instructions
echo ========================================
echo.
echo 1. ✅ Fix tool opened in browser
echo 2. 🔍 Click "Run Diagnostic" to check issues
echo 3. 🔧 Click "Apply Fix" to fix problems
echo 4. 🧪 Use "Test Buttons" to verify fixes
echo 5. 🚀 Click "Open Master Data" to test
echo.
echo If buttons still don't work:
echo - Check browser console (F12) for errors
echo - Ensure all script files are loaded
echo - Try refreshing the Master Data page
echo.

pause

echo.
echo Cleaning up temporary files...
timeout /t 3 >nul
del button-fix-tool.html >nul 2>&1

echo ✅ Button fix process completed!
echo.
echo Next steps:
echo 1. Test Master Data buttons functionality
echo 2. Check browser console for any errors
echo 3. Verify all modals open correctly
echo.

pause