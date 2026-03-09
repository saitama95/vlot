import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObjekttypComponent } from '../modal/objekttyp/objekttyp.component';

@Component({
  selector: 'app-radiofield',
  templateUrl: './radiofield.component.html',
  styleUrls: ['./radiofield.component.scss'],
  standalone:false
})
export class RadiofieldComponent  implements OnInit {

  @Input() arrData:any[] = [];
  @Input() label="";
  @Input() objekttyp: any = '';
  @Output() objekttypChange = new EventEmitter<string>();  
  @Input() isInvalid: boolean = false
  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  async openObjekttyp(): Promise<void> {
    const modal = await this.modalController.create({
      component: ObjekttypComponent,
      componentProps: {
        data: this.objekttyp,
        arrdata:this.arrData
      }
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss<{ selectedValue: string }>();
    console.log(data);
    if (data) {
      this.objekttyp = data;          
      this.objekttypChange.emit(this.objekttyp); 
    }else{
      this.isInvalid = true;
    }
  }

}
