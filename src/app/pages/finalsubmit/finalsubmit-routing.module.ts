import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalsubmitPage } from './finalsubmit.page';

const routes: Routes = [
  {
    path: '',
    component: FinalsubmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalsubmitPageRoutingModule {}
