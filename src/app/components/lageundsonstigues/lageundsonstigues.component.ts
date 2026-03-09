import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-lageundsonstigues',
  templateUrl: './lageundsonstigues.component.html',
  styleUrls: ['./lageundsonstigues.component.scss'],
  standalone:false
})
export class LageundsonstiguesComponent  implements OnInit {

  @Input() label="";
  @ViewChild(IonModal) modal!: IonModal;
  constructor() { }

  ngOnInit() {}
  @Output() formSubmit = new EventEmitter<any>();

  lageModal: string | null = null;
  sonstigesModal: string | null = null;

  LageReactiveFrom = new FormGroup({
    lage: new FormControl(''),
    sonstiges: new FormControl('')
  });

 getFormValue() {
   this.lageModal = this.LageReactiveFrom.get('lage')?.value ?? null;
  this.sonstigesModal = this.LageReactiveFrom.get('sonstiges')?.value ?? null;
    this.formSubmit.emit({
      lage: this.LageReactiveFrom.get('lage')?.value ?? null,
      sonstiges: this.LageReactiveFrom.get('sonstiges')?.value ?? null
    });
    this.modal.dismiss(null, 'confirm');
  }
  
 openModal(){
    this.modal.present();
  }
  
  goback(){
     this.modal.dismiss(null, 'cancel');
  }
}
