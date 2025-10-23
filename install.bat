@echo off
echo ========================================
echo   Aplikasi Pengajuan Libur/Offsite
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo Node.js found!
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Setting up database...
node setup.js
if %errorlevel% neq 0 (
    echo ERROR: Failed to setup database!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup completed successfully!
echo ========================================
echo.
echo To start the application, run:
echo   npm start
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo Demo login credentials:
echo   admin@company.com / password123
echo   staff@company.com / password123
echo.
pause