import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ObjekttypfieldModule } from '../objekttypfield/objekttypfield-module'; 
import { RadiofieldComponent } from './radiofield.component';

@NgModule({
  declarations: [
    RadiofieldComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ObjekttypfieldModule 
  ],
  exports: [
    RadiofieldComponent
  ]
})
export class RadiofieldModule { }