import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController,AlertController  } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Network,ConnectionStatus } from '@capacitor/network';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types/swiper-options';
import SwiperCore from 'swiper';
import {ActivatedRoute,Router} from '@angular/router';
import { Firestore,collection,doc ,setDoc} from '@angular/fire/firestore';
//import { NotifypagePage } from '../pages/notify-modal/notifypage/notifypage.page';
import { SharedDataService } from '../shared/shared-data.service';
import { LoadingComponent } from '../components/loading/loading.component';
import { Autoplay } from 'swiper/modules';
SwiperCore.use([Autoplay]);
import { register } from 'swiper/element/bundle';
import { StorageService } from '../shared/storageservices';
register();
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone:false
})

export class Tab1Page {
  @ViewChild('marketeplace') marketeplaceLoading!:LoadingComponent;
 notifyMessage:any;
  ngAfterViewInit() {
    
 }

 slideOptsTwo = {
  slidesPerView: 2.2,
  spaceBetween: 10,
  loop: false
};

  sliderOne: any;
  sliderTwo: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };


  slideOptsthree = {
    slidesPerView: 2.5,
    // spaceBetween: 8,
    speed: 400,
    // loop: true,
    // centeredSlides: true,
  }

  getmarketplaceProduct:any[] = [];
  getPropertyProdlist:any[] = [];
  subsubcatid : any;
  proid : any;
  userid : any;
  getwishlistData:any[] = [];

  slideOptsfour = {
    slidesPerView: 2.5,
    speed: 400,
   
  };
  
  imageData:any[]=[];
  config : SwiperOptions = {
    //zoom : true,
    loop:true,
    //pagination:true,
    autoplay:true
    // autoplay: {
    //   delay: 3000,
    //   },
  }


  div_sec:any;
  networkStatus!:ConnectionStatus;
  networkPrint!:string;
  onlineData="";
  viewdItem="";
  constructor(private navCtrl : NavController,
    private modalController :ModalController,
    private http : HttpClient,
    private route:ActivatedRoute,
    private storage : StorageService,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private alertController: AlertController,
    private shared:SharedDataService,
    private router:Router, 
   public firebase:Firestore,
   
    @Optional() private routerOutlet?: IonRouterOutlet
    ) {
      
      
    
    }

    
    
  ionViewDidEnter(){
      sessionStorage.setItem('chatProductDetails',"");
      this.getFavoriteItems();
    }
  ngOnInit(){
    this.checkNetConnection();
    this.getcountitem();
    this.getViewItem();
    this.getOnlineStatus();
    this.getMarketPlaceData();
    this.getPropertyHausSellData();
    this.getBanner();
    this.activeTab();
    this.getFavoriteItems();
    this.updateAppPopUp();
    this.getpetdata();
    this.getautomotardata();
    this.notification()
  }

  async notification(){
   
  }
  gotoMyadsList(){
    //this.shared.storeNavtivationHistroy(window.location.href);
    this.router.navigate(['pages/myadslistpage'])
  }
  async getOnlineStatus(){
    this.platform.ready().then(() => {
      this.updateStatus(1);
      
      this.platform.pause.subscribe(() => {
        this.updateStatus(0);
      });

      this.platform.resume.subscribe(() => {
        this.updateStatus(1);
      });
    });
  }

  async updateStatus(status: number) {
    const userId = await this.storage.get('userId');
    if(!userId) return;
    let data = {
      id:userId,
      status:status
    }
    this.http.post('https://verkaufalles.at/api/register/updatestatus.php',JSON.stringify(data),{responseType: 'json'})
    .subscribe((res:any)=>{
      //this.addstatustoFire(res);
    })
  }

  async getBanner(){
    this.http.get('https://verkaufalles.at/api/homerandomdata/homepagebanner.php')
    .subscribe((res:any)=>{
      this.imageData = this.imageData.concat(res['records'])
    })
  }


    async addstatustoFire(data:any) {
      let uid = data.result.id;
      let status = data.result.status;
      try {
        const docRef = doc(collection(this.firebase, "onlineUser"), uid);
        await setDoc(docRef, { 
          id:uid,
          status:status
         });
       
      } catch (e) {
        console.error("Error setting document: ", e);
      }
    }
  async checkLogin(){
    const userid = await this.storage.get('userId');
    if(!userid){
      this.navCtrl.navigateRoot('tabs/tab5')
    }
  }
  //05-09-2023
  async getViewItem(){
    const userId = await this.storage.get('userId');
    const response = await fetch(`https://verkaufalles.at/api/assets/getviewitem.php?userid=${userId}`);
    const data = await response.json();
    this.viewdItem = data['records'][0].count;
  }

  async getcountitem(){
    const userId = await this.storage.get('userId');
    const response = await fetch(`https://verkaufalles.at/api/getcountitem/userdatacount.php?user_id=${userId}`);
    const data = await response.json();
    this.onlineData = data.count;
  }

  petdataarr:any[] = [];
  async getpetdata(){
    this.http.get(`https://verkaufalles.at/api/homerandomdata/getpetarandom.php`).subscribe((res:any)=>{
      this.petdataarr.push(...res['records'])
    });
  }

  automotararr:any[] = [];
  async getautomotardata(){
    const response = await fetch(`https://verkaufalles.at/api/homerandomdata/getautomotarlist.php`);
    const data = await response.json();
    this.automotararr.push(...data["records"]);
  }
  //ionic 5 angular  app with too much ugle code like document.getELementById and no resubale component it has around 500+ pages how to fix it in quick time 
  ionViewWillEnter(){
    let subtabData = {"id":1,tabname:"marketplace"}
    sessionStorage.setItem("subtabData",JSON.stringify(subtabData));
  }
  //end 05-09-2023
  
  checkNetConnection(){
      if(Network){
        Network.getStatus().then(status=>{
          this.networkStatus = status;
          if(this.networkStatus.connected == false){
            this.navCtrl.navigateRoot("/pages/offlinepage");
          }
        })
      }
      Network.addListener("networkStatusChange",status=>{
        if(this.networkStatus.connected == false){
          this.navCtrl.navigateRoot("/pages/offlinepage");
        }
      })
  }
  

  updateAppPopUp(){
    this.http.get('https://verkaufalles.at/api/assets/checkForUpdate.php').subscribe((res:any)=>{
      let version = (res['records'][0].version);
      let link = (res['records'][0].link);
      if(version != 1){//the static value should always same as "updateApp" table column "version" 
        this.updatePopAlert(link);
      }
    });
  }

  async updatePopAlert(link:string) {
    let alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          window.location.href = link;
        },
      },
    ];
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Aktualisieren Sie Ihre App',
      message: 'Aktualisieren Sie, um neue Funktionen zu nutzen',
      buttons: alertButtons,
      cssClass:'updatePop',
      backdropDismiss:false
    });
    await alert.present();
  }

  async activeTab(){
    Promise.all([this.storage.set("activeTab",'tab1')]);
  }
  removeSearchTab(){
    Promise.all([this.storage.set("subtabData",'')]);
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      // cssClass: 'my-custom-class',
      spinner: 'circles',
      duration: 1000
    });
    await loading.present();

    await loading.onDidDismiss();
   
  }
  // async gotonotifypage(NotifyPayload=''){
  //   const modal = await this.modalController.create({
  //     component : NotifypagePage,
  //     componentProps:{
  //       'NotifyPayload':NotifyPayload,
  //     }
  //   });
  //   modal.onDidDismiss().then((modelData)=>{

  //   });
  //   return await modal.present();
  // }

  getMarketPlaceData(){
      this.http.get('https://verkaufalles.at/api/homerandomdata/getmarketplaceprodlist.php').subscribe((res:any)=>{
        // if(res['records']!='null'){
          this.getmarketplaceProduct=[];
          this.getmarketplaceProduct = this.getmarketplaceProduct.concat(res['records']);
          console.log(this.getmarketplaceProduct)
          // this.marketeplaceLoading.arrdata.push(...this.getmarketplaceProduct)
        // }
      })
  }


  getPropertyHausSellData(){
    Promise.all([this.storage.get('userId')]).then(values=>{
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/homerandomdata/getpropertyprodlist.php?user_id='+this.userid).subscribe((res:any)=>{
          this.getPropertyProdlist = this.getPropertyProdlist.concat(res['records']);
      });
    });
  }

  getFavoriteItems(){
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/wishlist/getwishlistproduct.php?user_id='+this.userid).subscribe((res:any)=>{
          this.getwishlistData = this.getwishlistData.concat(res['records']);
      });
    });
  }
  
  openWishlistAllProducts(){
    this.navCtrl.navigateRoot('/pages/wishlistpage');
  }

  OpenMarketPlaceProduct(){
    this.navCtrl.navigateRoot('tabs/tab2?maincatid=1');
  }

  openProductDetailPage(proid:number,category_id:number,form_type:string,category_level:any,subscatid:number){
    var url = '"'+category_level+'"';
    // this.navCtrl.navigateRoot('/pages/productdetailspage?subscatid='+subscatid+'&categoryid='+category_id+'&proid='+proid+'&categorylevelname='+url);

    this.router.navigate(['/pages/productdetailspage'], {queryParams : {subscatid:subscatid,categoryid:category_id,proid:proid,categorylevelname:url}});
  }

  OpenPropertyProduct(){
    this.navCtrl.navigateRoot('tabs/tab2?maincatid=2');
  }


  Gotodescription(id:number,subcatid:number,subsubcatid:number,form_type:string,category_id:number,category_level:any){
   

    if(subsubcatid >= 230 && subsubcatid <= 241){
      this.router.navigate(['/pages/propertyproductdetails'], {  queryParams: {  catid: subsubcatid,proid:id } });
      
    }else if(subcatid>=38 && subcatid<=42 || subcatid==51 || subcatid==52 || subcatid==70  || subcatid==69 ){

      if(form_type == "SparePart"){
        this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id,formname:"\""+form_type+"\"" } });
      }else{
        this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id,formname:"\""+form_type+"\""  } });
      }
     

    }else if(subsubcatid == 250 || subsubcatid == 251){

      this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id,formname:"\""+form_type+"\"" } });
      
    }else if((category_id>=27 && category_id<=31 ) || (category_id>=53 && category_id<=61)){
      
      this.router.navigate(['/pages/shopdetailspage'], {  queryParams: {  shopid: id,getshopid:category_id,activeTab:1 } });

    }else if(subsubcatid == 21 || subsubcatid == 22 || subsubcatid == 23 || subsubcatid == 24 || subsubcatid == 25 || subsubcatid == 67 || subsubcatid == 68){
      this.router.navigate(['/pages/petsproductdetail'], {  queryParams: {  subcatid: subsubcatid,proid:id } });
    }
    else if(subcatid==71){
      this.router.navigate(['/pages/petsproductdetail'], {  queryParams: {  subcatid: subcatid,proid:id } });
    }
    else if(form_type == "Marketplace"){

      this.router.navigate(['/pages/productdetailspage'], {  queryParams: {  subscatid: subsubcatid,categoryid:category_id,proid:id,categorylevelname:"\""+category_level+"\"" } });
     
    }
  }

  
  gotoInformationPage(){
    this.navCtrl.navigateRoot('pages/contactpage');
  }
  gotoMenu(){
    this.navCtrl.navigateRoot('tabs/tab2?maincatid=2');
  }
  gotToSearch(){
    this.navCtrl.navigateRoot('tabs/tab4');
  }
  OpenPetPage(){
    this.navCtrl.navigateRoot('tabs/tab2?maincatid=5');
  }
  OpenautoPage(){
    this.navCtrl.navigateRoot('tabs/tab2?maincatid=3');
  }

  openPropertyProductDetailPage(proid:number,subsubcatid:number){
    // console.log(proid,subsubcatid);
    // this.navCtrl.navigateRoot('/pages/propertyproductdetails?catid='+subsubcatid+'&proid='+proid);

    this.router.navigate(['/pages/propertyproductdetails'], { queryParams : {catid:subsubcatid,proid:proid}});
  }

  openpetdetails(id:number,subsubcatid:number){
    this.router.navigate(['/pages/petsproductdetail'], {  queryParams: {  subcatid: subsubcatid,proid:id } });
  }

  openautomotardetailpage(id:number,subsubcatid:number){
    this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id  } });
  }

  // gotToS(){
  //   this.navCtrl.navigateRoot('/pages/testpage');
  // }
}
