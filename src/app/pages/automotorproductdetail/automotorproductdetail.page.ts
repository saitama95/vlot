import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-automotorproductdetail',
  templateUrl: './automotorproductdetail.page.html',
  styleUrls: ['./automotorproductdetail.page.scss'],
  standalone:false
})
export class AutomotorproductdetailPage implements OnInit {

  carautoid : any;
  carproductid : any;
  userid : any;
  getuserDetailsData:any[] = [];
  street_address : any
  city_val : any;
  zipcode : any;
  country : any;
  first_name : any;
  last_name : any;
  mobile_number : any;
  user_email : any;
  getProductDetailData:any[] = [];
  newaustatungval : any;
  getprivatautoProductDetailData:any[] = [];
  privatnewaustatungval : any;
  getturbomotorradProductDetailData:any[] = [];
  tubomotorradnewaustatungval : any;
  getPrivatmotorradProductDetailData:any[] = [];
  Privatemotorradnewaustatungval : any;
  getPickupBasisProductDetailData:any[] = [];
  pickupnewausstatungval :  any;
  getprivatPickupBasisProductDetailData:any[] = [];
  privatpickupnewausstatungval :  any;
  getWohnimmobBasisProductDetailData:any[] = [];
  wohnimmonewausstatungval : any;

  getprivatWohnimmobProdDetailData:any[] = [];
  privatwohnimmonewausstatungval : any;
  getcarReifenProdDetailData:any[] = [];
  getmotorradReifenProdDetailData:any[] = [];
  getlkwReifenProdDetailData:any[] = [];
  gettracktorReifenProdDetailData:any[] = [];
  getQuadReifenProdDetailData:any[] = [];
  formname : any;
  getBatteryProdDetailData:any[] = [];
  getFelgenProdDetailData:any[] = [];
  getFahrradProdDetailData:any[] = [];
  getEBikesProdDetailData:any[] = [];
  getFahrradSpareProdDetailData:any[] = [];
  getEbikeProdDetailData:any[] = [];
  getstahlrimProdDetailData:any[] = [];
  getprivatboatProdDetailData:any[] = [];
  getcommercialboatProdDetailData:any[] = [];
  subcatid : any[] = [];
  getsparePartData:any[] = [];
  apiobj=[
    // {url:"https://verkaufalles.at/api/automotorproduct/getoldtimercarproductlist.php?user_id",id:780},
    // {url:"https://verkaufalles.at/api/automotorproduct/getnewcarproductlist.php?user_id",id:781},
    // {url:"https://verkaufalles.at/api/automotorproduct/getdemocarproductlist.php?user_id",id:783},
    // {url:"https://verkaufalles.at/api/automotorproduct/geteautoproductlist.php?user_id",id:782},
  ];

  bikeapiobj=[
    // {url:"https://verkaufalles.at/api/automotorproduct/getbikedetaildata.php?user_id",id:786},
    // {url:"https://verkaufalles.at/api/automotorproduct/getbikedetaildata.php?user_id",id:784},
  ];

   //Motorrad
   website_link : any;
   homepage_link : any;
   selltype="";
   rqstLocation=false;
  constructor(private loadingCtrl: LoadingController,private http : HttpClient,private route : ActivatedRoute,private navCtrl : NavController,private storage: Storage,private platform: Platform,private shared:SharedDataService) {
    this.backbuttonEvent();
      this.initStorage();
   }

  async initStorage() {
    await this.storage.create();
    }

