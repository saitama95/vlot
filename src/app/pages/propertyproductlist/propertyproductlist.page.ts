import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { VerAPI } from 'src/app/services/ver-api';
import { Commonservices } from 'src/app/shared/commonservices';

@Component({
  selector: 'app-propertyproductlist',
  templateUrl: './propertyproductlist.page.html',
  styleUrls: ['./propertyproductlist.page.scss'],
  standalone:false
})
export class PropertyproductlistPage implements OnInit {

  constructor(
    private navCtrl : NavController,
    private route : ActivatedRoute,
    protected commonServices:Commonservices,
    private verapi:VerAPI,
  ) {}

  propcatcatid:number=0;
  getpropertyId:number=0;
  testvarible="";
  properType="";
  peventLoading=true;

  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
      if (params && params.propcatid || params.getpropertyId) {   
        this.propcatcatid = params.propcatid;
        this.getpropertyId = params.getpropertyId;
        this.getHouseSellProperty();
      }
    });
  }

  propertyListarr:any[]=[];
  getHouseSellProperty(properType="all"){
    if(!this.peventLoading) return 
    this.verapi.getHouseSellList(properType).pipe(
      finalize(()=>{
        this.peventLoading=false;
      })
    ).subscribe({
      next:(res:any)=>{
        this.propertyListarr = res['records'];
        console.log(this.propertyListarr);
      }
    })
  }

  propertyType(properType:any){
      this.peventLoading=true;
      this.getHouseSellProperty(properType)
  }

 
  viewDetails(proid:number){
    this.navCtrl.navigateForward(`pages/propertyproductdetails?proid=${proid}`)
  }

  gotoFilterPage(){
    this.navCtrl.navigateForward(`pages/housesellfilter?subsubcatid=230&subcatid=32`)
  }
}
