import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { StorageService } from 'src/app/shared/storageservices';

@Component({
  selector: 'app-propertyadsplace',
  templateUrl: './propertyadsplace.page.html',
  styleUrls: ['./propertyadsplace.page.scss'],
  standalone:false
})

export class PropertyadsplacePage implements OnInit {
  propertyId : any;
  userid : any;
  getuserDetailsData =  [];
  mobile_number : any;
  country : any;
  city : any;
  zipcode : any;
  selltype='';
  isSelltypeprivate=false;
  isSelltypeMakler=false;

  selectedTab: string = 'haus';

  tabs = [
  {
    key: 'haus',
    items: [
      {
        title: 'Haus verkaufen oder suchen',
        privat: '/pages/propertyadsform?form_type=Privat',
        makler: '/pages/propertyadsform?form_type=Makler'
      },
      {
        title: 'Haus vermieten, verpachten oder suchen',
        privat: '/pages/renthouse?form_type=Privat',
        makler: '/pages/renthouse?form_type=Makler'
      }
    ]
  },

  {
    key: 'wohnung',
    items: [
      {
        title: 'Wohnung verkaufen oder suchen',
        privat: 'pages/wohnungverkaufen?form_type=Privat',
        makler: 'pages/wohnungverkaufen?form_type=Makler'
      },
      {
        title: 'Wohnung vermieten, verpachten oder suchen',
        privat: 'pages/wohnungvermieten?form_type=Privat',
        makler: 'pages/wohnungvermieten?form_type=Makler'
      }
    ]
  },

  {
    key: 'grundstuck',
    items: [
      {
        title: 'Grundstück verkaufen oder suchen',
        privat: 'pages/grundstuckverkaufen?form_type=Privat',
        makler: 'pages/grundstuckverkaufen?form_type=Makler'
      },
      {
        title: 'Grundstück vermieten, verpachten oder suchen',
        privat: 'pages/grundstuckverpachten?form_type=Privat',
        makler: 'pages/grundstuckverpachten?form_type=Makler'
      }
    ]
  },

  {
    key: 'gewer',
    items: [
      {
        title: 'Gewerbeimmobilie verkaufen oder suchen',
        privat: 'pages/sellgewerimmobile?form_type=Privat',
        makler: 'pages/sellgewerimmobile?form_type=Makler'
      },
      {
        title: 'Gewerbeimmobilie vermieten, verpachten oder suchen',
        privat: 'pages/rentgewerimmobile?form_type=Privat',
        makler: 'pages/rentgewerimmobile?form_type=Makler'
      }
    ]
  },

  {
    key: 'ferien',
    items: [
      {
        title: 'Ferienimmobilie verkaufen oder suchen',
        privat: 'pages/sellferienimmobilie?form_type=Privat',
        makler: 'pages/sellferienimmobilie?form_type=Makler'
      },
      {
        title: 'Ferienimmobilie vermieten, verpachten oder suchen',
        privat: 'pages/rentferienimmobile?form_type=Privat',
        makler: 'pages/rentferienimmobile?form_type=Makler'
      }
    ]
  },

  {
    key: 'sonstige',
    items: [
      {
        title: 'Sonstige Immobilie verkaufen',
        privat: 'pages/sellsonstigeform?form_type=Privat',
        makler: 'pages/sellsonstigeform?form_type=Makler'
      },
      {
        title: 'Sonstige Immobilie vermieten',
        privat: 'pages/rentsonstigeform?form_type=Privat',
        makler: 'pages/rentsonstigeform?form_type=Makler'
      }
    ]
  }
];
 

  constructor(private route : ActivatedRoute,private navCtrl : NavController,private storage : StorageService,private http : HttpClient,private alertController : AlertController,private platform: Platform) {
    this.backbuttonEvent();
   }
   backbuttonEvent(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goback();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params:any)=> {
      if(params && params.propertyid){
        this.propertyId = JSON.parse(params.propertyid);
      }
    })
    const map:any = {
      1: 'haus',
      2: 'wohnung',
      3: 'grundstuck',
      4: 'gewer',
      5: 'ferien',
      6: 'sonstige'
    };

    this.selectedTab = map[this.propertyId] || 'haus';

    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
    });

    this.getuserDetails();
  }

  getuserDetails(){
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/userdetails/getuserdetails.php?userid='+this.userid).subscribe((res:any)=>{
        this.getuserDetailsData = this.getuserDetailsData.concat(res['records']);
        this.mobile_number = this.getuserDetailsData[0]['mobile_number'];
        this.country = this.getuserDetailsData[0]['country'];
        this.city = this.getuserDetailsData[0]['city_name'];
        this.zipcode = this.getuserDetailsData[0]['zipcode'];
        this.selltype = this.getuserDetailsData[0]['selltype'];
        this.disabledtypebtn(this.selltype);
      })
    });
  }

  disabledtypebtn(type:string){ 
    if(type=="Gewerblich") this.isSelltypeprivate = true;
    if(type == "privat") this.isSelltypeMakler = true;
  }

  openFormPage(pageurl:string){
    var url = '/'+pageurl;
    this.navCtrl.navigateRoot(url);
    return;
    if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
      var url = '/'+pageurl;
      let param =  pageurl.split("=")[1];

      if(this.selltype== "privat" && param == "Makler"){
        let message = "Du bist nicht als gewerblicher Nutzer registriert.";
        this.presentLogAlert(message);
        
      }else if(this.selltype== "Gewerblich" && param == "Privat"){
        let message = "Du bist nicht als privater Nutzer registriert.";
        this.presentLogAlert(message);
      }

      if(this.selltype== "Gewerblich" && param == "Makler"){
          this.navCtrl.navigateRoot(url);
      } else if(this.selltype== "privat" && param == "Privat"){
        this.navCtrl.navigateRoot(url);
      }

    }else{
      this.presentAlert();
    }
  }

  async presentLogAlert(mess:any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    // this.navCtrl.navigateRoot('tabs/tab3');
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Bitte melden Sie sich an oder aktualisieren Sie Ihr Profil.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.navCtrl.navigateRoot('/tabs/tab5');
  }

  // openhouserentFormPage(){
  //   this.navCtrl.navigateRoot('/renthouse')
  // }

  // opensellwohnungFormPage(){

  // }

  goback(){
    this.navCtrl.navigateRoot('/tabs/tab3')
    // window.history.back();
  }


   openTabs(tab: string) {
    this.selectedTab = tab;
  }

}
