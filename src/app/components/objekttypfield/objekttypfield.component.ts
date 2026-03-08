import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObjekttypComponent } from '../modal/objekttyp/objekttyp.component';

@Component({
  selector: 'app-objekttypfield',
  templateUrl: './objekttypfield.component.html',
  styleUrls: ['./objekttypfield.component.scss'],
  standalone: false,
})
export class ObjekttypfieldComponent implements OnInit {
  
  @Input() objekttyp: any = '';
  @Output() objekttypChange = new EventEmitter<string>();  
  @Input() isInvalid: boolean = false
  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  async openObjekttyp(): Promise<void> {
    const modal = await this.modalController.create({
      component: ObjekttypComponent,
      componentProps: {
        data: this.objekttyp
      }
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss<{ selectedValue: string }>();
    if (data) {
      this.objekttyp = data;          
      this.objekttypChange.emit(this.objekttyp); 
    }else{
      this.isInvalid = true;
    }
  }
}