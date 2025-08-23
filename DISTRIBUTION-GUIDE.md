# POS Application - Distribution Guide

## Files to Copy to User's Computer:

```
POS-Application/
├── start.bat                    ← Application launcher
├── local-server.js             ← File server
├── package.json                ← Dependencies
├── .env                        ← Configuration (EDIT PATHS HERE)
├── README-DISTRIBUTION.md      ← User instructions
├── node_modules/               ← All packages (entire folder)
├── dist/                       ← Built app (entire folder)
│   └── my-angular-app/
│       ├── assets/
│       ├── index.html
│       ├── main.*.js
│       └── runtime.*.js
└── assets/                     ← Fallback images (optional)
    ├── no image.png
    ├── no video.png
    ├── fallback-image.jpg
    └── fallback-video.mp4
```

## User Setup Instructions:

### Step 1: Edit Configuration
Open `.env` file and change paths:
```
IMAGE_FOLDER=C:\Users\[USERNAME]\Desktop\image
VIDEO_FOLDER=C:\Users\[USERNAME]\Desktop\video
```

### Step 2: Create Folders
Create these folders on desktop:
- `C:\Users\[USERNAME]\Desktop\image`
- `C:\Users\[USERNAME]\Desktop\video`

### Step 3: Add Content
- Put product images (.jpg, .png) in image folder
- Put product videos (.mp4) in video folder
- Name files with product IDs (e.g., `12345678.jpg`, `12345678.mp4`)

### Step 4: Run Application
Double-click `start.bat`

## What Happens:
1. File server starts on port 3001
2. Web server starts on port 4200  
3. Browser opens automatically
4. Ready to scan barcodes!

## Requirements:
- Windows OS
- Node.js (included in node_modules)
- Modern web browser

## Troubleshooting:
- If ports are busy, the script will kill existing processes
- If browser doesn't open, go to http://localhost:4200
- Check .env file paths are correct
- Ensure image/video folders exist