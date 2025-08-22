Write-Host "🚀 Starting POS Application Setup..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 Node.js not found!" -ForegroundColor Red
    Write-Host "Please download and install Node.js from https://nodejs.org/"
    Read-Host "Press Enter to exit"
    exit 1
}

# Navigate to script directory
Set-Location $PSScriptRoot

# Check project's Angular version and install matching CLI if needed
Write-Host "🔍 Checking Angular CLI compatibility..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$projectNgVersion = $packageJson.devDependencies.'@angular/cli'

if ($projectNgVersion) {
    Write-Host "📦 Project requires Angular CLI $projectNgVersion" -ForegroundColor Cyan
    npm list -g "@angular/cli@$projectNgVersion" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "🔧 Installing matching Angular CLI version..." -ForegroundColor Yellow
        npm install -g "@angular/cli@$projectNgVersion"
    }
}

# Install dependencies
Write-Host "📋 Installing project dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Build application
Write-Host "🏗️ Building the application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    npx ng build
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Kill existing processes on ports
Write-Host "🔄 Checking for existing processes on ports..." -ForegroundColor Yellow
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

# Start servers
Write-Host "🖥️ Starting local file server..." -ForegroundColor Green
Start-Process -FilePath "cmd" -ArgumentList "/k", "node local-server.js" -WindowStyle Normal

Write-Host "🌐 Starting Angular development server..." -ForegroundColor Green
Start-Process -FilePath "cmd" -ArgumentList "/k", "npx ng serve --port 4200 --host 0.0.0.0" -WindowStyle Normal

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "🌍 Application will be available at: http://localhost:4200" -ForegroundColor Cyan
Write-Host "📁 File server will be available at: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Waiting 10 seconds for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Start-Process "http://localhost:4200"

Write-Host ""
Write-Host "Both servers are now running in separate windows." -ForegroundColor Green
Write-Host "Close those windows to stop the servers." -ForegroundColor Yellow
Read-Host "Press Enter to exit"