import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-freiflachen',
  templateUrl: './freiflachen.component.html',
  styleUrls: ['./freiflachen.component.scss'],
  standalone: false
})
export class FreiflachenComponent implements OnInit {
  @Input() label = '';
 @Output() formSubmit = new EventEmitter<{
  balkonvalue: string;
  dachterrassevalue: string;
  gartenvalue: string;
  loggiavalue: string;
  terrassevalue: string;
  wintergartenvalue: string;
}>();
  @ViewChild(IonModal) modal!: IonModal;

  displayParts: { label: string; val: string }[] = [];
   checkedState: { [key: string]: boolean } = {};
  FreiflachenForm!: FormGroup;
  displayValue: string | null = null;

  fields = [
    { label: 'Balkon',       key: 'balkon',       checkControl: 'balkon_check',       valControl: 'balkon_val' },
    { label: 'Dachterrasse', key: 'dachterrasse', checkControl: 'Dachterrasse_check', valControl: 'Dachterrasse_val' },
    { label: 'Garten',       key: 'garten',       checkControl: 'Garten_check',       valControl: 'Garten_val' },
    { label: 'Loggia',       key: 'loggia',       checkControl: 'Loggia_check',       valControl: 'Loggia_val' },
    { label: 'Terrasse',     key: 'terrasse',     checkControl: 'Terrasse_check',     valControl: 'Terrasse_val' },
    { label: 'Wintergarten', key: 'wintergarten', checkControl: 'Wintergarten_check', valControl: 'Wintergarten_val' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.FreiflachenForm = this.fb.group({
      balkon_check:       [false],
      balkon_val:         [''],
      Dachterrasse_check: [false],
      Dachterrasse_val:   [''],
      Garten_check:       [false],
      Garten_val:         [''],
      Loggia_check:       [false],
      Loggia_val:         [''],
      Terrasse_check:     [false],
      Terrasse_val:       [''],
      Wintergarten_check: [false],
      Wintergarten_val:   [''],
    });
  }

  openModal() {
    this.modal.present();
  }

  goback() {
    this.modal.dismiss(null, 'cancel');
  }

  submitData() {
  const value = this.FreiflachenForm.value;
  const selectedFields = this.fields.filter(f => value[f.checkControl]);

  // for template rendering with m² <sup>
  this.displayParts = selectedFields.map(f => ({
    label: f.label,
    val: value[f.valControl] ?? ''
  }));

  this.displayValue = this.displayParts.length ? 'set' : null;

  // emit individual values for each field (backend)
  this.formSubmit.emit({
    balkonvalue:       value['balkon_check']       ? (value['balkon_val']       ?? '') : '',
    dachterrassevalue: value['Dachterrasse_check'] ? (value['Dachterrasse_val'] ?? '') : '',
    gartenvalue:       value['Garten_check']       ? (value['Garten_val']       ?? '') : '',
    loggiavalue:       value['Loggia_check']       ? (value['Loggia_val']       ?? '') : '',
    terrassevalue:     value['Terrasse_check']     ? (value['Terrasse_val']     ?? '') : '',
    wintergartenvalue: value['Wintergarten_check'] ? (value['Wintergarten_val'] ?? '') : '',
  });

  this.modal.dismiss(null, 'confirm');
}

    reset(){
      this.FreiflachenForm.reset();
      this.displayValue=""
    }

    onCheckChange(event: any, key: string) {
      this.checkedState[key] = event.detail.checked;
    }

    onInputClick(key: string) {
      this.checkedState[key] = true;
      this.FreiflachenForm.get(key + '_check')?.setValue(true);
    }
}