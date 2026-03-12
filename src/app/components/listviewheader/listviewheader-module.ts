import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListviewheaderComponent } from './listviewheader.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ListviewheaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports:[ListviewheaderComponent]
})
export class ListviewheaderModule { }
