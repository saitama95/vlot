import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerAPI {
     private http = inject(HttpClient);
    //private API_URL = 'http://localhost/ver';
    private API_URL = 'https://dkapoor-001-site40.rtempurl.com';


    posthausselldata(data:any){
      return this.http.post(`${this.API_URL}/api/propertyform/posthausselldata.php`,data,{ headers: { 'Content-Type': 'application/json' } })
    }
    
    getHouseSellList(type:string){
      return this.http.get(`${this.API_URL}/api/propertyproducts/getpropertyproductlist.php?user_id=null&type=${type}`);
    }

    hausselldatadetail(proid:any,userid:any){
        return this.http.get(`${this.API_URL}/api/propertyproducts/gethaussellproductdetails.php?proid=${proid}&user_id=${userid}`);
    }

    getPhoneCode(){
      return this.http.get(`https://verkaufalles.at/api/phoneCode/countryPhoneCode.php`);
    }

    uploadPropertyImage(data:any){
      return this.http.post(`${this.API_URL}/mobapp/image_upload.php`,data)
    }

    updateLogo(data:any){
        return this.http.post(`${this.API_URL}/mobapp/logoupdate.php`,data)
    }

    getCategories(maincatid:number){
      return this.http.get(`https://verkaufalles.at/api/categories/getcategories.php?maincatid=${maincatid}`);
    }

    getSubCategories(subcatid:number,maincatid:number,cm:string=""){
      return this.http.get(`https://verkaufalles.at/api/categories/getsubsubcatbyid.php?subcatid=${subcatid}&maincatid=${maincatid}&cm=${cm}`);
      
    }

    //tab1
    getRandomProperty(){
      return this.http.get(`${this.API_URL}/`);
    }
}
