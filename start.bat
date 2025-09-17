@echo off
echo ========================================
echo    POS Application - Windows Setup
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

echo Node.js found: 
node --version

REM Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
) else (
    echo Dependencies already installed.
)

echo.
echo Starting POS Application...
echo File server will run on: http://localhost:3001
echo Web app will run on: http://localhost:4200
echo.
echo The application will open automatically in your browser.
echo Press Ctrl+C to stop the servers.
echo.

REM Start the application
npm start