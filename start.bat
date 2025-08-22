@echo off
echo Starting POS Application...

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found! Install from https://nodejs.org/
    pause
    exit /b 1
)

cd /d "%~dp0"

echo Installing dependencies...
npm install

echo Building application...
npx ng build

echo Starting file server...
start cmd /k "node local-server.js"

echo Starting Angular server...
start cmd /k "npx ng serve --port 4200"

echo Servers starting... Opening browser in 10 seconds...
timeout /t 10 /nobreak >nul
start http://localhost:4200

echo Done! Close the server windows to stop.
pause