import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjekttypComponent } from '../modal/objekttyp/objekttyp.component';
import { ObjekttypfieldComponent } from './objekttypfield.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ObjekttypComponent,
    ObjekttypfieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    ObjekttypfieldComponent   // ✅ Only export the selector
  ]
})
export class ObjekttypfieldModule { }
