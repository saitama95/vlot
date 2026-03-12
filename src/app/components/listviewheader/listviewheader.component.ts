import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listviewheader',
  templateUrl: './listviewheader.component.html',
  styleUrls: ['./listviewheader.component.scss'],
  standalone:false
})
export class ListviewheaderComponent  implements OnInit {

  @Output() propertyType = new EventEmitter<any>;
  propcatcatid:number=0;
  subsubcatName:string="";
  constructor(
    private navCtrl:NavController
  ) { }

  ngOnInit() {}

  goback(){
      this.navCtrl.back();
  }

  gotosearch(){

  }

 

    gotoFilterpage(){}
     gotoHausRentFilterpage(){}
     gotoApartmentSellFilterpage(){}
     gotoApartmentRentFilterpage(){}
     gotoGrundstuckFilterpage(){}
     gotoCommercialSellFilterpage(){}
     gotoCommercialRentFilterpage(){}
     gotoFerienSellFilterpage(){}
     gotoFerienRentFilterpage(){}
     gotoSonstigepropSellFilterpage(){}

     getAllPropertyData(event:any,type:string){
      this.propertyType.emit(type)
     }

     changeView(event:any,viewtype:string){
      
     }
}
