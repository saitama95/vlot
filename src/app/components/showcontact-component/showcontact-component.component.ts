import { Component, OnInit,Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-showcontact-component',
  templateUrl: './showcontact-component.component.html',
  styleUrls: ['./showcontact-component.component.scss'],
    standalone:false
})
export class ShowcontactComponentComponent implements OnInit {

  @Input() details:any;
  @Input() homepage_link:any;
  @Input() website_link:string="";

  @Input() offField:boolean = true;
  getuserDetailsData=[];
  selltype="";
  handyNumber='';
  constructor(private storage:Storage, private http: HttpClient) { 
     this.initStorage();
  }

    async initStorage() {
    await this.storage.create();
    }

  ngOnInit() {
    this.handyNumber = this.details.phone_no.replace(" ","");
    this.getuserDetails();
  }

  getuserDetails(){
    Promise.all([this.storage.get("userId")]).then(values => {
     let userid = values[0];
      this.http.get('https://verkaufalles.at/api/userdetails/getuserdetails.php?userid='+userid).subscribe((res:any)=>{
        this.getuserDetailsData = this.getuserDetailsData.concat(res['records']);
        this.selltype = this.getuserDetailsData[0]['selltype'];
      })
    });
  }
}
