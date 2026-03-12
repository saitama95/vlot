import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyproductlistPageRoutingModule } from './propertyproductlist-routing.module';

import { PropertyproductlistPage } from './propertyproductlist.page';
import { ListviewheaderModule } from 'src/app/components/listviewheader/listviewheader-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyproductlistPageRoutingModule,
    ListviewheaderModule
  ],
  declarations: [PropertyproductlistPage]
})
export class PropertyproductlistPageModule {}