   backbuttonEvent(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goback();
    });
  }
  ngOnInit() {
    this.getProductDetailData =[];
    this.getprivatautoProductDetailData = [];
    this.getturbomotorradProductDetailData = [];
    this.getPrivatmotorradProductDetailData = [];
    this.getPickupBasisProductDetailData = [];
    this.getprivatPickupBasisProductDetailData = [];
    this.getWohnimmobBasisProductDetailData = [];
    this.getprivatWohnimmobProdDetailData = [];
    this.getcarReifenProdDetailData = [];
    this.getmotorradReifenProdDetailData = [];
    this.getlkwReifenProdDetailData = [];
    this.gettracktorReifenProdDetailData = [];
    this.getQuadReifenProdDetailData = [];
    this.getBatteryProdDetailData = [];
    this.getFelgenProdDetailData = [];
    this.getFahrradProdDetailData = [];
    this.getEBikesProdDetailData = [];
    this.getEbikeProdDetailData = [];
    this.getstahlrimProdDetailData = [];
    this.getprivatboatProdDetailData = [];
    this.getcommercialboatProdDetailData = [];


    this.route.queryParams.subscribe((params:any) => {
      this.rqstLocation = (params.location) ? (params.location) : false;
      if (params && params.carautoid && params.proid || params.subcatid || params.formname) {   
        this.carautoid = JSON.parse(params.carautoid);
        this.carproductid = JSON.parse(params.proid);
        this.subcatid = params.subcatid;
        
        if(params.formname){
          this.formname = JSON.parse(params.formname);
        }

        if( this.formname == "SparePart"){
          this.getsparePart(this.carproductid)
        }
        // Car
        if(this.carautoid == 242 || this.carautoid == 780 || this.carautoid == 781 || this.carautoid == 782 || this.carautoid == 783 || this.carautoid == 787 || this.carautoid == 788 || this.carautoid == 789 || this.carautoid == 790){
          this.getProductDetails(this.carproductid);
        }

        //privat car

        if(this.carautoid == 243){
          this.getprivatcarProductDetails(this.carproductid);
        }

        //Motorrad

        if(this.carautoid >= 819 && this.carautoid <= 837){
          this.getturbomotorradProductDetails(this.carproductid);
        }
        // if(this.carautoid == 244){
        //   this.getturbomotorradProductDetails(this.carproductid);
        // }

        //privat Motorrad / Quad

        if(this.carautoid == 245){
          this.getPrivatmotorradProductDetails(this.carproductid);
        }

        // Pickup Basis
        if(this.carautoid >= 838 && this.carautoid <= 867){
          this.getPickupbasisproDetails(this.carproductid);
        }
        // if(this.carautoid == 246){
        //   this.getPickupbasisproDetails(this.carproductid);
        // }


        if(this.carautoid == 247){
          this.getPrivatPickupProductDetails(this.carproductid);
        }

        //  WohnImmobilen Basis

        if(this.carautoid >= 791 && this.carautoid <= 800){
          this.getWohnimmobilenBasisProductDetails(this.carproductid);
        }
        // if(this.carautoid == 248){
        //   this.getWohnimmobilenBasisProductDetails(this.carproductid);
        // }

        if(this.carautoid == 249){
          this.getPrivatWohnimmobilenProductDetails(this.carproductid);
        }

        //REIFEN PRODUCT LIST
        if((this.carautoid == 251 || this.carautoid == 802) && this.formname == "ALUFELGE"){
          this.getAluFelgeProductDetail(this.carproductid);
        }

        if((this.carautoid == 251 || this.carautoid == 803)  && this.formname == "STAHLFELGE"){
          this.getStahlFelgeProductDetail(this.carproductid);
        }

        if((this.carautoid == 251 || this.carautoid == 804) && this.formname == "BATTERIE"){
          this.getBatterieProductDetail(this.carproductid);
        }

        if((this.carautoid == 250 || this.carautoid == 805) && this.formname == "PKW"){
          this.getcarReifenProductDetail(this.carproductid);
        }

        if((this.carautoid == 250 || this.carautoid == 806) && this.formname == "Motorrad"){
          this.getmotorradReifenProductDetail(this.carproductid);
        }

        if((this.carautoid == 250 || this.carautoid == 807) && this.formname == "LKW"){
          this.getLkwReifenProductDetail(this.carproductid);
        }

        if((this.carautoid == 250 || this.carautoid == 808) && this.formname == "SPEZIAL"){
          this.getSpezialReifenProductDetail(this.carproductid);
        }

        if((this.carautoid == 250 || this.carautoid == 809) && this.formname == "QUAD"){
          this.getQuadReifenProductDetail(this.carproductid);
        }

      

        if((this.carautoid >= 869 && this.carautoid <= 879) || (this.carautoid>=938 && this.carautoid<=944)){
          this.getFahrradProductDetails(this.carproductid);
        }

        if(this.carautoid == 868){
          this.getEBikeProductDetails(this.carproductid);
        }

        if(this.carautoid >= 882 && this.carautoid <= 914){
          //this.getFahrradSpareProductDetails(this.carproductid);
        }

        if(this.carautoid >= 915 && this.carautoid <= 937){
          this.getEbikesProductDetails(this.carproductid);
        }

        if(this.carautoid == 292){
          this.getPrivatBoatProductDetails(this.carproductid);
        }

        if(this.carautoid == 293){
          this.getCommercialBoatProductDetails(this.carproductid);
        }
        if(this.carautoid >= 882 && this.carautoid <= 914){
          this.getBicycleData(this.carproductid);
        }
        this.getdata(this.carautoid,this.carproductid);
        this.getbikedata(this.carautoid,this.carproductid);
      }
    })  
    this.getuserDetails();

    this.legalnotice = "Der Vertrag kommt nicht mit VerkaufAlles zustande, sondern zwischen dem Inserenten und dem Käufer. Rechte und Pflichten aus dem Vertrag sind gegenüber dem Vertragspartner geltend zu machen. Verbraucherschutzrechte der Union sind dennoch nur zwischen Unternehmern und Verbrauchern anwendbar.";
  }
  legalnotice : any;
  
  getuserDetails(){
    Promise.all([this.storage.get("userId")]).then(values => {
     this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/userdetails/getuserdetails.php?userid='+this.userid).subscribe((res:any)=>{
        this.getuserDetailsData = this.getuserDetailsData.concat(res['records']);
        this.street_address = this.getuserDetailsData[0]['street_address'];
        this.city_val = this.getuserDetailsData[0]['city_name'];
        this.zipcode = this.getuserDetailsData[0]['zipcode'];
        this.country = this.getuserDetailsData[0]['country'];
        this.first_name = this.getuserDetailsData[0]['first_name'];
        this.last_name = this.getuserDetailsData[0]['last_name'];
        this.mobile_number = this.getuserDetailsData[0]['mobile_number'];
        this.user_email = this.getuserDetailsData[0]['user_email'];
        this.selltype = this.getuserDetailsData[0]['selltype'];
        
      })
    });
  }


  async postViewData(data:any){
    let ownerId = data[0].user_id;
    const activeUser = await this.storage.get("userId");
    // if(!activeUser) return;
    if(activeUser == ownerId) return;
      let formnewData = {
        prodId : data[0].id,
        subcatid :  data[0].subcatid,
        subsubcatid : data[0].subsubcatid,
        form_type : data[0].form_type,
        userid : activeUser,
        ownerId:ownerId
      }
      this.http.post('https://verkaufalles.at/api/assets/postviewData.php',JSON.stringify(formnewData),{responseType : 'text'}).subscribe((res:any)=>{
        let responsedata = (JSON.parse(res));
      })
  }

  logScrolling(event:any) {
    if(event.detail.deltaY < 0){
      if(event.detail.currentY >=200){
       // document.getElementById('isflags').style.display = "block";
      }else{
        //document.getElementById('isflags').style.display = "none";
      }
    }
  }

  getbicylePartData:any[] = [];
  getBicycleData(id:number){
    this.getbicylePartData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get(`https://verkaufalles.at/api/automotorproduct/getbicyclesparepartlist.php?getdetail=true&prodid=${id}&user_id=${this.userid}`).subscribe((res:any)=>{
        this.getbicylePartData = this.getbicylePartData.concat(res['records']);
        this.postViewData(this.getbicylePartData);
        this.website_link = this.getbicylePartData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getbicylePartData[0].zusatzliche_homepage.replace(/www./g, "");
        console.log(this.getbicylePartData);
        });
    })
  }
  getsparePart(id:number){
    this.getsparePartData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get(`https://verkaufalles.at/api/automotorproduct/getsparepartlist.php?proidtext=getdetail&prodid=${id}&user_id=${this.userid}`).subscribe((res:any)=>{
        this.getsparePartData = this.getsparePartData.concat(res['records']);
        this.postViewData(this.getsparePartData);
        this.website_link = this.getsparePartData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getsparePartData[0].zusatzliche_homepage.replace(/www./g, "");
        });
    })
  }
  
  getProductDetails(proid:number){
    this.getProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getusedcarturboprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getProductDetailData = this.getProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getProductDetailData);
        // console.log(this.getProductDetailData);
        var ausstatung_val = this.getProductDetailData[0]['hinzufugenval'];
        var dataArray = ausstatung_val.split(",");
        this.newaustatungval = dataArray.join("\n");
        this.changeGermanForm();

        this.website_link = this.getProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getprivatcarProductDetails(proid:number){
    this.getprivatautoProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getprivatcarproductdetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getprivatautoProductDetailData = this.getprivatautoProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getprivatautoProductDetailData);
        var ausstatung_vals = this.getprivatautoProductDetailData[0]['hinzufugenval'];
        var dataArrays = ausstatung_vals.split(",");
        this.privatnewaustatungval = dataArrays.join("\n");
        this.changeGermanForm();

        this.website_link = this.getprivatautoProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getprivatautoProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getdata(autid:any,proid:number){
    this.apiobj.map((item:any)=>{
      if(item.id == autid){
        this.getprivatautoProductDetailData=[];
        Promise.all([this.storage.get("userId")]).then(values => {
          this.userid = values[0];
          this.http.get(`${item.url}=${this.userid}&proid=${proid}`).subscribe((res:any)=>{
            this.getprivatautoProductDetailData = this.getprivatautoProductDetailData.concat(res['records']);
            this.postViewData(this.getprivatautoProductDetailData);
              var ausstatung_vals = this.getprivatautoProductDetailData[0]['hinzufugenval'];
              var dataArrays = ausstatung_vals.split(",");
              this.privatnewaustatungval = dataArrays.join("\n");
              this.changeGermanForm();
          });
        })
      }
    });
  }
 

  getturbomotorradProductDetails(proid:any){
    this.getturbomotorradProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getmotorradquadprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getturbomotorradProductDetailData = this.getturbomotorradProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getturbomotorradProductDetailData);
        var ausstatung_value = this.getturbomotorradProductDetailData[0]['hinzufugenval'];
        var dataArraynew = ausstatung_value.split(",");
        this.tubomotorradnewaustatungval = dataArraynew.join("\n");
        this.changeGermanForm();
        this.website_link = this.getturbomotorradProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getturbomotorradProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }


  getPrivatmotorradProductDetails(proid:any){
    this.getPrivatmotorradProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getprivatmotorradprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getPrivatmotorradProductDetailData = this.getPrivatmotorradProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getPrivatmotorradProductDetailData);
        var ausstatung_value = this.getPrivatmotorradProductDetailData[0]['hinzufugenval'];
        var dataArraynew = ausstatung_value.split(",");
        this.Privatemotorradnewaustatungval = dataArraynew.join("\n");
        this.changeGermanForm();

        this.website_link = this.getPrivatmotorradProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getPrivatmotorradProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }


  // Pickup Basis
  
  getPickupbasisproDetails(proid:any){
    this.getPickupBasisProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getpickupbasisprodetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getPickupBasisProductDetailData = this.getPickupBasisProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getPickupBasisProductDetailData);
        var ausstatung_values = this.getPickupBasisProductDetailData[0]['hinzufugenval'];
        var dataArraynews = ausstatung_values.split(",");
        this.pickupnewausstatungval = dataArraynews.join("\n");
        this.changeGermanForm();

        this.website_link = this.getPickupBasisProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getPickupBasisProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getPrivatPickupProductDetails(proid:any){
    this.getprivatPickupBasisProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getprivatpickupprodetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getprivatPickupBasisProductDetailData = this.getprivatPickupBasisProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getprivatPickupBasisProductDetailData);
        var ausstatung_valuess = this.getprivatPickupBasisProductDetailData[0]['hinzufugenval'];
        var dataArraynewss = ausstatung_valuess.split(",");
        this.privatpickupnewausstatungval = dataArraynewss.join("\n");
        this.changeGermanForm();

        this.website_link = this.getprivatPickupBasisProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getprivatPickupBasisProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getWohnimmobilenBasisProductDetails(proid:any){
    this.getWohnimmobBasisProductDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getwohnimmobileprodetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getWohnimmobBasisProductDetailData = this.getWohnimmobBasisProductDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getWohnimmobBasisProductDetailData);
        var ausstatung_valuess = this.getWohnimmobBasisProductDetailData[0]['hinzufugenval'];
        var dataArraynewss = ausstatung_valuess.split(",");
        this.wohnimmonewausstatungval = dataArraynewss.join("\n");
        this.changeGermanForm();

        this.website_link = this.getWohnimmobBasisProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getWohnimmobBasisProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getPrivatWohnimmobilenProductDetails(proid:any){
    this.getprivatWohnimmobProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getprivatwohnimmoprodetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getprivatWohnimmobProdDetailData = this.getprivatWohnimmobProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getprivatWohnimmobProdDetailData);
        var privatausstatung_valuess = this.getprivatWohnimmobProdDetailData[0]['hinzufugenval'];
        var privatdataArraynewss = privatausstatung_valuess.split(",");
        this.privatwohnimmonewausstatungval = privatdataArraynewss.join("\n");
        this.changeGermanForm();

        this.website_link = this.getprivatWohnimmobProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getprivatWohnimmobProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getcarReifenProductDetail(proid:any){
    this.getcarReifenProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/reifenproductdata/getcarreifenprodetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getcarReifenProdDetailData = this.getcarReifenProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getcarReifenProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getcarReifenProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getcarReifenProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getmotorradReifenProductDetail(proid:any){
    this.getmotorradReifenProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/reifenproductdata/getmotorradreifenprodetails.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getmotorradReifenProdDetailData = this.getmotorradReifenProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getmotorradReifenProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getmotorradReifenProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getmotorradReifenProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getLkwReifenProductDetail(proid:any){
    this.getlkwReifenProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/reifenproductdata/getlkwproductdetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getlkwReifenProdDetailData = this.getlkwReifenProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getlkwReifenProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getlkwReifenProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getlkwReifenProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getSpezialReifenProductDetail(proid:any){
    this.gettracktorReifenProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/reifenproductdata/gettractorreifenprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.gettracktorReifenProdDetailData = this.gettracktorReifenProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.gettracktorReifenProdDetailData);
        this.changeGermanForm();

        this.website_link = this.gettracktorReifenProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.gettracktorReifenProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getQuadReifenProductDetail(proid:any){
    this.getQuadReifenProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/reifenproductdata/getquadreifenprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getQuadReifenProdDetailData = this.getQuadReifenProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getQuadReifenProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getQuadReifenProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getQuadReifenProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getAluFelgeProductDetail(proid:any){
    this.getFelgenProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/autoaccesoriesproduct/getallurimprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getFelgenProdDetailData = this.getFelgenProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getFelgenProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getFelgenProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getFelgenProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
    
  }

  getBatterieProductDetail(proid:any){
    this.getBatteryProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/autoaccesoriesproduct/getbatterieproductdetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getBatteryProdDetailData = this.getBatteryProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getBatteryProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getBatteryProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getBatteryProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getbikedata(autid:any,proid:any){
    this.bikeapiobj.map((item:any)=>{
      if(item.id == autid){
        this.getEbikeProdDetailData=[];
        Promise.all([this.storage.get("userId")]).then(values => {
          this.userid = values[0];
          this.http.get(`${item.url}=${this.userid}&proid=${proid}&subsubcatid=${item.id}`).subscribe((res:any)=>{
            
            this.getEbikeProdDetailData = this.getEbikeProdDetailData.concat(res['productdetailsdata']);
            this.postViewData(this.getEbikeProdDetailData);
              this.changeGermanForm();
              this.website_link = this.getEbikeProdDetailData[0].weiter_homepage.replace(/www./g, "");
              this.homepage_link = this.getEbikeProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
              
          });
        })
      }
    });
  }

  getFahrradProductDetails(proid:any){
    this.getFahrradProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getfahrradprodetaildata.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getFahrradProdDetailData = this.getFahrradProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getFahrradProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getFahrradProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getFahrradProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getEBikeProductDetails(proid:any){
    this.getEBikesProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/automotorproduct/getebikeprolist.php?proId='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getEBikesProdDetailData = this.getEBikesProdDetailData.concat(res['records']);
        this.postViewData(this.getEBikesProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getEBikesProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getEBikesProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  // getFahrradSpareProductDetails(proid:any){
  //   this.getFahrradSpareProdDetailData=[];
  //   Promise.all([this.storage.get("userId")]).then(values => {
  //     this.userid = values[0];
  //     this.http.get('https://verkaufalles.at/api/automotorproduct/getfahrradprodetaildata.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
  //       this.getFahrradSpareProdDetailData = this.getFahrradSpareProdDetailData.concat(res['productdetailsdata']);
  //       this.changeGermanForm();

  //       this.website_link = this.getFahrradSpareProdDetailData[0].weiter_homepage.replace(/www./g, "");
  //       this.homepage_link = this.getFahrradSpareProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
  //     });
  //   });
  // }

  getEbikesProductDetails(proid:any){
    this.getEbikeProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      let userid = values[0];
      this.http.get(`https://verkaufalles.at/api/automotorproduct/getfahrzreugedata.php?getdetail=true&prodid=${proid}&user_id=${userid}`).subscribe((res:any)=>{
        this.getEbikeProdDetailData = this.getEbikeProdDetailData.concat(res['records']);
        this.postViewData(this.getEbikeProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getEbikeProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getEbikeProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getStahlFelgeProductDetail(proid:any){
    this.getstahlrimProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/autoaccesoriesproduct/getstahlrimprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getstahlrimProdDetailData = this.getstahlrimProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getstahlrimProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getstahlrimProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getstahlrimProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getPrivatBoatProductDetails(proid:any){
    this.getprivatboatProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/boatproduct/getprivatboatprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getprivatboatProdDetailData = this.getprivatboatProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getprivatboatProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getprivatboatProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getprivatboatProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }

  getCommercialBoatProductDetails(proid:any){
    this.getcommercialboatProdDetailData=[];
    Promise.all([this.storage.get("userId")]).then(values => {
      this.userid = values[0];
      this.http.get('https://verkaufalles.at/api/boatproduct/getcommercialboatprodetail.php?proid='+proid+'&user_id='+this.userid).subscribe((res:any)=>{
        this.getcommercialboatProdDetailData = this.getcommercialboatProdDetailData.concat(res['productdetailsdata']);
        this.postViewData(this.getcommercialboatProdDetailData);
        this.changeGermanForm();

        this.website_link = this.getcommercialboatProdDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getcommercialboatProdDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
    });
  }


  callNow(phoneno:any){
    window.location.href = "tel:"+phoneno;
  }

  goback(){
    this.navCtrl.back();
    // if(this.rqstLocation){
    //     window.history.back();
    // }
    // else if(this.subcatid != ""){
    //   this.navCtrl.navigateRoot('/pages/automotorproductlist?automotorid='+this.carautoid+'&getautoId='+this.subcatid+'&scrollPoint=0&sscatPoint=0')
    // }
   // this.navCtrl.navigateRoot(this.shared.backwithHistroy());
  }

  gotoImageView(id:number,subcatid:number,subsubcatid:number,imageloop_id:number,location:any){
    // this.shared.storeNavtivationHistroy(window.location.href);
    this.navCtrl.navigateRoot(`pages/viewproproduct-image?proid=${id}&subcatid=${subcatid}&subsubcatid=${subsubcatid}&img_id=${imageloop_id}&location=${location}`)
  }
  gotoImageView2(id:number,subcatid:number,subsubcatid:number,imageloop_id:number,location:any,formname:any){
    // this.shared.storeNavtivationHistroy(window.location.href);
    this.navCtrl.navigateRoot(`pages/viewproproduct-image?proid=${id}&subcatid=${subcatid}&subsubcatid=${subsubcatid}&img_id=${imageloop_id}&location=${location}&formname="${formname}"`)
  }

  ViewImages(subscatid:number,proid:number,imageid:number){
    var formname = '"'+this.formname+'"';
    if(this.carautoid == 250 || this.carautoid == 251 || (this.carautoid>=802 && this.carautoid <=809) ){
      this.navCtrl.navigateRoot('/pages/viewproproduct-image?subscatid='+subscatid+'&proid='+proid+'&formname='+formname+'&img_id='+imageid+'&location='+true);
    }else{
      this.navCtrl.navigateRoot('/pages/viewproproduct-image?subscatid='+subscatid+'&proid='+proid+'&img_id='+imageid+'&location='+true);
    }
   
  }

  addtoWishlist(proid:number,form_type:any,event:any){
   if(this.userid){
    if(event.target.getAttribute('value') == 'on'){
      event.target.setAttribute('value','off');
      event.target.setAttribute('name','heart');
    }else if(event.target.getAttribute('value') == 'off'){
      event.target.setAttribute('value','on');
      event.target.setAttribute('name','heart-outline');
    }
    Promise.all([this.storage.get("userId")]).then(values => {
      if(this.userid != ''){
        this.userid = values[0];
        let formdata = {
          proid : proid,
          form_type : form_type,
          userid : this.userid,
        }
        this.http.post('https://verkaufalles.at/api/wishlist/addtowishlist.php',JSON.stringify(formdata),{responseType : 'text'}).subscribe((res:any)=>{

        })
       // this.ngOnInit();
      }
    })
   }else{
    this.shared.checkUserLogin();

   }
   
    
  }

  async changeGermanForm(){
    setTimeout(() => {
      let zimmer = (document.querySelectorAll('.zimmer'));
      zimmer.forEach((item:any)=>{
        let z = (item.textContent);
        item.textContent = z.replace('.',',');
      })
      let engery = (document.querySelectorAll('.energy_form'));
      engery.forEach((item:any)=>{
        let price = parseFloat(item.textContent);
        let news=  price.toLocaleString('de-DE');
        item.textContent = news;
      })
      
      let span = (document.querySelectorAll('.german_form'));
      span.forEach((item:any)=>{

          if(/[a-zA-Z]/g.test(item.textContent)){
            let str = '';
            let val = (item.textContent).split(" ");
            let price = parseFloat(val[0]);
            let newpr = price.toLocaleString('de-DE',{currency: 'EUR', style: 'currency'});
            val[0] = newpr.replace('€','');
            item.textContent = val.join(" ");
          }else{
            let price = parseFloat(item.textContent);
            let newpr;
            // if(item.nextElementSibling!=null){
            //  let news=  price.toLocaleString('de-DE');
            //   item.textContent = news;
            //   console.log(news);
            // }else{
              newpr = price.toLocaleString('de-DE',{currency: 'EUR', style: 'currency'});
              let news = newpr.replace('€','');
              item.textContent = news;
            //}
          }
      })
    },0);
  }

  shareLink(){
    
  }


}
