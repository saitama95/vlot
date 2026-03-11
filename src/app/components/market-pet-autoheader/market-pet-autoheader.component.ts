import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-market-pet-autoheader',
  templateUrl: './market-pet-autoheader.component.html',
  styleUrls: ['./market-pet-autoheader.component.scss'],
  standalone:false
})
export class MarketPetAutoheaderComponent  implements OnInit {

  constructor(
    private navCtrl : NavController,
  ) { }

  ngOnInit() {}

  viewcategoryPage(main_cat_id:number){
    this.navCtrl.navigateRoot('tabs/tab2?maincatid='+main_cat_id);
  }
}
