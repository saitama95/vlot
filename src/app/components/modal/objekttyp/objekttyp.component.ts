import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-objekttyp',
  templateUrl: './objekttyp.component.html',
  styleUrls: ['./objekttyp.component.scss'],
  standalone:false,
})
export class ObjekttypComponent  implements OnInit {

  @Input() data: string="";
  selectedRadioBtn:string="";
  objecttypedata = [
    {
    "id" : 1,
    "name" : 'Almhütte/Berghütte'
    },
    {
      "id" : 1,
      "name" : 'Bauernhaus'
    },
    {
      "id" : 1,
      "name" : 'Bungalow'
    },
    {
      "id" : 1,
      "name" : 'Doppelhaushälfte'
    },
    {
      "id" : 1,
      "name" : 'Einfamilienhaus'
    },
    {
      "id" : 1,
      "name" : 'Gartenhaus'
    },
    {
      "id" : 1,
      "name" : 'Genossenschaftshaus'
    },
    {
      "id" : 1,
      "name" : 'Landhaus'
    },
    {
      "id" : 1,
      "name" : 'Mehrfamilienhaus'
    },
    {
      "id" : 1,
      "name" : 'Reihenhaus'
    },
    {
      "id" : 1,
      "name" : 'Rohbau'
    },
    {
      "id" : 1,
      "name" : 'Schloss/Burg/Chalet'
    },
    {
      "id" : 1,
      "name" : 'Villa'
    },
    {
      "id" : 1,
      "name" : 'Sonstige'
    }
    
];
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
