import { Component, OnInit ,EventEmitter ,Output,Input,SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { KontaktModalPage } from 'src/app/pages/property-modal/kontakt-modal/kontakt-modal.page';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { IonLabel, IonRow, IonToggle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-contact-form-component',
  templateUrl: './contact-form-component.component.html',
  styleUrls: ['./contact-form-component.component.scss'],
    standalone:false
})

export class ContactFormComponentComponent implements OnInit {

@Input() contactobj2:any
@Output() valueSent: EventEmitter<string> = new EventEmitter<string>();

Email = "";
firmenName = "";
immocardFirma = "";
nachName = "";
userName = "";
weitereFax = "";
weitereHomepage = "";
weitereImmocard = "";
weitereTelefono = "";
weitereTelefono2 = "";
zusatzlicheFax = "";
zusatzlicheFirmid = "";
zusatzlicheFirmname = "";
zusatzlicheHomepage = "";
zusatzlicheName = "";
zusatzlicheOhenat = "";
zusatzlicheTelefono = "";
zusatzlicheTelefono2 = "";
phoneCode1 = "";
phone_no:any;
getuserDetailsData=[];
first_name:string="";
user_email:String="";
phonecode:string="";
company_address:String="";
mobile_number:string=""
group1=2;
group2=2;

kontakidSection1=true;
kontakidSection2=false;
contactobj={};

groupcheck1=false;
groupcheck2=false;
selltype='';
district="";
  constructor(
    public modalController: ModalController,
    private storage : Storage,
    private http: HttpClient,
    
  ) {
   
   }

