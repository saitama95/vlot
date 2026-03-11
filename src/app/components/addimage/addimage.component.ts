import { Component, Input, OnInit } from '@angular/core';
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

  proId: string = '0';

  images: ImageItem[] = [];
  isUploading: boolean = false;

    form_type="";
    user_id:any=0;

  private apiUrl = 'http://127.0.0.1:8000/api/upload';

  constructor( private verapi:VerAPI) {}

  ngOnInit(): void {
    //this.getImages()
  }

  getImages(){
      // this.http.get(`http://127.0.0.1:8000/api/images?proid=${this.proId}`).
      // subscribe((res:any)=>{
      //   console.log(res);
      // })
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
        formData.append('proid', this.proId);
        formData.append('user_id', this.user_id);
        formData.append('form_type', this.form_type);
        await new Promise<void>((resolve, reject) => {
          this.verapi.uploadPropertyImage(formData).subscribe({
            next: (res) => { console.log('Uploaded:', res); resolve(); },
            error: (err) => { console.error('Upload error:', err); reject(err); }
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