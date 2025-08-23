require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Load paths from environment variables
let imageFolderPath = process.env.IMAGE_FOLDER || 'C:\\Users\\sandi\\Desktop\\image';
let videoFolderPath = process.env.VIDEO_FOLDER || 'C:\\Users\\sandi\\Desktop\\video';

// Static paths   ayan system
// let imageFolderPath = 'C:\\Users\\giris\\OneDrive\\Desktop\\image';
// let videoFolderPath = 'C:\\Users\\giris\\OneDrive\\Desktop\\video';




// Dynamic static file serving
app.use('/images', (req, res, next) => {
  express.static(imageFolderPath)(req, res, next);
});

app.use('/videos', (req, res, next) => {
  express.static(videoFolderPath)(req, res, next);
});

// Endpoint to update folder paths
app.post('/api/set-folders', express.json(), (req, res) => {
  console.log('Received folder update request:', req.body);
  const { imageFolder, videoFolder } = req.body;
  if (imageFolder) {
    imageFolderPath = imageFolder;
    console.log('Updated image folder to:', imageFolderPath);
  }
  if (videoFolder) {
    videoFolderPath = videoFolder;
    console.log('Updated video folder to:', videoFolderPath);
  }

  console.log('Current paths - Image:', imageFolderPath, 'Video:', videoFolderPath);
  res.json({ success: true, imageFolderPath, videoFolderPath });
});

// API endpoint to search for files
app.get('/api/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  const result = { image: null, video: null };

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'];

  console.log(`Searching for: ${searchTerm}`);
  console.log(`Image folder: ${imageFolderPath}`);
  console.log(`Video folder: ${videoFolderPath}`);

  // Check if folders exist
  if (!fs.existsSync(imageFolderPath)) {
    console.log('Image folder does not exist!');
  }
  if (!fs.existsSync(videoFolderPath)) {
    console.log('Video folder does not exist!');
  }

  // Search for image
  for (const ext of imageExtensions) {
    const imagePath = path.join(imageFolderPath, `${searchTerm}${ext}`);
    console.log(`Checking image: ${imagePath}`);
    if (fs.existsSync(imagePath)) {
      result.image = `http://localhost:${PORT}/images/${searchTerm}${ext}`;
      console.log(`Found image: ${result.image}`);
      break;
    }
  }

  // Search for video
  for (const ext of videoExtensions) {
    const videoPath = path.join(videoFolderPath, `${searchTerm}${ext}`);
    console.log(`Checking video: ${videoPath}`);
    if (fs.existsSync(videoPath)) {
      result.video = `http://localhost:${PORT}/videos/${searchTerm}${ext}`;
      console.log(`Found video: ${result.video}`);
      break;
    }
  }

  console.log(`Result:`, result);
  res.json(result);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Local file server running on http://localhost:${PORT}`);
  console.log(`Image folder: ${imageFolderPath}`);
  console.log(`Video folder: ${videoFolderPath}`);
});