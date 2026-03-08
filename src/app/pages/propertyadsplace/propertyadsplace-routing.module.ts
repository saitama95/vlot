import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyadsplacePage } from './propertyadsplace.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyadsplacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyadsplacePageRoutingModule {}
