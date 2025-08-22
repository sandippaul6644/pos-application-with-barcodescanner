# POS Application Setup Guide

## 🚀 Quick Start (Fresh Laptop)

### Windows Setup
```cmd
setup.bat
```

### Linux/Mac Setup
```bash
./setup.sh
```

This single script will:
1. ✅ Install Node.js (if not installed)
2. ✅ Install Angular CLI globally
3. ✅ Install all project dependencies
4. ✅ Build the application
5. ✅ Start local file server (port 3001)
6. ✅ Start Angular dev server (port 4200)
7. ✅ Open application at http://localhost:4200

## 📁 Initial Setup

When you first run the application, you'll see a folder selection dialog:

1. **Select Image Folder**: Choose the folder containing your product images
2. **Select Video Folder**: Choose the folder containing your product videos
3. **Click Save & Continue**: Settings will be saved locally

## 🔧 Manual Setup (Alternative)

### Windows Manual Setup:
```cmd
REM Download Node.js from https://nodejs.org/
REM Install Angular CLI
npm install -g @angular/cli

REM Install dependencies
npm install

REM Start file server (Command Prompt 1)
node local-server.js

REM Start Angular app (Command Prompt 2)
ng serve --port 4200 --host 0.0.0.0
```

### Linux/Mac Manual Setup:
```bash
# Install Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Angular CLI
sudo npm install -g @angular/cli

# Install dependencies
npm install

# Start file server (Terminal 1)
node local-server.js

# Start Angular app (Terminal 2)
ng serve --port 4200 --host 0.0.0.0
```

## 📱 Features

- **Manual Search**: Type barcode/product ID and press Enter
- **Barcode Scanner**: Automatically detects barcode scanner input
- **Image/Video Toggle**: After search, use arrow button to switch views
- **Folder Configuration**: Set custom image/video folder locations

## 🗂️ File Structure

```
my-angular-app/
├── setup.sh           # One-click setup script
├── local-server.js     # File server for assets
├── src/app/           # Angular application
└── assets/            # Fallback images/videos
```

## 🔧 Configuration

- **Image Folder**: Stored in localStorage as 'pos-image-folder'
- **Video Folder**: Stored in localStorage as 'pos-video-folder'
- **File Server**: Runs on http://localhost:3001
- **Angular App**: Runs on http://localhost:4200

## 🛠️ Troubleshooting

### Windows:
1. **Node.js Missing**: Download from https://nodejs.org/
2. **Port Conflict**: Change ports in setup.bat if needed
3. **Folder Access**: Ensure selected folders are readable
4. **Clear Settings**: Delete localStorage to reset folder selection

### Linux/Mac:
1. **Permission Error**: Run `chmod +x setup.sh`
2. **Port Conflict**: Change ports in setup.sh if needed
3. **Folder Access**: Ensure selected folders are readable
4. **Clear Settings**: Delete localStorage to reset folder selection

## 🎯 Usage

### Windows:
1. Run `setup.bat`
2. Select image and video folders
3. Scan barcodes or type manually
4. View products with image/video toggle

### Linux/Mac:
1. Run `./setup.sh`
2. Select image and video folders
3. Scan barcodes or type manually
4. View products with image/video toggle