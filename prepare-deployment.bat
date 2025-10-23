@echo off
echo ========================================
echo   LeaveFlow - Prepare for Online Deployment
echo ========================================
echo.

echo Creating deployment folder...
if not exist "leaveflow-online" mkdir "leaveflow-online"

echo Copying essential files for online deployment...

echo Copying main files...
copy "index.html" "leaveflow-online\" >nul 2>&1
copy "demo-admin-full.html" "leaveflow-online\" >nul 2>&1
copy "demo-admin-masterdata.html" "leaveflow-online\" >nul 2>&1
copy "demo-modern.html" "leaveflow-online\" >nul 2>&1
copy "demo-supervisor-modern.html" "leaveflow-online\" >nul 2>&1

echo Copying PWA files...
copy "manifest.json" "leaveflow-online\" >nul 2>&1
copy "sw.js" "leaveflow-online\" >nul 2>&1

echo Copying deployment configs...
copy "netlify.toml" "leaveflow-online\" >nul 2>&1
copy "vercel.json" "leaveflow-online\" >nul 2>&1

echo Copying documentation...
copy "README.md" "leaveflow-online\" >nul 2>&1
copy "DEPLOY-STEPS.md" "leaveflow-online\" >nul 2>&1

echo Creating .gitignore...
echo node_modules/ > "leaveflow-online\.gitignore"
echo .env >> "leaveflow-online\.gitignore"
echo *.log >> "leaveflow-online\.gitignore"
echo .DS_Store >> "leaveflow-online\.gitignore"

echo.
echo ========================================
echo   Deployment files ready!
echo ========================================
echo.
echo Files copied to: leaveflow-online\
echo.
echo Next steps:
echo 1. Upload 'leaveflow-online' folder to GitHub
echo 2. Enable GitHub Pages in repository settings
echo 3. Or drag 'leaveflow-online' folder to netlify.com
echo.
echo Your app will be online in minutes!
echo.
pause