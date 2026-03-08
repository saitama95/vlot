import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ObjekttypComponent } from '../modal/objekttyp/objekttyp.component';
import { RadiofieldComponent } from './radiofield.component';



@NgModule({
  declarations: [
    ObjekttypComponent,
    RadiofieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports:[
    RadiofieldComponent
  ]
})
export class RadiofieldModule { }
