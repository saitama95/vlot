import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-housesellfilter',
  templateUrl: './housesellfilter.page.html',
  styleUrls: ['./housesellfilter.page.scss'],
  standalone:false
})
export class HousesellfilterPage implements OnInit {

  constructor(
    private navCtrl : NavController,
    private routes : ActivatedRoute,
  ) { }
  subsubcatid=0;
  subcatid=0;
  ngOnInit() {
     this.routes.queryParams.subscribe((params:any)=>{
       this.subsubcatid = params.subsubcatid;
      this.subcatid = params.subcatid;
     })
  }

  goBack(){
    this.navCtrl.navigateBack(`tabs/propertyproductlist?propcatid=${this.subsubcatid}&subcatid=${this.subcatid}`);
  }

  postFilterdata(){

  }
}
