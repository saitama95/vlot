import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HousesellfilterPage } from './housesellfilter.page';

const routes: Routes = [
  {
    path: '',
    component: HousesellfilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousesellfilterPageRoutingModule {}
