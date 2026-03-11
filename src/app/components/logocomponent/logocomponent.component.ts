import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { VerAPI } from 'src/app/services/ver-api';

@Component({
  selector: 'app-logocomponent',
  templateUrl: './logocomponent.component.html',
  styleUrls: ['./logocomponent.component.scss'],
  standalone: false
})
export class LogocomponentComponent implements OnInit, OnChanges {
  @Input() proId: string = '0';
  @Input() user_id: any = '';
  @Input() form_type: string = '';
  @Input() startUploadLogo = false;
  @Input() table_name:string="";
  @Output() uploadDone = new EventEmitter<any>();

  previewUrl: string | null = null;
  selectedFile: File | null = null;
  uploading = false;

  constructor(private verapi: VerAPI) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['startUploadLogo'] && changes['startUploadLogo'].currentValue === true) {
      this.uploadLogo();
    }
  }

  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) {
      alert('Invalid file type. Please select an image.');
      return;
    }

    this.selectedFile = file;

    // preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeLogo() {
    this.selectedFile = null;
    this.previewUrl   = null;
  }

  uploadLogo() {
    if (!this.selectedFile) return;

    this.uploading = true;
    const formData = new FormData();
    formData.append('image',      this.selectedFile);
    formData.append('product_id', this.proId);
    formData.append('user_id',    this.user_id);
    formData.append('form_type',  this.form_type);
    formData.append('action',     'create');
    formData.append('table_name', this.table_name);
    this.verapi.updateLogo(formData).subscribe({
      next: (res: any) => {
        this.uploading = false;
        if (res.success) {
          this.removeLogo();
          this.uploadDone.emit(res);
        }
      },
      error: (err) => {
        this.uploading = false;
        console.error('Logo upload error', err);
      }
    });
  }

 
}