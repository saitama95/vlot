import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomotorproductdetailPageRoutingModule } from './automotorproductdetail-routing.module';

import { AutomotorproductdetailPage } from './automotorproductdetail.page';
import { ShowcontactComponentComponent } from 'src/app/components/showcontact-component/showcontact-component.component';
import { SpamReasonComponentComponent } from 'src/app/components/spam-reason-component/spam-reason-component.component';
//import { SpamformPage } from 'src/app/components/spamform/spamform.page';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
register();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomotorproductdetailPageRoutingModule
  ],
  declarations: [AutomotorproductdetailPage,ShowcontactComponentComponent,SpamReasonComponentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutomotorproductdetailPageModule {}
