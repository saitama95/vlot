import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { MarketPetAutoheaderModule } from '../components/market-pet-autoheader/market-pet-autoheader-module';
import { TabViewloadingComponent } from '../components/tab-viewloading/tab-viewloading.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    MarketPetAutoheaderModule
  ],
  declarations: [Tab2Page,TabViewloadingComponent],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2PageModule {}
