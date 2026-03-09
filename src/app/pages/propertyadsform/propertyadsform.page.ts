import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commonservices } from 'src/app/shared/commonservices';

@Component({
  selector: 'app-propertyadsform',
  templateUrl: './propertyadsform.page.html',
  styleUrls: ['./propertyadsform.page.scss'],
  standalone:false
})
export class PropertyadsformPage implements OnInit {
  
  active_ichbtn="background: #1eb41e;"
  active_ichbtn_para="background: rgb(233, 98, 26);border: 1px solid rgb(233, 98, 26);font-size: 12px;color: #fff;font-weight: 600;margin: auto;width: 80%;";
  warningbtn = "Anzeige";
  ichcontainer=true;
  selltype:string="";

  myForm!: FormGroup;
   constructor(
    private fb: FormBuilder,
    protected commonServices:Commonservices,
    ) {
    this.myForm = this.fb.group({
      houseselltitle: ['', Validators.required],
      street_add: [''],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(8)]],
      city: ['', Validators.required],
      statename:[''],
      street_address: [''],
      grundflache:[''],
      wohnflache:['',Validators.required],
      numberofrooms:['',Validators.required],
      zustandid:['',Validators.required],  
      price_type:[''],
      objekttyp:['',Validators.required],
      Objektbeschreibung:['',Validators.required],
      heizung:[''],
      boden:[''],
      ausstattung:[''],
      bautyp:[''],
      lage:[''],
      sonstiges:[''],
      availabilitymodalData:[''],

      balkonvalue:[''],
      dachterrassevalue:[''],
      gartenvalue:[''],
      loggiavalue:[''],
      terrassevalue:[''],
      wintergartenvalue:[''],

      hwb:[''],
      hwb_energie:[''],
      fgee:[''],
      fgee_energie:[''],

      maklerprovision:[''],
      ablose:[''],
      wohnbauförderung:[''],
      betriebskosten:[''],
      betriebskosten_exkl:[''],
      heizkosten:[''],
      sonstige_exkl:[''],
      monatliche_inkl:[''],
      monatliche_mwst:[''],
      zusatzinformation:[''],

      tourLink: [''],
      objektInfo: [''],
      Zustand: [''],
      Verkaf: [''],
    });
  }

  get houseselltitle() { return this.myForm.get('houseselltitle'); }
  get country() { return this.myForm.get('country'); }
  get pincode() { return this.myForm.get('pincode'); }
  get city() { return this.myForm.get('city'); }
  get wohnflache() { return this.myForm.get('wohnflache'); }
  get numberofrooms() { return this.myForm.get('numberofrooms'); }
  get objekttyp() { return this.myForm.get('objekttyp')!; }
  get Objektbeschreibung() { return this.myForm.get('Objektbeschreibung')!; }

  get ObjektbeschreibungValue(): string {
     return this.Objektbeschreibung?.value ?? ''; 
  }

 get objekttypValue(): string {
    return this.myForm.get('objekttyp')?.value ?? '';
  }

  get bautypValue(): string {
  return this.myForm.get('bautyp')?.value ?? '';
  }

  onLageSubmit(data: { lage: string; sonstiges: string }) {
    this.myForm.patchValue({
      lage: data.lage,
      sonstiges: data.sonstiges
    });
  }

  onFreiflachenSubmit(data: {
      balkonvalue: string;
      dachterrassevalue: string;
      gartenvalue: string;
      loggiavalue: string;
      terrassevalue: string;
      wintergartenvalue: string;
    }) {
      this.myForm.patchValue({
        balkonvalue:       data.balkonvalue,
        dachterrassevalue: data.dachterrassevalue,
        gartenvalue:       data.gartenvalue,
        loggiavalue:       data.loggiavalue,
        terrassevalue:     data.terrassevalue,
        wintergartenvalue: data.wintergartenvalue,
      });
    }

  onLinksSubmit(data: any) {
    this.myForm.patchValue({
      tourLink:   data.tour_link,
      objektInfo: data.objekt_info,
      Zustand:    data.zustand,
      Verkaf:     data.verkaf,
    });
    console.log(this.myForm);
  }

  onEnergieSubmit(data: { hwb: string; hwb_energie: string; fgee: string; fgee_energie: string }) {
    this.myForm.patchValue(data);
  }

  onSonstigeSubmit(data: any) {
    this.myForm.patchValue({
      maklerprovision:     data.Maklerprovision,
      ablose:              data.Ablose,
      wohnbauförderung:    data.Wohnbauförderung,
      betriebskosten:      data.Betriebskosten,
      betriebskosten_exkl: data.Betriebskosten_exkl,
      heizkosten:          data.Heizkosten,
      sonstige_exkl:       data.Sonstige_exkl,
      monatliche_inkl:     data.Monatliche_inkl,
      monatliche_mwst:     data.Monatliche_mwst,
      zusatzinformation:   data.zusatzinformation,
    });
  }

  ngOnInit() {
    this.changepricemode('Anzeige')
  }

    
  changepricemode(type:any){
     this.ichcontainer = !this.ichcontainer;
    if(type=='Anzeige'){
      console.log('remove')
        this.myForm.removeControl('vonwoh');
        this.myForm.removeControl('biswoh');
        this.myForm.removeControl('vonValue');
        this.myForm.removeControl('bisValue');    
    }else{
      console.log('add')
        this.myForm.addControl('vonwoh', this.fb.control(''));
        this.myForm.addControl('biswoh', this.fb.control(''));
        this.myForm.addControl('vonValue', this.fb.control(''));
        this.myForm.addControl('bisValue', this.fb.control(''));
    }
  }

  submit(){
    console.log(this.myForm.value);
  }
}
