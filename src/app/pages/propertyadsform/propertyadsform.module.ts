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
import { LageundsonstiguesComponent } from 'src/app/components/lageundsonstigues/lageundsonstigues.component';
import { VerfugbarkeitComponent } from 'src/app/components/verfugbarkeit/verfugbarkeit.component';
import { FreiflachenComponent } from 'src/app/components/freiflachen/freiflachen.component';
import { EnergieausweisComponent } from 'src/app/components/energieausweis/energieausweis.component';
import { SonstigeComponent } from 'src/app/components/sonstige/sonstige.component';
import { LinkzuComponent } from 'src/app/components/linkzu/linkzu.component';
import { PinCityareaComponent } from 'src/app/components/pin-cityarea/pin-cityarea.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    CheckboxfieldComponent,LageundsonstiguesComponent,VerfugbarkeitComponent,FreiflachenComponent,
    EnergieausweisComponent,SonstigeComponent,LinkzuComponent,PinCityareaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyadsformPageModule {}
