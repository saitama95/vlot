import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PropertyadsformPageRoutingModule } from './propertyadsform-routing.module';
import { PropertyadsformPage } from './propertyadsform.page';
import { AddimageComponent } from 'src/app/components/addimage/addimage.component';
import { UserContactComponent } from 'src/app/components/user-contact/user-contact.component';
import { TextareafieldComponent } from 'src/app/components/textareafield/textareafield.component';
import { CheckboxfieldComponent } from 'src/app/components/checkboxfield/checkboxfield.component';
import { RadiofieldModule } from 'src/app/components/radiofield/radiofield-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyadsformPageRoutingModule,
    ReactiveFormsModule,
    RadiofieldModule
  ],
  declarations: [PropertyadsformPage,AddimageComponent,UserContactComponent,TextareafieldComponent,
    CheckboxfieldComponent
  ]
})
export class PropertyadsformPageModule {}
