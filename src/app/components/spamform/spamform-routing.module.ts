import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpamformPage } from './spamform.page';

const routes: Routes = [
  {
    path: '',
    component: SpamformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpamformPageRoutingModule {}
