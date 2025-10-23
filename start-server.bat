@echo off
echo ========================================
echo   LeaveFlow - Starting Server
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Node.js is not installed!
    echo The application will work in demo mode only.
    echo To enable full database functionality, install Node.js from: https://nodejs.org/
    echo.
    echo Press any key to continue in demo mode...
    pause >nul
    echo.
    echo Opening demo application...
    start demo-admin-full.html
    exit /b 0
)

echo Node.js found! Version:
node --version
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    echo Running in demo mode instead...
    start demo-admin-full.html
    exit /b 1
)

echo.
echo Setting up database...
node setup.js
if %errorlevel% neq 0 (
    echo ERROR: Failed to setup database!
    echo Running in demo mode instead...
    start demo-admin-full.html
    exit /b 1
)

echo.
echo ========================================
echo   Server starting on port 3000
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:3000 (login as admin@company.com)
echo Master Data: Open demo-admin-masterdata.html
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000
npm start