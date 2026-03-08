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
  ichcontainer=false;
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
      state: [''],
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
      bautyp:['']
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

  get objekttypValue(): string {
     return this.objekttyp?.value ?? ''; 
  }
   get ObjektbeschreibungValue(): string {
     return this.Objektbeschreibung?.value ?? ''; 
  }
  ngOnInit() {
  }

    changepricemode(type:any){
    if(type != this.warningbtn){
      this.ichcontainer = !this.ichcontainer;
      if(this.ichcontainer == false){
        if(this.selltype == 'Gewerblich' || this.selltype == 'privat' || this.selltype == 'Privat'){}
           this.myForm.removeControl('vonwoh');
           this.myForm.removeControl('biswoh');
           this.myForm.removeControl('vonValue');
           this.myForm.removeControl('bisValue');
      }else{
        this.myForm.addControl('vonwoh', this.fb.control(''));
        this.myForm.addControl('biswoh', this.fb.control(''));
        this.myForm.addControl('vonValue', this.fb.control(''));
        this.myForm.addControl('bisValue', this.fb.control(''));
      }
      this.warningbtn = type;
    }
  }

  submit(){
    console.log(this.myForm.value);
  }

  
}
