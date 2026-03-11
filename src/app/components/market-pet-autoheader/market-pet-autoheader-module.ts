import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MarketPetAutoheaderComponent } from './market-pet-autoheader.component';



@NgModule({
  declarations: [
    MarketPetAutoheaderComponent
  ],
  imports: [
     IonicModule,
      CommonModule,
      FormsModule,
  ]
  ,
  exports:[MarketPetAutoheaderComponent]
})
export class MarketPetAutoheaderModule { }
