import { Component, inject } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  isDragOver = false;
  selectedFile!: File;
  service = inject(RestService);

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  uploadFile(): void {
    this.service.uploadFile('http://localhost:3200/upload', this.selectedFile).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      complete: () => {
        console.log('File upload complete');
      }
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files;
    if (file) {
      this.selectedFile = file[0];
    }
    console.log(file);
  }
}
