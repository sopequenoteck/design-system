import { Component, input } from '@angular/core';
import { DsFileUpload } from 'ds-angular';

@Component({
  selector: 'example-ds-file-upload-default',
  standalone: true,
  imports: [DsFileUpload],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsFileUploadDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  multiple = input<boolean>(false);
  showPreview = input<boolean>(true);
  disabled = input<boolean>(false);

  onFilesChange(files: File[]): void {
    console.log('Files changed:', files);
  }
}
