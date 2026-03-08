import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomotorproductdetailPage } from './automotorproductdetail.page';

const routes: Routes = [
  {
    path: '',
    component: AutomotorproductdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomotorproductdetailPageRoutingModule {}
