import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-energieausweis',
  templateUrl: './energieausweis.component.html',
  styleUrls: ['./energieausweis.component.scss'],
  standalone:false
})
export class EnergieausweisComponent  implements OnInit {

  displayParts: { label: string; val: string }[] = [];
   @Input() label = '';
  @Output() formSubmit = new EventEmitter<{ hwb: string; hwb_energie: string; fgee: string; fgee_energie: string }>();
  @ViewChild(IonModal) modal!: IonModal;

  energieForm!: FormGroup;
  displayValue: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.energieForm = this.fb.group({
      hwb:         [''],
      hwb_energie: [''],
      fgee:        [''],
      fgee_energie:['']
    });
  }

  openModal() { this.modal.present(); }
  goback()    { this.modal.dismiss(null, 'cancel'); }

  formFields = [
    { label: 'HWB',               control: 'hwb',          placeholder: 'z.B. 45,3', type: 'number' },
    { label: 'HWB Energieklasse', control: 'hwb_energie',  placeholder: 'z.B. A++',  type: 'text'   },
    { label: 'fGEE',              control: 'fgee',         placeholder: 'z.B. 0,85', type: 'number' },
    { label: 'fGEE Energieklasse',control: 'fgee_energie', placeholder: 'z.B. A++',  type: 'text'   },
  ];

  submitEnergiedata() {
    const value = this.energieForm.value;

    this.displayParts = [
      { label: 'HWB',                val: value.hwb          ?? '' },
      { label: 'HWB Energieklasse',  val: value.hwb_energie  ?? '' },
      { label: 'fGEE',               val: value.fgee         ?? '' },
      { label: 'fGEE Energieklasse', val: value.fgee_energie ?? '' },
    ].filter(p => p.val !== '');

    this.displayValue = this.displayParts.length ? 'set' : null;

    this.formSubmit.emit({
      hwb:          value.hwb          ?? '',
      hwb_energie:  value.hwb_energie  ?? '',
      fgee:         value.fgee         ?? '',
      fgee_energie: value.fgee_energie ?? ''
    });

    this.modal.dismiss(null, 'confirm');
  }

}
