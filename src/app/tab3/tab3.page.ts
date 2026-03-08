import { Component ,ViewChild} from '@angular/core';
import { AlertController, NavController ,Platform ,IonContent} from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { SharedDataService } from '../shared/shared-data.service';
import { StorageService } from '../shared/storageservices';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone:false
})
export class Tab3Page {
  @ViewChild(IonContent) content!: IonContent;
  userid : any;
  getuserDetailsData = [];
  mobile_number : any;
  country : any;
  city :  any;
  zipcode : any;

  selltype='';
  isSelltypefree=false;
  isSelltypecommerical=false;
  
  constructor(
    private navCtrl : NavController,
    private storage : StorageService,
    private http : HttpClient,
    private alertController : AlertController,
    private platform: Platform,
    private shared:SharedDataService,
  ) { 
    this.backbuttonEvent();
  }
  
  ionViewWillEnter(){
    this.shared.checkUserLogin();
    sessionStorage.setItem('chatProductDetails',"");
    let subtabData = {"id":1,tabname:"marketplace"}
    sessionStorage.setItem("subtabData",JSON.stringify(subtabData));
  }
  
  backbuttonEvent(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goback();
    });
  }
  goback(){
    this.navCtrl.navigateRoot('/tabs/tab1'); 
    // window.history.back(); 
  }
  // goNewpage(){
  //   this.navCtrl.navigateRoot('/pages/new-marketplace');
  //  }
  gosubmitpage(){
    this.navCtrl.navigateRoot('/pages/finalsubmitpage');
   }
   
  ngOnInit() {
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
        // console.log(this.getuserDetailsData,'this.getuserDetailsData');
      })
    });
  }

  disabledtypebtn(type:string){ 
    if(type=="Gewerblich") this.isSelltypefree = true;
    if(type == "privat") this.isSelltypecommerical = true;
  }

  gotonextPage(id:number){
    this.navCtrl.navigateRoot('/pages/propertyadsplace?propertyid='+id)
  }

  gotoAutomotorPage(autoid:number){
    this.navCtrl.navigateRoot('/pages/automotorplace?ids='+autoid)
  }

  openPetsForm(){
    if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
      this.navCtrl.navigateRoot('/pages/pets-form');
    }else{
      this.presentAlert();
    }
  }

  openPetsAccessForm(){
    if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
      this.navCtrl.navigateRoot('/pages/petsaccesoriesform');
    }else{
      this.presentAlert();
    }
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Bitte melden Sie sich an oder aktualisieren Sie Ihr Profil.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
    // this.navCtrl.navigateRoot('/pages/updateprofile');
    this.navCtrl.navigateRoot('/tabs/tab5');
  }

  gomarketPlaceForm(pageUrl:string,type?:any){
    
    if(type=="commerical" && this.selltype== "privat"){
      let message = "Du bist nicht als gewerblicher Nutzer registriert.";
      this.presentLogAlert(message);
    }else if(this.selltype== "Gewerblich" && type == "free"){
      let message = "Du bist nicht als privater Nutzer registriert.";
      this.presentLogAlert(message);
    }
    if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
      // var url = '/'+pageUrl;
      var url = `/${pageUrl}?type=${type}`;
    
      if(this.selltype== "Gewerblich" && type == "commerical"){
        this.navCtrl.navigateRoot(url);
    } else if(this.selltype== "privat" && type == "free"){
      this.navCtrl.navigateRoot(url);
    }else if(type == undefined){
      this.navCtrl.navigateRoot(pageUrl);
    }
    }else{
      this.presentAlert();
    }
  }
  
  replaceIcon(x:any) {  
    if(x.path[0].classList.value == 'fa fa-caret-down'){
      x.path[0].classList.remove("fa-caret-down");
      x.path[0].classList.add("fa-caret-up");  
    }else{
        x.path[0].classList.remove("fa-caret-up");
        x.path[0].classList.add("fa-caret-down");  
    }
   }
   
   gotoTiresPage(){
    this.navCtrl.navigateRoot('/pages/selltiresform');
   }

   openBicycleForm(){
      if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
          this.navCtrl.navigateRoot('/pages/bicycleforms');
      }else{
        this.presentAlert();
        
      }
    }

    gotoFahrradSparePage(){
      if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
          this.navCtrl.navigateRoot('/pages/bicyclesparepartform');
      }else{
        this.presentAlert();
        
      }
    }

   openShopForm(){
    if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
      this.navCtrl.navigateRoot('/pages/shopforms');
    }else{
      this.presentAlert();
      
    }
   }

   openEFahrzeugeForm(){
    if(this.userid != null && this.mobile_number != null && this.country != "" && this.city != "" && this.zipcode != ""){
      this.navCtrl.navigateRoot('/pages/efahrzeugeform');
    }else{
      this.presentAlert();
      
    }
   }

   async presentLogAlert(text:string){
    const alert = await this.alertController.create({
      cssClass: 'selltypealert',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    // this.navCtrl.navigateRoot('tabs/tab3');
  }

  adjustFrader(){
    this.content.scrollToBottom(500);
  }

 

  
}
