import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflinepagePageRoutingModule } from './offlinepage-routing.module';

import { OfflinepagePage } from './offlinepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflinepagePageRoutingModule
  ],
  declarations: [OfflinepagePage]
})
export class OfflinepagePageModule {}
