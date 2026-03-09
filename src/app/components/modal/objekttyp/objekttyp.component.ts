import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-objekttyp',
  templateUrl: './objekttyp.component.html',
  styleUrls: ['./objekttyp.component.scss'],
  standalone:false,
})
export class ObjekttypComponent  implements OnInit {

  @Input () arrdata:any[] = []
  @Input() data: string="";
  selectedRadioBtn:string="";
  
  constructor(
    private modalController: ModalController
  ) { 
   }
  
  ngOnInit() {
  }
  
  async radioGroupChange(event:any) {
    this.selectedRadioBtn = event.detail.value;
    const close: string = this.selectedRadioBtn;
    await this.modalController.dismiss(close);
  }


  async goback(){
    const close: string = this.selectedRadioBtn;
    await this.modalController.dismiss(close);
  }

}
