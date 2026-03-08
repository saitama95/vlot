import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyadsplacePageRoutingModule } from './propertyadsplace-routing.module';

import { PropertyadsplacePage } from './propertyadsplace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyadsplacePageRoutingModule
  ],
  declarations: [PropertyadsplacePage]
})
export class PropertyadsplacePageModule {}
