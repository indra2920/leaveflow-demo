@echo off
echo ========================================
echo   LeaveFlow - Clear All Dummy Data
echo ========================================
echo.

echo WARNING: This will remove ALL dummy data!
echo This includes:
echo - All sample employees
echo - All demo regions and locations
echo - All test leave requests
echo - All localStorage data
echo.

set /p confirm="Are you sure you want to continue? (y/N): "
if /i not "%confirm%"=="y" (
    echo Operation cancelled.
    pause
    exit /b 0
)

echo.
echo Starting data cleanup...
echo.

echo 1. Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Node.js not found. Database cleanup will be skipped.
    echo Only localStorage cleanup will be performed.
    goto :localStorage_only
)

echo Node.js found!
echo.

echo 2. Clearing database dummy data...
node clear-database.js
if %errorlevel% neq 0 (
    echo ERROR: Database cleanup failed!
    echo Continuing with localStorage cleanup...
)

:localStorage_only
echo.
echo 3. Creating localStorage cleanup page...

echo ^<!DOCTYPE html^> > clear-storage.html
echo ^<html^> >> clear-storage.html
echo ^<head^> >> clear-storage.html
echo     ^<title^>Clear LeaveFlow Data^</title^> >> clear-storage.html
echo     ^<script src="clear-dummy-data.js"^>^</script^> >> clear-storage.html
echo ^</head^> >> clear-storage.html
echo ^<body^> >> clear-storage.html
echo     ^<h1^>Clearing LeaveFlow Data...^</h1^> >> clear-storage.html
echo     ^<script^> >> clear-storage.html
echo         clearAllDummyData(); >> clear-storage.html
echo         setupFreshInstallation(); >> clear-storage.html
echo         createInitialAdmin(); >> clear-storage.html
echo         document.body.innerHTML = '^<h1^>Data Cleared Successfully!^</h1^>^<p^>You can now close this window and refresh your LeaveFlow application.^</p^>'; >> clear-storage.html
echo     ^</script^> >> clear-storage.html
echo ^</body^> >> clear-storage.html
echo ^</html^> >> clear-storage.html

echo 4. Opening localStorage cleanup...
start clear-storage.html

echo.
echo 5. Cleaning up temporary files...
timeout /t 3 >nul
del clear-storage.html >nul 2>&1

echo.
echo ========================================
echo   Data Cleanup Completed!
echo ========================================
echo.
echo What was cleared:
echo ✅ Database dummy data (if Node.js available)
echo ✅ localStorage dummy data
echo ✅ Demo employees and sample data
echo ✅ Test leave requests and approvals
echo.
echo What was created:
echo ✅ Fresh database structure
echo ✅ Initial admin user (admin@yourcompany.com)
echo ✅ Minimal regions and locations
echo ✅ Basic position hierarchy
echo.
echo Next Steps:
echo 1. Change admin credentials immediately
echo 2. Update company information
echo 3. Add your real employees
echo 4. Configure system settings
echo.
echo Your LeaveFlow is now ready for real data!
echo.
pause