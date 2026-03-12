import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { VerAPI } from 'src/app/services/ver-api';

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
    private verapi:VerAPI,
  ) { }

  propcatcatid:number=0;
  getpropertyId:number=0;
  testvarible="";
  properType=""
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
    this.verapi.getHouseSell(properType).pipe(
      finalize(()=>{

      })
    ).subscribe({
      next:(res:any)=>{
        this.propertyListarr = res['records'];
        console.log(this.propertyListarr);
      }
    })
  }

  propertyType(properType:any){
      this.getHouseSellProperty(properType)
  }

  hideHeader = false;
  lastScrollTop = 0;
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    if (scrollTop > this.lastScrollTop && scrollTop > 50) {
      this.hideHeader = true;
    } else {
      this.hideHeader = false;
    }
    this.lastScrollTop = scrollTop;
  }
}
