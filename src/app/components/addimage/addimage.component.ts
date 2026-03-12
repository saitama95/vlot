import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { VerAPI } from 'src/app/services/ver-api';

interface ImageItem {
  url: string;
  blob?: Blob;
  name: string;
  uploaded: boolean;
  loading: boolean;  
  error: boolean;  
}

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.scss'],
  standalone: false
})
export class AddimageComponent implements OnInit {

  @Input() proId: string = '';

  images: ImageItem[] = [];
  isUploading: boolean = false;

  @Input() tablename:string="";
  @Input() form_type="";
  @Input() user_id:any=0;

  @Input() startUpload=false;

  constructor( private verapi:VerAPI) {}

  ngOnInit(): void {
    //this.getImages()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startUpload'] && changes['startUpload'].currentValue === true) {
      this.uploadAll();
    }
  }

  async pickFromGallery(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await Camera.pickImages({ quality: 80, limit: 10 });
        for (const photo of result.photos) {
          const blob = await this.urlToBlob(photo.webPath!);
          this.images.push({ url: photo.webPath!, blob, name: `gallery_${Date.now()}.jpeg`, uploaded: false, loading: false, error: false });
        }
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = async (e: any) => {
          for (const file of Array.from(e.target.files) as File[]) {
            this.images.push({ url: URL.createObjectURL(file), blob: file, name: file.name, uploaded: false, loading: false, error: false });
          }
        };
        input.click();
      }
    } catch (e) {
      console.error('Gallery error:', e);
    }
  }

  async takePhoto(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        const photo = await Camera.getPhoto({ quality: 80, allowEditing: false, resultType: CameraResultType.DataUrl, source: CameraSource.Camera });
        const blob = await this.urlToBlob(photo.dataUrl!);
        this.images.push({ url: photo.dataUrl!, blob, name: `camera_${Date.now()}.jpeg`, uploaded: false, loading: false, error: false });
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.onchange = async (e: any) => {
          const file = e.target.files[0];
          if (file) {
            this.images.push({ url: URL.createObjectURL(file), blob: file, name: file.name, uploaded: false, loading: false, error: false });
          }
        };
        input.click();
      }
    } catch (e) {
      console.error('Camera error:', e);
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  async uploadAll(): Promise<void> {
    if (!this.proId) return;

    this.isUploading = true;

    const pending = this.images.filter(i => !i.uploaded);

    for (const img of pending) {
      img.loading = true;   // ✅ show spinner on this image
      img.error = false;

      try {
        const formData = new FormData();
        formData.append('image', img.blob!, img.name);
        formData.append('product_id', this.proId);
        formData.append('tablename', this.tablename);
        formData.append('action', 'create');
        await new Promise<void>((resolve, reject) => {
          this.verapi.uploadPropertyImage(formData).subscribe({
            next: (res:any) => { console.log('Uploaded:', res); resolve(); },
            error: (err:any) => { console.error('Upload error:', err); reject(err); }
          });
        });

        img.uploaded = true;
        img.loading = false;

        // ✅ Remove from list after 800ms so user sees checkmark briefly
        setTimeout(() => {
          const index = this.images.indexOf(img);
          if (index > -1) this.images.splice(index, 1);
        }, 800);

      } catch (e) {
        img.loading = false;
        img.error = true;   // ✅ show error state on image
      }
    }

    this.isUploading = false;
  }

  private async urlToBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    return await response.blob();
  }

  get pendingCount(): number {
    return this.images.filter(i => !i.uploaded).length;
  }
}