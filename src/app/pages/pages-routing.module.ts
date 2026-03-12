import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'offlinepage',
    loadChildren: () => import('./offlinepage/offlinepage.module').then( m => m.OfflinepagePageModule)
  },
  {
    path: 'automotorproductdetail',
    loadChildren: () => import('./automotorproductdetail/automotorproductdetail.module').then( m => m.AutomotorproductdetailPageModule)
  },
  {
    path: 'propertyadsplace',
    loadChildren: () => import('./propertyadsplace/propertyadsplace.module').then( m => m.PropertyadsplacePageModule)
  },
  {
    path: 'propertyadsform',
    loadChildren: () => import('./propertyadsform/propertyadsform.module').then( m => m.PropertyadsformPageModule)
  },
  {
    path: 'propertyproductdetails',
    loadChildren: () => import('./propertyproductdetails/propertyproductdetails.module').then( m => m.PropertyproductdetailsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
