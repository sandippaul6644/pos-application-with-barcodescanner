import { Injectable } from '@angular/core';

declare global {
  interface Window {
    electronAPI?: {
      searchFiles: (searchTerm: string) => Promise<{image: string | null, video: string | null}>;
      getDownloadsPath: () => Promise<string>;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class DesktopFileService {
  private isElectron = false;
  private downloadsPath = '';

  constructor() {
    this.isElectron = !!(window && window.electronAPI);
    this.initializeDownloadsPath();
  }

  private async initializeDownloadsPath() {
    if (this.isElectron && window.electronAPI) {
      try {
        this.downloadsPath = await window.electronAPI.getDownloadsPath();
      } catch (error) {
        console.error('Failed to get downloads path:', error);
        this.downloadsPath = this.getDefaultDownloadsPath();
      }
    } else {
      this.downloadsPath = this.getDefaultDownloadsPath();
    }
  }

  private getDefaultDownloadsPath(): string {
    return '/home/ttc015/Downloads/POS-ASSET';
  }

  async searchAssets(searchTerm: string): Promise<{image: string | null, video: string | null}> {
    if (this.isElectron && window.electronAPI) {
      return await window.electronAPI.searchFiles(searchTerm);
    } else {
      // Fallback for web version
      return this.webFallbackSearch(searchTerm);
    }
  }

  private async webFallbackSearch(searchTerm: string): Promise<{image: string | null, video: string | null}> {
    try {
      const response = await fetch(`http://localhost:3001/api/search/${searchTerm}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching from local server:', error);
    }
    
    return { image: null, video: null };
  }

  // Method to create file input for manual file selection (web fallback)
  createFileInput(callback: (files: FileList | null) => void): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*';
    input.style.display = 'none';
    
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      callback(target.files);
    };
    
    document.body.appendChild(input);
    return input;
  }
}