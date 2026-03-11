import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-linkzu',
  templateUrl: './linkzu.component.html',
  styleUrls: ['./linkzu.component.scss'],
  standalone:false
})
export class LinkzuComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @Input() label = '';
  @Output() formSubmit = new EventEmitter<any>();

  displayParts: { label: string; val: string }[] = [];
  linkmodalForm!: FormGroup;
  urlErrors: { [key: string]: boolean } = {};

  linkFields = [
    { title: '360', sup: 'o', control: 'tour_link',   label: 'TOUR LINK'          },
    { title: 'OBJEKTINFORMATIONEN', sup: null, control: 'objekt_info', label: 'OBJEKTINFORMATIONEN' },
    { title: 'ZUSTANDSBERICHT',     sup: null, control: 'ZustandLink',     label: 'ZUSTANDSBERICHT'     },
    { title: 'VERKAUFSBERICHT',     sup: null, control: 'verkaf',      label: 'VERKAUFSBERICHT'     },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.linkmodalForm = this.fb.group({
      tour_link:   [''],
      objekt_info: [''],
      ZustandLink:     [''],
      verkaf:      [''],
    });
  }

  validateUrl(event: any, control: string) {
    const val = event.detail.value ?? '';
    if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
      this.urlErrors[control] = true;
    } else {
      this.urlErrors[control] = false;
    }
  }

 openModal(){
    this.modal.present();
  }

  goback(){
    this.modal.dismiss(null, 'cancel');
  }

 submitData() {
  const hasErrors = Object.values(this.urlErrors).some(e => e);
  if (hasErrors) return;

  const value = this.linkmodalForm.value;

  this.displayParts = [
    { label: '360° Tour Link',      val: value.tour_link   },
    { label: 'Objektinformationen', val: value.objekt_info },
    { label: 'Zustandsbericht',     val: value.ZustandLink     },
    { label: 'Verkaufsbericht',     val: value.verkaf      },
  ].filter(p => p.val !== '' && p.val != null);

  this.formSubmit.emit(value);
  this.goback();
}
  reset(){
    this.linkmodalForm.reset();
    this.displayParts=[];
  }
}