  ngOnInit() {
    this.getuserDetails();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contactobj2 && !changes.contactobj2.firstChange) {
        this.updateVairable(changes.contactobj2);
    }
  }
  updateVairable(res:any){
   this.user_email = res.currentValue.email;
   this.firmenName = res.currentValue.firmname;
   this.nachName = res.currentValue.nach_name;
   this.userName = res.currentValue.nach_name;
   this.weitereFax = res.currentValue.weiterfax;
   this.weitereTelefono = res.currentValue.weiter_telefono;
   this.weitereTelefono2 = res.currentValue.weiter_telefono_second;
   this.zusatzlicheFax = res.currentValue.zusatzliche_fax;
   this.zusatzlicheFirmname = res.currentValue.zusatzliche_firmname;
   this.zusatzlicheHomepage = res.currentValue.zusatzliche_homepage;
   this.zusatzlicheName = res.currentValue.zusatzliche_name;
   this.zusatzlicheTelefono = res.currentValue.zusatzliche_telefono;
   this.zusatzlicheTelefono2 = res.currentValue.zusatzliche_telefonotwo;
   this.group1 = res.currentValue.group1;
   this.group2 = res.currentValue.group2;
   this.getgroupvalue();
  }

  async getgroupvalue(){
    
      setTimeout(() => {
          if(this.group1==1){
          this.groupcheck1=true;
          }else if(this.group1==2){
          this.groupcheck1=false;
          }

          if(this.group2==1){
          this.groupcheck2=true;
          }else if(this.group2==2){
          this.groupcheck2=false;
          }
       }, 1000);
  }

  async KontaktModal(){
    console.log('Contact model '+this.zusatzlicheHomepage);
    const modal = await this.modalController.create({
      component : KontaktModalPage,
      componentProps:{ 
        "email_val": this.Email, 
        "firmename_val": this.firmenName, 
        "immocardfirma_val": this.immocardFirma, 
        "nachname_val": this.nachName, 
        "username_val": this.userName, 
        "weiterefax_val": this.weitereFax,
        "weiterehomepage_val": this.weitereHomepage, 
        "weitereimmocard_val": this.weitereImmocard,
        "weiteretelefono_val": this.weitereTelefono, 
        "weiteretelefono2_val": this.weitereTelefono2, 
        "zusatzlichefax_val": this.zusatzlicheFax, 
        "zusatzlichefirmid_val": this.zusatzlicheFirmid, 
        "zusatzlichefirmname_val": this.zusatzlicheFirmname,
        "zusatzlichehomepage_val": this.zusatzlicheHomepage, 
        "zusatzlichename_val": this.zusatzlicheName,
        "zusatzlicheohenat_val": this.zusatzlicheOhenat, 
        "zusatzlichetelefono_val": this.zusatzlicheTelefono, 
        "zusatzlichetelefono2_val": this.zusatzlicheTelefono2,
        "phoneCode1": this.phoneCode1,
        "maincatid" : 3,
      }
    });
    modal.onDidDismiss().then((modalData)=>{
      if(modalData.data.firmenName || modalData.data.immocardFirma || modalData.data.nachName || modalData.data.weitereFax || modalData.data.weitereHomepage || modalData.data.weitereImmocard || modalData.data.weitereTelefono || modalData.data.weitereTelefono2 || modalData.data.zusatzlicheFax || modalData.data.zusatzlicheFirmid || modalData.data.zusatzlicheFirmname || modalData.data.zusatzlicheHomepage 
        || modalData.data.zusatzlicheName || modalData.data.zusatzlicheOhenat || modalData.data.zusatzlicheTelefono || modalData.data.zusatzlicheTelefono2){
          
          this.kontakidSection1=false;
          this.kontakidSection2=true;
       
      }else{
        this.kontakidSection1=false;
        this.kontakidSection2=true;
       
      }
      this.Email = modalData.data.Email;
      this.firmenName = modalData.data.firmenName;
      this.immocardFirma = modalData.data.immocardFirma;
      this.nachName = modalData.data.nachName;
      this.userName = modalData.data.userName;
      this.weitereFax = modalData.data.weitereFax;
      this.weitereHomepage = modalData.data.weitereHomepage;
      this.weitereImmocard = modalData.data.weitereImmocard;
      this.weitereTelefono = modalData.data.weitereTelefono;
      this.weitereTelefono2 = modalData.data.weitereTelefono2;
      this.zusatzlicheFax = modalData.data.zusatzlicheFax;
      this.zusatzlicheFirmid = modalData.data.zusatzlicheFirmid;
      this.zusatzlicheFirmname = modalData.data.zusatzlicheFirmname;
      this.zusatzlicheHomepage = modalData.data.zusatzlicheHomepage;
      this.zusatzlicheName = modalData.data.zusatzlicheName;
      this.zusatzlicheOhenat = modalData.data.zusatzlicheOhenat;
      this.zusatzlicheTelefono = modalData.data.zusatzlicheTelefono;
      this.zusatzlicheTelefono2 = modalData.data.zusatzlicheTelefono2;
      this.phone_no =  modalData.data.handynumber;
      this.phoneCode1 =  modalData.data.phoneCode1;

    });
    return await modal.present();
  }


  getuserDetails(){
    Promise.all([this.storage.get("userId")]).then(values => {
     let userid = values[0];
      // this.http.get('https://verkaufalles.at/api/userdetails/getuserdetails.php?userid='+this.userid).subscribe((res:any)=>{
      this.http.get('https://verkaufalles.at/api/userdetails/getuserdetails.php?userid='+userid).subscribe((res:any)=>{
        this.getuserDetailsData = this.getuserDetailsData.concat(res['records']);
        this.selltype = this.getuserDetailsData[0]['selltype'];
        this.first_name = this.getuserDetailsData[0]['first_name'];
        this.nachName = this.getuserDetailsData[0]['last_name'];
        this.user_email = this.getuserDetailsData[0]['user_email']; 
        this.mobile_number =  this.getuserDetailsData[0]['mobile_number']; 
        this.company_address = (this.selltype!='privat') ? this.getuserDetailsData[0]['company_address']:""; 
        this.firmenName =  (this.selltype!='privat') ? this.getuserDetailsData[0]['company_name']:""; 
        this.weitereTelefono = this.getuserDetailsData[0]['telephone_no']; 
        this.weitereHomepage = this.getuserDetailsData[0]['website']; 
        this.weitereFax = this.getuserDetailsData[0]['fax_no'];
        this.phonecode = this.getuserDetailsData[0]['phonecode'];
        this.district = this.getuserDetailsData[0]['district_name'];
      })
    });
  }
  addCheckboxgroup(event,group){
    let checkbox = event.target;
    if(group == 'group1'){
      if(checkbox.checked == true){
        this.group1 = 1;
      }else{
        this.group1 = 2;
      }
    }else if(group=='group2'){

      if(checkbox.checked == true){
        this.group2 = 1;
      }else{
        this.group2 = 2;
      }
    }
  }

  triggerClick(){
    let obj:any = {
      'email':(this.Email) ? this.Email:this.user_email,
      'firmenName':this.firmenName,
      'nachName':this.nachName,
      'userName':this.first_name,
      'weitereFax':this.weitereFax,
      'weitereHomepage':this.weitereHomepage,
      'weitereTelefono':this.weitereTelefono,
      'weitereTelefono2':this.weitereTelefono2,  
      'zusatzlicheFax':this.zusatzlicheFax,
      'zusatzlicheFirmid':this.zusatzlicheFirmid,
      'zusatzlicheFirmname':this.zusatzlicheFirmname,
      'zusatzlicheHomepage':this.zusatzlicheHomepage,
      'zusatzlicheName':this.zusatzlicheName,
      'zusatzlicheOhenat':this.zusatzlicheOhenat,
      'zusatzlicheTelefono':this.zusatzlicheTelefono,
      'zusatzlicheTelefono2':this.zusatzlicheTelefono2,
      'phone_no':(this.phone_no) ? this.phone_no:this.mobile_number,
      'group1':this.group1,
      'group2':this.group2,
      'company_address':this.company_address,
      'district':this.district,
    }
    this.valueSent.emit(obj);
  }
}
