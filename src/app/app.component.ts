import { Component } from '@angular/core';
import { FileService } from './file.service';
import { DesktopFileService } from './desktop-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  message = '';
  showDialog = true;
  videoSrc = '/assets/fallback-video.mp4';
  imageSrc = '/assets/fallback-image.jpg';
  searchTerm = '';
  showImage = true;
  hasVideo = false;
  hasSearched = false;
  private barcodeBuffer = '';
  private barcodeTimeout: any;
  showFolderDialog = false;
  imageFolder = '';
  videoFolder = '';

  constructor(
    private fileService: FileService,
    private desktopFileService: DesktopFileService
  ) {
    this.checkFolderSettings();
    this.initializeBarcodeScanner();
  }

  private async checkFolderSettings() {
    // Always show folder dialog on startup
    this.showFolderDialog = true;
    this.showDialog = false; // Hide fullscreen dialog
    
    // Start with empty values so user must enter full paths
    this.imageFolder = '';
    this.videoFolder = '';
  }

  selectImageFolder() {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        // Use the full system path if available, otherwise construct from webkitRelativePath
        if (file.path) {
          // Electron/desktop - use full path and remove filename
          this.imageFolder = file.path.substring(0, file.path.lastIndexOf('\\') || file.path.lastIndexOf('/'));
        } else {
          // Web browser - get folder name from webkitRelativePath
          const relativePath = file.webkitRelativePath;
          const folderName = relativePath.split('/')[0];
          this.imageFolder = folderName;
        }
        console.log('Selected image folder:', this.imageFolder);
      }
    };
    input.click();
  }

  selectVideoFolder() {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        // Use the full system path if available, otherwise construct from webkitRelativePath
        if (file.path) {
          // Electron/desktop - use full path and remove filename
          this.videoFolder = file.path.substring(0, file.path.lastIndexOf('\\') || file.path.lastIndexOf('/'));
        } else {
          // Web browser - get folder name from webkitRelativePath
          const relativePath = file.webkitRelativePath;
          const folderName = relativePath.split('/')[0];
          this.videoFolder = folderName;
        }
        console.log('Selected video folder:', this.videoFolder);
      }
    };
    input.click();
  }

  async saveFolderSettings() {
    console.log('Saving folders:', this.imageFolder, this.videoFolder);
    if (this.imageFolder && this.videoFolder) {
      localStorage.setItem('pos-image-folder', this.imageFolder);
      localStorage.setItem('pos-video-folder', this.videoFolder);
      
      // Send folder paths to local server with retry
      await this.updateServerFolders();
      
      this.showFolderDialog = false;
      this.showDialog = false; // Don't show fullscreen dialog
    } else {
      alert('Please select both image and video folders');
    }
  }

  private async updateServerFolders(retries = 3) {
    console.log('Sending to server:', this.imageFolder, this.videoFolder);
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch('http://localhost:3001/api/set-folders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageFolder: this.imageFolder,
            videoFolder: this.videoFolder
          })
        });
        
        if (response.ok) {
          console.log('Folders updated on server');
          return;
        }
      } catch (error) {
        console.log('Server update failed:', error);
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
  }

  private initializeBarcodeScanner() {
    document.addEventListener('keydown', (event) => {
      // Ignore if user is typing in input field
      if (event.target instanceof HTMLInputElement) {
        return;
      }

      // Clear previous timeout
      if (this.barcodeTimeout) {
        clearTimeout(this.barcodeTimeout);
      }

      // Add character to buffer (ignore special keys)
      if (event.key.length === 1) {
        this.barcodeBuffer += event.key;
      }

      // Set timeout to process barcode (barcode scanners are fast)
      this.barcodeTimeout = setTimeout(() => {
        if (this.barcodeBuffer.length > 3) { // Minimum barcode length
          this.processBarcodeInput(this.barcodeBuffer);
        }
        this.barcodeBuffer = '';
      }, 100); // 100ms timeout for barcode completion
    });
  }

  private async processBarcodeInput(barcode: string) {
    console.log('Barcode scanned:', barcode);
    this.searchTerm = barcode;
    await this.onSearch();
  }

  showMessage() {
    this.message = 'Hello from Angular!';
  }

  async onSearch() {
    if (!this.searchTerm.trim()) {
      // Reset to fallback when search is empty
      this.imageSrc = '/assets/fallback-image.jpg';
      this.videoSrc = '/assets/fallback-video.mp4';
      this.showImage = true;
      this.hasVideo = false;
      return;
    }

    console.log('Searching for:', this.searchTerm.trim());
    
    // Try desktop file service first, then fallback to web service
    const assets = await this.desktopFileService.searchAssets(this.searchTerm.trim());
    
    console.log('Search results:', assets);
    
    // Update image source
    if (assets.image) {
      this.imageSrc = assets.image;
    } else {
      this.imageSrc = '/assets/fallback-image.jpg';
    }
    
    // Update video source and check if video exists
    if (assets.video) {
      this.videoSrc = assets.video;
      this.hasVideo = true;
    } else {
      this.videoSrc = '/assets/fallback-video.mp4';
      this.hasVideo = false;
    }
    
    // Always show image first after search
    this.showImage = true;
    this.hasSearched = true;
  }

  onClear() {
    this.searchTerm = '';
    this.imageSrc = '/assets/fallback-image.jpg';
    this.videoSrc = '/assets/fallback-video.mp4';
    this.showImage = true;
    this.hasVideo = false;
    this.hasSearched = false;
  }

  closeDialog() {
    this.showDialog = false;
    this.playVideo();
  }

  goFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    this.showDialog = false;
    this.playVideo();
  }

  onVideoError() {
    console.log('Video error, trying fallback URL');
    this.videoSrc = 'http://65.109.4.213:8000/api/V1/video/fallBack';
    
    // If fallback also fails, use local fallback
    setTimeout(() => {
      const video = document.querySelector('video');
      if (video && video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        this.videoSrc = '/assets/fallback-video.mp4';
      }
    }, 3000);
  }

  onVideoLoadStart() {
    console.log('Video loading started:', this.videoSrc);
  }

  onVideoCanPlay() {
    console.log('Video can play:', this.videoSrc);
  }

  toggleView() {
    this.showImage = !this.showImage;
    if (!this.showImage) {
      this.playVideo();
    }
  }

  playVideo() {
    setTimeout(() => {
      const video = document.querySelector('video');
      if (video) {
        video.load();
        video.play().catch(e => console.log('Autoplay failed:', e));
      }
    }, 100);
  }
}