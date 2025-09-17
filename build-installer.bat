@echo off
echo ========================================
echo    Building POS Desktop Application
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Installing dependencies...
npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Building Angular application...
npm run build
if errorlevel 1 (
    echo ERROR: Failed to build Angular app!
    pause
    exit /b 1
)

echo.
echo Creating Windows installer...
npm run build-desktop
if errorlevel 1 (
    echo ERROR: Failed to create installer!
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Build Complete!
echo ========================================
echo.
echo Installer created in: release/
echo Look for: POS Application Setup.exe
echo.
pause