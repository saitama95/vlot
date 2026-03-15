import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-listviewheader',
  templateUrl: './listviewheader.component.html',
  styleUrls: ['./listviewheader.component.scss'],
  standalone:false
})
export class ListviewheaderComponent  implements OnInit {

  @Output() propertyType = new EventEmitter<any>;
  @Output() gotoFilter = new EventEmitter<any>;
  propcatcatid:number=0;
  subsubcatName:string="";
  activeBtn="all";
  constructor(
    private navCtrl:NavController,
    private platform:Platform
  ) { 
    this.handleBackButton();
  }

   handleBackButton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goback(); 
    });
  }

  ngOnInit() {}

  goback(){
      this.navCtrl.navigateBack(`tabs/tab2?maincatid=2`);
  }

  gotosearch(){

  }

 

    gotoFilterpage(){
        this.gotoFilter.emit()
    }
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
      this.activeBtn=type;
      this.propertyType.emit(type)
     }

   
     changeView(event:any,viewtype:string){
      
     }
}
