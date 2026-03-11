import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyproductdetailsPage } from './propertyproductdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyproductdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyproductdetailsPageRoutingModule {}
