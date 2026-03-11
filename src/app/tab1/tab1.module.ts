import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { LoadingComponent } from '../components/loading/loading.component';
import { register } from 'swiper/element/bundle';
import { MarketPetAutoheaderModule } from '../components/market-pet-autoheader/market-pet-autoheader-module';
register();
@NgModule({
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule,
    Tab1PageRoutingModule,
    MarketPetAutoheaderModule
  ],
  declarations: [Tab1Page,LoadingComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}
