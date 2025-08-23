const fs = require('fs');
const path = require('path');

console.log('Creating shareable package...');

// Create share directory
const shareDir = './share';
if (!fs.existsSync(shareDir)) {
  fs.mkdirSync(shareDir);
}

// Build the application first
const { execSync } = require('child_process');
try {
  console.log('Building application...');
  execSync('ng build --configuration production', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Files to copy
const filesToCopy = [
  'start.bat',
  'local-server.js',
  'package.json',
  '.env',
  'README-DISTRIBUTION.md',
  'DISTRIBUTION-GUIDE.md'
];

// Directories to copy
const dirsToCopy = [
  'dist',
  'node_modules',
  'assets'
];

// Copy files
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(shareDir, file));
    console.log(`✓ Copied ${file}`);
  }
});

// Copy directories
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

dirsToCopy.forEach(dir => {
  if (fs.existsSync(dir)) {
    copyDir(dir, path.join(shareDir, dir));
    console.log(`✓ Copied ${dir}/`);
  }
});

console.log('\n🎉 Shareable package created in ./share/ folder');
console.log('📦 Ready to distribute!');