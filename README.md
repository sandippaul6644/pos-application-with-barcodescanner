# POS Application - Windows Setup

## 🚀 Quick Start

### Requirements
- Windows OS
- Node.js (Download from https://nodejs.org/)

### Installation & Run
1. Clone this repository
2. Double-click `start.bat`

That's it! The batch file will:
- ✅ Check if Node.js is installed
- ✅ Install dependencies automatically (if needed)
- ✅ Start the file server (port 3001)
- ✅ Start the Angular app (port 4200)
- ✅ Open the application in your default browser

## 📱 Features

- **Manual Search**: Type barcode/product ID and press Enter
- **Barcode Scanner**: Automatically detects barcode scanner input
- **Image/Video Toggle**: After search, use arrow button to switch views
- **Folder Configuration**: Set custom image/video folder locations

## 🗂️ File Structure

```
pos-application/
├── src/app/           # Angular application
├── assets/            # Fallback images/videos
├── local-server.js    # File server for assets
├── start.bat          # One-click startup script
└── package.json       # Dependencies
```

## 🔧 Configuration

- **Image Folder**: Stored in localStorage as 'pos-image-folder'
- **Video Folder**: Stored in localStorage as 'pos-video-folder'
- **File Server**: http://localhost:3001
- **Angular App**: http://localhost:4200

## 🛠️ Troubleshooting

1. **Node.js Missing**: Download from https://nodejs.org/
2. **Port Conflict**: Close other applications using ports 3001 or 4200
3. **Folder Access**: Ensure selected folders are readable
4. **Clear Settings**: Delete localStorage to reset folder selection

## 🎯 Usage

1. Run `start.bat`
2. Select image and video folders when prompted
3. Scan barcodes or type manually
4. View products with image/video toggle

## 🔄 Development

- **Start**: `start.bat` or `npm start`
- **Build**: `npm run build`