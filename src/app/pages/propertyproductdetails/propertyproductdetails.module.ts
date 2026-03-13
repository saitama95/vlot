import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyproductdetailsPageRoutingModule } from './propertyproductdetails-routing.module';

import { PropertyproductdetailsPage } from './propertyproductdetails.page';
import { DetailheaderComponent } from 'src/app/components/detailheader/detailheader.component';
import { GermanNumberPipe } from 'src/app/pipe/germanNumberPipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyproductdetailsPageRoutingModule
  ],
  declarations: [PropertyproductdetailsPage,DetailheaderComponent,GermanNumberPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyproductdetailsPageModule {}
