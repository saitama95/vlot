import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyproductdetailsPageRoutingModule } from './propertyproductdetails-routing.module';

import { PropertyproductdetailsPage } from './propertyproductdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyproductdetailsPageRoutingModule
  ],
  declarations: [PropertyproductdetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyproductdetailsPageModule {}
