import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalsubmitPageRoutingModule } from './finalsubmit-routing.module';

import { FinalsubmitPage } from './finalsubmit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalsubmitPageRoutingModule
  ],
  declarations: [FinalsubmitPage]
})
export class FinalsubmitPageModule {}
