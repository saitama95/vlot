import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AddimageComponent } from 'src/app/components/addimage/addimage.component';
import { VerAPI } from 'src/app/services/ver-api';
import { Commonservices } from 'src/app/shared/commonservices';

@Component({
  selector: 'app-propertyadsform',
  templateUrl: './propertyadsform.page.html',
  styleUrls: ['./propertyadsform.page.scss'],
  standalone:false
})
export class PropertyadsformPage implements OnInit {
  
  @ViewChild('addImageRef') addImageRef!: AddimageComponent;

  active_ichbtn="background: #1eb41e;"
  active_ichbtn_para="background: rgb(233, 98, 26);border: 1px solid rgb(233, 98, 26);font-size: 12px;color: #fff;font-weight: 600;margin: auto;width: 80%;";
  warningbtn = "Anzeige";
  ichcontainer = true; 
  selltype:string="Makler";
  loading=false;
  myForm!: FormGroup;
  user_id=2;
  form_type="";
  main_cat_id=2;
  subcatid=3
  subsubcatid=4;

   submit() {
      let data = {
        ...this.myForm.value,
        user_id:this.user_id,
        main_cat_id:this.main_cat_id,
        subcatid:this.subcatid,
        subsubcatid:this.subsubcatid,
        form_type:this.form_type
      }
      this.loading = true;
      this.verapi.posthausselldata(data)
      .pipe(
        finalize(() => {      
          this.loading = false;
        })
      )
      .subscribe({ 
        next: (response:any) => {
            if(response?.status){
              this.addImageRef.proId  = response.id;
              this.addImageRef.form_type = this.form_type;
              this.addImageRef.user_id = this.user_id;
              this.addImageRef.uploadAll();
            }
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }

   constructor(
    private fb: FormBuilder,
    protected commonServices:Commonservices,
    private verapi:VerAPI
    ) {
    
  }

  
  ngOnInit() {
    this.initForm();
    this.changepricemode('Anzeige')
  }

  initForm(){
    this.myForm = this.fb.group({
      title_name: ['', Validators.required],
      country: ['',Validators.required],
      pincode: ['',Validators.required],
      city: ['', Validators.required],
      statename:[''],
      district:[''],
      street_address: [''],
      grundflache:[''],
      no_of_rooms:['',Validators.required],
      zustand:['',Validators.required],  

      wohnflache: ['', Validators.required],
      price_type: ['', Validators.required],
      price:      ['', Validators.required],
      hwb:[''],
      hwb_energie:[''],
      fgee:[''],
      fgee_energie:[''],

      tourLink: [''],
      objektInfo: [''],
      ZustandLink: [''],
      Verkaf: [''],

      objekttyp:['',Validators.required],
      heizung:[''],
      boden:[''],
      ausstattung:[''],
      bautyp:[''],
      lage:[''],
      sonstiges:[''],
      availabilitymodalData:[''],
      Objektbeschreibung:['',Validators.required],
      balkonvalue:[''],
      dachterrassevalue:[''],
      gartenvalue:[''],
      loggiavalue:[''],
      terrassevalue:[''],
      wintergartenvalue:[''],
      
     

      maklerprovision:[''],
      ablose:[''],
      wohnbauf_val:[''],
      betriebskosten:[''],
      betriebskosten_exkl:[''],
      heizkosten:[''],
      sonstige_exkl:[''],
      monatliche_inkl:[''],
      monatliche_mwst:[''],
      zusatzinformation:[''],

   

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
  }

get price_type()  { return this.myForm.get('price_type'); }
get price()       { return this.myForm.get('price'); }
// KOSTENLOS getters
get vonwoh()   { return this.myForm.get('vonwoh'); }
get biswoh()   { return this.myForm.get('biswoh'); }
get vonValue() { return this.myForm.get('vonValue'); }
get bisValue() { return this.myForm.get('bisValue'); }

  get title_name() { return this.myForm.get('title_name'); }
  get country() { return this.myForm.get('country'); }
  get pincode() { return this.myForm.get('pincode'); }
  get city() { return this.myForm.get('city'); }
  get wohnflache() { return this.myForm.get('wohnflache'); }
  get no_of_rooms() { return this.myForm.get('no_of_rooms'); }
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
      wohnbauf_val:        data.wohnbauf_val,
      betriebskosten:      data.Betriebskosten,
      betriebskosten_exkl: data.Betriebskosten_exkl,
      heizkosten:          data.Heizkosten,
      sonstige_exkl:       data.Sonstige_exkl,
      monatliche_inkl:     data.Monatliche_inkl,
      monatliche_mwst:     data.Monatliche_mwst,
      zusatzinformation:   data.zusatzinformation,
    });
  }

  onContactSubmit(data: any) {
  this.myForm.patchValue({
    user_name:             data.user_name,
    nachname:              data.nachname,
    firmenname:            data.firmenname,
    email:                 data.email,
    weitere_homepage:      data.weitere_homepage,
    handynumber:           data.handynumber,
    weitere_telefono:      data.weitere_telefono,
    weitere_telefono2:     data.weitere_telefono2,
    weitere_fax:           data.weitere_fax,
    weitere_immocard:      data.weitere_immocard,
    immocard_firma:        data.immocard_firma,
    zusatzliche_name:      data.zusatzliche_name,
    zusatzliche_firmname:  data.zusatzliche_firmname,
    zusatzliche_homepage:  data.zusatzliche_homepage,
    zusatzliche_telefono:  data.zusatzliche_telefono,
    zusatzliche_telefono2: data.zusatzliche_telefono2,
    zusatzliche_fax:       data.zusatzliche_fax,
    zusatzliche_ohenat:    data.zusatzliche_ohenat,
    zusatzliche_firmid:    data.zusatzliche_firmid,
  });
}


    
    changepricemode(type: string) {
      if (type === 'Anzeige' && !this.ichcontainer) {
        this.ichcontainer = true;
        // remove KOSTENLOS fields
        this.myForm.removeControl('vonwoh');
        this.myForm.removeControl('biswoh');
        this.myForm.removeControl('vonValue');
        this.myForm.removeControl('bisValue');
        // add Anzeige fields
        this.myForm.addControl('wohnflache', this.fb.control('', Validators.required));
        this.myForm.addControl('price_type', this.fb.control('', Validators.required));
        this.myForm.addControl('price',      this.fb.control('', Validators.required));

      


      } else if (type === 'KOSTENLOS' && this.ichcontainer) {
        this.ichcontainer = false;
        // remove Anzeige fields
        this.myForm.removeControl('wohnflache');
        this.myForm.removeControl('price_type');
        this.myForm.removeControl('price');
        
        // add KOSTENLOS fields
        this.myForm.addControl('vonwoh',   this.fb.control('', Validators.required));
        this.myForm.addControl('biswoh',   this.fb.control('', Validators.required));
        this.myForm.addControl('vonValue', this.fb.control('', Validators.required));
        this.myForm.addControl('bisValue', this.fb.control('', Validators.required));

      }
    }

  
 
}
