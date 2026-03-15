import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { VerAPI } from 'src/app/services/ver-api';

@Component({
  selector: 'app-propertyproductdetails',
  templateUrl: './propertyproductdetails.page.html',
  styleUrls: ['./propertyproductdetails.page.scss'],
  standalone:false
})
export class PropertyproductdetailsPage implements OnInit {

  getProductDetailData:any[]=[];
   productid : any;
  imageproductzoom : any;
  getProductrenthouseData = [];
  getProductsellapartData = [];
  subsubscatid : any;
  getrentapartproductData = [];
  getsellgrundstuckData = [];
  getleasegrundstuckData = [];
  newaustatungval : any; //sell haus
  newaustatungvalrenthause : any;
  newaustatungvalsellapart : any;
  newaustatungvalrentapart : any;
  newaustatungvalsellcommercial : any;
  getgewerbeimmoproductDatas = [];
  getrentgewerbeimmoproductDatas = [];
  getferienImmobilieproductDatas = [];
  getferienrentproductDatas = [];
  userid : any;
  getuserDetailsData = [];
  street_address : any
  city_val : any;
  zipcode : any;
  country : any;
  first_name : any;
  last_name : any;
  mobile_number : any;
  user_email : any;
  newbodenval : any;
  newheizugval : any;

  newbodenrenthausval : any;
  newheizugrenthausval : any;

  newbodensellapartsval : any;
  newheizugsellapartval: any;

  newbodenrentapartsval : any;
  newheizugrentapartval : any;

  newbodensellcommerval : any;
  newheizungsellcommerval : any;

  newaustatungvalrentcommercial : any;
  newbodenrentcommerval : any;
  newheizungrentcommerval : any;

  newaustatungvalsellferien : any;
  newbodensellferienval: any;
  newheizungsellferienval: any;

  newaustatungvalrentferien : any;
  newbodenrentferienval : any;
  newheizungrentferienval : any;

  getsellSontigeproductDatas = [];
  getrentSonstigeproData = [];
  subcatid : any = ""
  legalnotice : any;
  ladezeitData : string="";
  offsetFlag = true;
  selltype="";
  rqstLocation=false;

  tour_link="";
  verkauf="";
  zustand="";
  objekt_info="";
  homepage_link="";
  website_link="";

  proid:number=0;
  constructor(
    private navCtrl:NavController,
    private verapi:VerAPI,
    private route : ActivatedRoute,
    private platform:Platform
  ) { 
    this.handleBackButton();
  }

  slideOpts ={
    initialSlide: 0,
    // loop : true,
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
        let productid = this.proid= JSON.parse(params.proid);
        this.getProductDetails(productid);
    })
    
  }

  handleBackButton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack(); 
    });
  }

   goBack(){
    this.navCtrl.navigateBack(`tabs/propertyproductlist?propcatid=${this.proid}&subcatid=32`);
    }


    getProductDetails(proid:any){
      this.getProductDetailData=[];
      this.verapi.hausselldatadetail(proid,2).subscribe((res:any)=>{
        this.getProductDetailData = this.getProductDetailData.concat(res['productdetailsdata']);
      });
  }
}
