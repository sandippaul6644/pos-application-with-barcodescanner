@echo off
echo 🚀 Starting POS Application Setup...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Node.js not found!
    echo Please download and install Node.js from https://nodejs.org/
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo ✅ Node.js found

REM Navigate to script directory
cd /d "%~dp0"

REM Check project's Angular version and install matching CLI if needed
echo 🔍 Checking Angular CLI compatibility...
for /f "tokens=2 delims=\"" %%i in ('findstr /r "@angular/cli" package.json') do set PROJECT_NG_VERSION=%%i
if defined PROJECT_NG_VERSION (
    echo 📦 Project requires Angular CLI %PROJECT_NG_VERSION%
    npm list -g @angular/cli@%PROJECT_NG_VERSION% >nul 2>&1
    if %errorlevel% neq 0 (
        echo 🔧 Installing matching Angular CLI version...
        npm install -g @angular/cli@%PROJECT_NG_VERSION%
    )
)

echo 📋 Installing project dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo 🏗️ Building the application...
npm run build 2>nul || npx ng build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo 🔄 Checking for existing processes on ports...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":4200" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo 🖥️ Starting local file server...
start "File Server" cmd /k "node local-server.js"

echo 🌐 Starting Angular development server...
start "Angular Dev" cmd /k "npm run start 2>nul || npx ng serve --port 4200 --host 0.0.0.0"

echo ✅ Setup complete!
echo 🌍 Application will be available at: http://localhost:4200
echo 📁 File server will be available at: http://localhost:3001
echo.
echo Waiting 10 seconds for servers to start...
timeout /t 10 /nobreak >nul

start http://localhost:4200

echo.
echo Both servers are now running in separate windows.
echo Close those windows to stop the servers.
pause