import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflinepagePage } from './offlinepage.page';

const routes: Routes = [
  {
    path: '',
    component: OfflinepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflinepagePageRoutingModule {}
