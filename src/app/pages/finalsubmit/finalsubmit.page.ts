import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/shared/storageservices';

@Component({
  selector: 'app-finalsubmit',
  templateUrl: './finalsubmit.page.html',
  styleUrls: ['./finalsubmit.page.scss'],
  standalone:false
})
export class FinalsubmitPage implements OnInit {

    title:string="";
    price:any;
    priceValue:string="";
    formtypetitle:string="";
    formName:string="";
    subcatid:string="";
    tabid:string="";
    categoryid:string="";
    categorylevel:string="";
    id:string="";

    finalprice:string="";
    finalFormtitle:string="";
    uniqueId:any;
    activeuntildate:string="";
    imgsrc='';
    subsubcatid:any;
    todayData:string="";
    cmValue="";
    vonprice="";
    bisvalue="";
    priceFont = "font-size: 14px;"
    status="";

  constructor(
    private navCtrl : NavController,
    private route : ActivatedRoute,
    private storage:StorageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params:any)=>{
      if(params){
        this.title = (params.title) ? (params.title) : '';
        this.price = (params.price) ? (params.price) : '';
        this.priceValue = (params.priceValue) ? (params.priceValue) : '';
        this.formtypetitle = (params.formtypetitle) ? (params.formtypetitle) : '';
        this.formName = (params.formName) ? (params.formName) : '';
        this.id = (params.id) ? (params.id) : '';

        this.subcatid = (params.subcatid) ? (params.subcatid) : '';
        this.subsubcatid = (params.subsubcatid) ? (params.subsubcatid) : '';
        this.categoryid = (params.categoryid) ? (params.categoryid) : '';

        this.categorylevel = (params.categorylevel) ? (params.categorylevel) : '';
        this.status = (params.status) ? (params.status) : '';
        this.tabid = (params.tabid) ? (params.tabid) : '';
        this.cmValue = (params.cm) ? (params.cm) : '';
        this.vonprice = (params.vonprice) ? (params.vonprice) : '';
        this.bisvalue = (params.bisvalue) ? (params.bisvalue) : '';
        
      }
    })
  }
 
    imageData:any[]=[];
   

  goback(){
    this.navCtrl.back();
  }
  homePage(){
    this.navCtrl.navigateRoot(`tabs/tab1`);
  }
  gotoFompage(){

  }
  gotolistpage(){

  }
}
