import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IonHeader, IonButton, IonToolbar, IonItem, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-checkboxfilterfield',
  templateUrl: './checkboxfilterfield.component.html',
  styleUrls: ['./checkboxfilterfield.component.scss'],
  standalone:false
})
export class CheckboxfilterfieldComponent  implements OnInit {

  @Input() label:string="";
  constructor() { }
  rentHausZimerData:string="";
  ZimmerData:any[] = [];
  ngOnInit() {}

  @ViewChild(IonModal) modal!: IonModal;
 openModal() { this.modal.present(); }
  goback()    { this.modal.dismiss(null, 'cancel'); }

}
