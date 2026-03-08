import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyadsformPage } from './propertyadsform.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyadsformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyadsformPageRoutingModule {}
