import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyproductlistPage } from './propertyproductlist.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyproductlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyproductlistPageRoutingModule {}
