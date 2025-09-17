# POS Desktop Application - Windows

## 🚀 Quick Start Options

### Option 1: Web Version (Browser)
1. Clone this repository
2. Double-click `start.bat`
3. Application opens in browser

### Option 2: Desktop Application
1. Clone this repository
2. Double-click `start-desktop.bat`
3. Application runs as desktop app

### Option 3: Create Windows Installer
1. Clone this repository
2. Double-click `build-installer.bat`
3. Find installer in `release/` folder
4. Install on any Windows PC

## 📱 Features

- **Manual Search**: Type barcode/product ID and press Enter
- **Barcode Scanner**: Automatically detects barcode scanner input
- **Image/Video Toggle**: After search, use arrow button to switch views
- **Folder Configuration**: Set custom image/video folder locations
- **Desktop App**: Runs without browser, creates desktop shortcut

## 🗂️ File Structure

```
pos-application/
├── src/app/              # Angular application
├── assets/               # Fallback images/videos
├── local-server.js       # File server for assets
├── electron-main.js      # Desktop app main process
├── start.bat            # Web version launcher
├── start-desktop.bat    # Desktop app launcher
├── build-installer.bat  # Creates Windows installer
└── package.json         # Dependencies
```

## 🔧 Configuration

- **Image Folder**: Stored in localStorage as 'pos-image-folder'
- **Video Folder**: Stored in localStorage as 'pos-video-folder'
- **File Server**: http://localhost:3001
- **Desktop App**: Standalone application

## 🛠️ Troubleshooting

1. **Node.js Missing**: Download from https://nodejs.org/
2. **Build Errors**: Run `npm install` first
3. **Folder Access**: Ensure selected folders are readable
4. **Clear Settings**: Delete localStorage to reset folder selection

## 🎯 Usage

### Web Version:
1. Run `start.bat`
2. Select image and video folders when prompted
3. Scan barcodes or type manually

### Desktop Version:
1. Run `start-desktop.bat` OR install from `release/` folder
2. Application runs as standalone desktop app
3. Creates desktop shortcut after installation

## 🔄 Development

- **Web Start**: `start.bat` or `npm start`
- **Desktop Start**: `start-desktop.bat` or `npm run electron`
- **Build**: `npm run build`
- **Create Installer**: `build-installer.bat` or `npm run dist`