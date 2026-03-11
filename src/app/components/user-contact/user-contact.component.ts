import { IonModal } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VerAPI } from 'src/app/services/ver-api';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.scss'],
  standalone: false
})
export class UserContactComponent implements OnInit {

  @Input() selltype:any= '';
  @Input() maincatid = 1;
  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild(IonModal) modal!: IonModal;

  konkactForm!: FormGroup;
  phoneCodeData: any[] = [];
  contactData: any = null;
  mobileVisible = false;
  emailVisible  = false;

  personTel1phonecode = '';
  personTel2phonecode = '';
  othertel1phonecode  = '';
  othertel2phonecode  = '';

  constructor(private fb: FormBuilder, private verapi: VerAPI) {}

  ngOnInit() {
    this.konkactForm = this.fb.group({
      user_name:             [''],
      nachname:              [''],
      firmenname:            [''],
      email:                 [''],
      weitere_homepage:      [''],
      handynumber:           [''],
      weitere_telefono:      [''],
      weitere_telefono2:     [''],
      weitere_fax:           [''],
      weitere_immocard:      [''],
      immocard_firma:        [''],
      zusatzliche_name:      [''],
      zusatzliche_firmname:  [''],
      zusatzliche_homepage:  [''],
      zusatzliche_telefono:  [''],
      zusatzliche_telefono2: [''],
      zusatzliche_fax:       [''],
      zusatzliche_ohenat:    [''],
      zusatzliche_firmid:    [''],
    });
    this.getPhoneCode();
  }

  openModal()  { this.modal.present(); }
  closeback()  { this.modal.dismiss(null, 'cancel'); }
  goback()     { this.submitKonkactForm(); }

  getPersonTel1PhoneCode(val: string) { this.personTel1phonecode = val; }
  getPersonTel2PhoneCode(val: string) { this.personTel2phonecode = val; }
  getTel1PhoneCode(val: string)       { this.othertel1phonecode  = val; }
  getTel2PhoneCode(val: string)       { this.othertel2phonecode  = val; }

  addCheckboxgroup(event: any, group: string) {
    if (group === 'group1') this.mobileVisible = event.detail.checked;
    if (group === 'group2') this.emailVisible  = event.detail.checked;
  }

  removeZero1(control: string, event: any) {
    let val: string = event.detail.value ?? '';
    val = val.replace(/^0+|[ ,.\-]/g, '');
    this.konkactForm.get(control)?.setValue(val, { emitEvent: false });
  }

  getPhoneCode() {
    this.phoneCodeData = [];
    this.verapi.getPhoneCode().subscribe({
      next: (res: any) => {
        this.phoneCodeData = this.phoneCodeData.concat(res['records']);
      }
    });
  }

  setTel(code: string, number: string): string {
    return code ? `${code} ${number}` : number;
  }

  get hasZusatz(): boolean {
    const d = this.contactData;
    if (!d) return false;
    return !!(d.zusatzliche_name || d.zusatzliche_firmname || d.zusatzliche_homepage ||
              d.zusatzliche_telefono || d.zusatzliche_telefono2 || d.zusatzliche_fax ||
              d.zusatzliche_ohenat || d.zusatzliche_firmid);
  }

  submitKonkactForm() {
    const v = this.konkactForm.value;
    this.contactData = {
      ...v,
      weitere_telefono:      this.setTel(this.personTel1phonecode, v.weitere_telefono),
      weitere_telefono2:     this.setTel(this.personTel2phonecode, v.weitere_telefono2),
      zusatzliche_telefono:  this.setTel(this.othertel1phonecode,  v.zusatzliche_telefono),
      zusatzliche_telefono2: this.setTel(this.othertel2phonecode,  v.zusatzliche_telefono2),
    };
    this.formSubmit.emit(this.contactData);
    this.modal.dismiss(null, 'confirm');
  }

  reset(){
    this.contactData = null;
    this.konkactForm.reset();
  }
}