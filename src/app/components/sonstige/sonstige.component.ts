import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-sonstige',
  templateUrl: './sonstige.component.html',
  styleUrls: ['./sonstige.component.scss'],
  standalone:false
})
export class SonstigeComponent  implements OnInit {
  
  @Input() label = '';
  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild(IonModal) modal!: IonModal;

  Sonstige!: FormGroup;
  displayValue: string | null = null;
  displayParts: { label: string; val: string }[] = [];
  sonstigePreiseParts: { label: string; val: string }[] = [];
  weitereAngabenParts: { label: string; val: string }[] = [];
  zusatzPart: string = '';
  euroFields = [
    { label: 'Betriebskosten (inkl. MwSt.)',   control: 'Betriebskosten'    },
    { label: 'Betriebskosten (exkl. MwSt.)',   control: 'Betriebskosten_exkl' },
    { label: 'Heizkosten (exkl. MwSt.)',        control: 'Heizkosten'        },
    { label: 'Sonstige Kosten (exkl. MwSt.)',   control: 'Sonstige_exkl'     },
    { label: 'Monatliche Kosten (inkl. MwSt.)', control: 'Monatliche_inkl'   },
    { label: 'Monatliche Kosten (exkl. MwSt.)', control: 'Monatliche_mwst'   },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.Sonstige = this.fb.group({
      Maklerprovision:   [''],
      Ablose:            [''],
      wohnbauf_val:      [false],
      Betriebskosten:    [''],
      Betriebskosten_exkl: [''],
      Heizkosten:        [''],
      Sonstige_exkl:     [''],
      Monatliche_inkl:   [''],
      Monatliche_mwst:   [''],
      zusatzinformation: [''],
    });
  }

  openModal() { this.modal.present(); }
  goback()    { this.modal.dismiss(null, 'cancel'); }


  mmValue: string | null = null;
  percValue: string | null = null;



  // getMMvalue(MMval){
  //   this.MMvalue = MMval;
  //   let value = this.MMvalue+' MM + gezl. Mwst'
  //   this.clearField('percenId',value);
  // }

  // getPercvalue(percentVal){
  //   this.PercentValue = percentVal;
  //   let value = this.PercentValue+' % + gezl. Mwst'
  //   this.clearField('mmid',value);
  // }

  //  clearField(elemId,value){
  //   this.Maklerprovisionval = value;
  // }

  
  getMMvalue(event: any, percInput: any) {
    const val = event.detail.value;
    if (val) {
      percInput.value = null; // clear the other input
      this.Sonstige.patchValue({
        Maklerprovision: `${val} MM + gezl. Mwst`
      });
    } else {
      this.Sonstige.patchValue({ Maklerprovision: '' });
    }
  }

  getPercvalue(event: any, mmInput: any) {
    const val = event.detail.value;
    if (val) {
      mmInput.value = null; // clear the other input
      this.Sonstige.patchValue({
        Maklerprovision: `${val} % + gezl. Mwst`
      });
    } else {
      this.Sonstige.patchValue({ Maklerprovision: '' });
    }
  }


  isNumber(val: string): boolean {
    return val !== '' && !isNaN(Number(val));
  }
 SonstigeFormSubmit() {
  const value = this.Sonstige.value;

  this.sonstigePreiseParts = [
    { label: 'Ablöse',           val: value.Ablose            },
    { label: 'Maklerprovision',  val: value.Maklerprovision   },
    { label: 'Wohnbauförderung', val: value.Wohnbauförderung ? 'Ja' : '' },
  ].filter(p => p.val !== '' && p.val != null);

  this.weitereAngabenParts = [
    { label: 'Betriebskosten (inkl. MwSt.)',    val: value.Betriebskosten      },
    { label: 'Betriebskosten (exkl. MwSt.)',    val: value.Betriebskosten_exkl },
    { label: 'Heizkosten (exkl. MwSt.)',         val: value.Heizkosten          },
    { label: 'Sonstige Kosten (exkl. MwSt.)',    val: value.Sonstige_exkl       },
    { label: 'Monatliche Kosten (inkl. MwSt.)',  val: value.Monatliche_inkl     },
    { label: 'Monatliche Kosten (exkl. MwSt.)',  val: value.Monatliche_mwst     },
  ].filter(p => p.val !== '' && p.val != null);

  this.zusatzPart = value.zusatzinformation ?? '';

  this.displayParts = [...this.sonstigePreiseParts, ...this.weitereAngabenParts];

  console.log(value);
  this.formSubmit.emit(value);
  this.modal.dismiss(null, 'confirm');
}

  reset(){
    this.Sonstige.reset();
    this.displayParts =[];
    this.sonstigePreiseParts=[];
  }
}
