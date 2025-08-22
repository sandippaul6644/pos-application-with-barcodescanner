import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private posAssetPath = '';

  constructor() {
    // Try to determine the Downloads/POS-ASSET path
    this.posAssetPath = this.getDownloadsPath();
  }

  private getDownloadsPath(): string {
    return '/home/ttc015/Downloads/POS-ASSET';
  }

  async searchAssets(searchTerm: string): Promise<{image: string | null, video: string | null}> {
    const result = {
      image: null as string | null,
      video: null as string | null
    };

    try {
      // Search in images folder
      const imagePath = await this.searchInFolder('images', searchTerm);
      if (imagePath) {
        result.image = imagePath;
      }

      // Search in video folder (note: singular 'video')
      const videoPath = await this.searchInFolder('video', searchTerm);
      if (videoPath) {
        result.video = videoPath;
      }
    } catch (error) {
      console.error('Error searching assets:', error);
    }

    return result;
  }

  private async searchInFolder(folderType: 'images' | 'video', searchTerm: string): Promise<string | null> {
    try {
      // In a real desktop app, you'd use file system APIs
      // For web, we'll simulate with a file input approach
      const extensions = folderType === 'images' 
        ? ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
        : ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'];

      // Try different extensions with the search term
      for (const ext of extensions) {
        const fileName = `${searchTerm}${ext}`;
        const filePath = `file://${this.posAssetPath}/${folderType}/${fileName}`;
        
        // Check if file exists (this would need proper file system access in desktop app)
        if (await this.fileExists(filePath)) {
          return filePath;
        }
      }
    } catch (error) {
      console.error(`Error searching in ${folderType} folder:`, error);
    }
    
    return null;
  }

  private async fileExists(path: string): Promise<boolean> {
    // In a real desktop application, you'd use proper file system APIs
    // For web demo, we'll return false and handle fallback
    return new Promise((resolve) => {
      const img = new Image();
      const video = document.createElement('video');
      
      if (path.includes('/images/')) {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
      } else {
        video.onloadeddata = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = path;
      }
      
      // Timeout after 2 seconds
      setTimeout(() => resolve(false), 2000);
    });
  }
}