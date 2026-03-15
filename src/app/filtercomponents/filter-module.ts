import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FilterheaderComponent } from './filterheader/filterheader.component';
import { BreadcrumbsfeildComponent } from './breadcrumbsfeild/breadcrumbsfeild.component';
import { PricefilterfieldComponent } from './pricefilterfield/pricefilterfield.component';
import { WohnflachefilterfieldComponent } from './wohnflachefilterfield/wohnflachefilterfield.component';
import { CheckboxfilterfieldComponent } from './checkboxfilterfield/checkboxfilterfield.component';
import { BundeslandComponent } from './bundesland/bundesland.component';



@NgModule({
  declarations: [
    CheckboxfilterfieldComponent,
    FilterheaderComponent,
    BreadcrumbsfeildComponent,
    PricefilterfieldComponent,
    WohnflachefilterfieldComponent,
    BundeslandComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports:[
    CheckboxfilterfieldComponent,
    FilterheaderComponent,
    BreadcrumbsfeildComponent,
    PricefilterfieldComponent,
    WohnflachefilterfieldComponent,
    BundeslandComponent
  ]
})
export class FilterModule { }
