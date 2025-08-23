@echo off
echo Starting POS Application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Kill existing processes on ports 3001 and 4200
echo Stopping existing servers...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":4200"') do taskkill /f /pid %%a >nul 2>&1

REM Start file server
echo Starting file server...
start /B "File Server" node local-server.js

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Start a simple HTTP server for the built Angular app
echo Starting web server...
start /B "Web Server" node node_modules/http-server/bin/http-server dist/my-angular-app -p 4200 -c-1

REM Wait for servers to start
timeout /t 3 /nobreak >nul

REM Open browser
echo Opening application...
start http://localhost:4200

echo.
echo Application started successfully!
echo File server: http://localhost:3001
echo Web app: http://localhost:4200
echo.
echo Press any key to stop servers...
pause >nul

REM Stop servers
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":4200"') do taskkill /f /pid %%a >nul 2>&1
echo Servers stopped.