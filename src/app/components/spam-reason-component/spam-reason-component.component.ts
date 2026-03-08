import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
//import { SpamformPage } from 'src/app/components/spamform/spamform.page';

import { SharedDataService } from 'src/app/shared/shared-data.service';
import { registerPlugin } from '@capacitor/core';

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
 }
 const Echo = registerPlugin<EchoPlugin>('Echo');

@Component({
  selector: 'app-spam-reason-component',
  templateUrl: './spam-reason-component.component.html',
  styleUrls: ['./spam-reason-component.component.scss'],
    standalone:false
})
export class SpamReasonComponentComponent implements OnInit {

   constructor( 
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private http: HttpClient,
    private storage : Storage,
    private modalCtrl: ModalController,
    private shared:SharedDataService,
    private navCtrl : NavController,
    ) 
    { }

  myForm = this.formBuilder.group({
    reason: ['', Validators.required],
  });

  @Input () productdetails:any;
  @Input () subcatid:string="";
  @Input () subsubcatid:string="";
  @Input () categoryid:string="";
  @Input () categorylevelname:string="";

  handyNumber='';
  getuserDetailsData:any[]=[];
  selltype="";
  userid = "";
  ngOnInit() {
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
     })
    this.handyNumber = this.productdetails.phone_no.replace(" ","");
    this.disbledbtn();
    this.getuserDetails();

  
  }

  phonebtn=false;
  emailbtn=false;
  
  
  checkLogin(prodOwnerId:any){
    let newtitle='';

    if((this.productdetails.subcatid) >= 21 && parseInt(this.productdetails.subcatid) <= 25 || parseInt(this.productdetails.subcatid) == 67 || parseInt(this.productdetails.subcatid) == 68){
      newtitle = `${this.productdetails.breedname} | ${this.productdetails.title}`;
    }
    else if(parseInt(this.productdetails.subcatid) == 71){
      newtitle = this.productdetails.title;
    }
    else{
      newtitle = this.productdetails.title_name;
    }
    

    
    if(this.userid){
      let formtype = (this.productdetails.form_type) ? (this.productdetails.form_type) : "";
      let proid = (this.productdetails.id);
      let receiverId = (this.productdetails.user_id);
      let title = newtitle;
      let nrId = this.productdetails.nrId;
      let euro = (this.productdetails.euro!=null) ? this.productdetails.euro : `${this.productdetails.evon} - ${this.productdetails.ebis}`;
      if(this.userid!=prodOwnerId){
        let actualUrl = this.getCurrentUrl();
        this.checkForChatOccure(proid,receiverId,title,formtype,nrId,euro,actualUrl).subscribe((res:any)=>{
            if(res['records'][0].status){
              let obj = {
                id:res['records'][0].id,
                otherUserId:res['records'][0].otherUserId,
                unique_id:res['records'][0].unique_id,
                protitle:title,
                receiver_id:receiverId,
                price:this.productdetails.price,
                euro:euro,
                nrId:this.productdetails.nrId,
                userdata:{
                  username:this.productdetails.user_name,
                  profileImage:this.getuserDetailsData[0].profileimage,
                },
                userId:this.userid,
                proId:proid,
                formtype:formtype,
                productImage:(this.productdetails.imageData) ? this.productdetails.imageData[0].image_path:"",
              }
              sessionStorage.setItem('chatProductDetails',JSON.stringify(obj));
              this.navCtrl.navigateRoot(`pages/userchatlist?receiver_id=${receiverId}&userNumber=${res['records'][0].userNumber}&userId=${this.userid}&proId=${proid}&formtype=${formtype}&id=${obj.id}&otherUserId=${obj.otherUserId}&unique_id=${res['records'][0].unique_id}&nrId=${obj.nrId}`);

            }else{
              let price = (this.productdetails.euro!=null) ? this.productdetails.euro : `${this.productdetails.evon} - ${this.productdetails.ebis}`;
              this.navCtrl.navigateRoot(`tabs/tab6?proid=${proid}&formtype=${formtype}&prodOwnerId=${receiverId}&title=${title}&userId=${this.userid}&price=${price}&nrId=${this.productdetails.nrId}&otherUserId=`);
            }
        })
      
      }
    }else{
      this.shared.checkUserLogin();
    }
  }

  getCurrentUrl(){
    let url = window.location.href;
    let actual = url.split('pages')[1];
    console.log()
    return actual;
  }

  checkForChatOccure(proid:number,receiverId:number,title:string,formtype:any,nrId:any,price:any,actualUrl:any){
    const unique_id = new Date().getTime();
    return this.http.get(`https://verkaufalles.at/api/chat/chatoccure.php?proid=${proid}&receiverID=${receiverId}&senderID=${this.userid}&title=${title}&form_type=${formtype}&nrId=${nrId}&unique_id=${unique_id}&price=${price}&subcatid=${this.subcatid}&subsubcatid=${this.subsubcatid}&categorId=${this.categoryid}&categorylevelname=${this.categorylevelname}`);
  }
  
  sendemail(email: string){
    if(this.userid){
      window.location.href = `mailto:${email}`;
    }else{
      this.shared.checkUserLogin();
    }
  }


  shareProd(email:string){
    if(this.userid){
      if(email == 'facebook'){
        window.location.href = `https://www.facebook.com/`;
      }else if(email == 'messenger'){
        window.location.href = `https://www.messenger.com/`;
      }else if(email == 'handy1'){
        window.location.href = `https://wa.me/{{this.handyNumber}}`;
      }
      else if(email == 'handy2'){
        window.location.href = `'sms:' + this.handyNumber`;
      }
    }else{
      this.shared.checkUserLogin();
    }
  
    // [href]="'sms:' + handyNumber"
  }

  disbledbtn(){
    if(this.productdetails.group1 == 2){
      let btn = document.querySelector('#phonebtn') as HTMLInputElement;
      btn.classList.add('disabledbtn')
      this.phonebtn = true;
    }
    if(this.productdetails.group2 == 2){
      let btn = document.querySelector('#buynow')  as HTMLInputElement;
      btn.classList.add('disabledbtn')
      this.emailbtn = true;
    }
}
  
