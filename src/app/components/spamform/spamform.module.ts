import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpamformPageRoutingModule } from './spamform-routing.module';

import { SpamformPage } from './spamform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpamformPageRoutingModule
  ],
  declarations: [SpamformPage]
})
export class SpamformPageModule {}
