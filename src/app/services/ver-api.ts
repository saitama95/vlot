import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerAPI {
    private http = inject(HttpClient);
    private API_URL = 'http://127.0.0.1:8000/api';
    private API_URL1 = 'http://localhost/chatApp/public/api_path';
    private API_URL2 = 'http://localhost/reion/public/ver/mobapp';
    posthausselldata(data:any){
      return this.http.post(`${this.API_URL}/posthausselldata`,data,{ headers: { 'Content-Type': 'application/json' } })
    }

    getPhoneCode(){
      return this.http.get(`https://verkaufalles.at/api/phoneCode/countryPhoneCode.php`);
    }

    uploadPropertyImage(data:any){
      return this.http.post(`${this.API_URL}/upload`,data)
    }
    
}
