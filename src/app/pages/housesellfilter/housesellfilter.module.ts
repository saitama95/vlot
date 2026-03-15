import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HousesellfilterPageRoutingModule } from './housesellfilter-routing.module';

import { HousesellfilterPage } from './housesellfilter.page';
import { FilterModule } from 'src/app/filtercomponents/filter-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterModule,
    HousesellfilterPageRoutingModule
  ],
  declarations: [HousesellfilterPage]
})
export class HousesellfilterPageModule {}
