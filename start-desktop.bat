@echo off
echo ========================================
echo    POS Desktop Application
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

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)

REM Check if app is built
if not exist "dist" (
    echo Building application...
    npm run build
    if errorlevel 1 (
        echo ERROR: Failed to build application!
        pause
        exit /b 1
    )
)

echo Starting POS Desktop Application...
npm run electron