async spamData(){
  // if(this.userid){
  //   const modal = await this.modalCtrl.create({
  //     component: SpamformPage,
  //     cssClass:"spam_form",
  //   });
  //   modal.present();
  
  //   const { data, role } = await modal.onWillDismiss();
  
  //   if (role === 'confirm') {
  //      this.submitSpamData(data);
  //   }
  // }
}

  callNow(phoneno:any){
    if(this.userid){
      window.location.href = "tel:"+phoneno;
    }else{
      this.shared.checkUserLogin();
    }
  }
  
  submitSpamData(data:any){
    Promise.all([this.storage.get("userId")]).then(values=>{
      let formData = {
        userid:values[0],
        form_type:this.productdetails.form_type,
        proId:this.productdetails.id,
        ...data
      }
      this.http.post('https://verkaufalles.at/api/spamData/insertSpamData.php',JSON.stringify(formData),{responseType : 'text'}).subscribe((res:any)=>{
        let responsedata = (JSON.parse(res));
        if(responsedata.status){
          this.shared.presentAlert2()
        }
      })
    })
  }


  async shareLink(){
    if(this.userid){
      let link = window.location.href;
      let url  = link.split('pages')[1];
      let actualURl = `https://verkaufalles.at/pages${url}`;
      const { value } = await Echo.echo({ value: actualURl });
    }else{
      this.shared.checkUserLogin();
    }
   
  }

  getuserDetails(){
    Promise.all([this.storage.get("userId")]).then(values => {
     let userid = values[0];
     this.http.get('https://verkaufalles.at/api/userdetails/getuserdetails.php?userid='+userid).subscribe((res:any)=>{
      this.getuserDetailsData = this.getuserDetailsData.concat(res['records']);
      console.log(this.getuserDetailsData);
      this.selltype = this.getuserDetailsData[0]['selltype'];
     
       })
    })
  }
} 