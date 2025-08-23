# POS Application - Distribution Package

## Quick Start

1. **Double-click `start.bat`** to run the application
2. The application will automatically:
   - Start the file server
   - Start the web server
   - Open your browser to http://localhost:4200

## Configuration

Edit the `.env` file to change folder paths:
```
IMAGE_FOLDER=C:\Users\sandi\Desktop\image
VIDEO_FOLDER=C:\Users\sandi\Desktop\video
```

## Requirements

- Node.js (included in package)
- Windows OS

## Files to Share

**Essential files only:**
- `start.bat` - Application launcher
- `local-server.js` - File server
- `package.json` - Dependencies
- `node_modules/` - Required packages
- `dist/` - Built application
- `.env` - Configuration
- `README-DISTRIBUTION.md` - This file

**DO NOT SHARE:**
- `src/` folder (source code)
- `angular.json`
- `tsconfig.json`
- Development files

## Usage

1. Place your product images in the IMAGE_FOLDER
2. Place your product videos in the VIDEO_FOLDER
3. Run `start.bat`
4. Scan barcodes or type product IDs to search