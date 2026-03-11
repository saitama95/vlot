import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  constructor(
    private navCtrl:NavController,
    private verapi:VerAPI,
    private route : ActivatedRoute,
  ) { }

  slideOpts ={
    initialSlide: 0,
    // loop : true,
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
        let productid = JSON.parse(params.proid);
        this.getProductDetails(productid);
    })
    
  }

   goBack(){
    this.navCtrl.back();
    }


    getProductDetails(proid:any){
      this.getProductDetailData=[];
      this.verapi.posthausselldatadetail(proid,2).subscribe((res:any)=>{
        this.getProductDetailData = this.getProductDetailData.concat(res['productdetailsdata']);
        //this.postViewData(this.getProductDetailData);
        // console.log(this.getProductDetailData);
        var ausstatung_val = this.getProductDetailData[0]['ausstatung_val'];
        var dataArray = ausstatung_val.split(",");
        this.newaustatungval = dataArray.join("\n");

        var bodenval = this.getProductDetailData[0]['baden_val'];
        var bodenarray = bodenval.split(",");
        this.newbodenval = bodenarray.join("\n");

        var heizungval = this.getProductDetailData[0]['heizung_val'];
        var heizungvalarray = heizungval.split(",");
        this.newheizugval = heizungvalarray.join("\n");
        //this.changeGermanForm();

        this.tour_link = this.getProductDetailData[0].tour_link.replace(/www./g, "");
        this.objekt_info = this.getProductDetailData[0].objekt_info.replace(/www./g, "");
        this.zustand = this.getProductDetailData[0].zustand.replace(/www./g, "");
        this.verkauf = this.getProductDetailData[0].verkauf.replace(/www./g, "");

        this.website_link = this.getProductDetailData[0].weiter_homepage.replace(/www./g, "");
        this.homepage_link = this.getProductDetailData[0].zusatzliche_homepage.replace(/www./g, "");
      });
  }
}
