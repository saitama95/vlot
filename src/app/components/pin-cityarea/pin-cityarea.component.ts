import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pin-cityarea',
  templateUrl: './pin-cityarea.component.html',
  styleUrls: ['./pin-cityarea.component.scss'],
  standalone: false
})
export class PinCityareaComponent implements OnInit {
  @Input() form!: FormGroup;

  cityList: any[] = [];
  get pincode()  { return this.form.get('pincode'); }
  get city()     { return this.form.get('city'); }
  get statename(){ return this.form.get('statename'); }
  get district()  { return this.form.get('district'); }

  ngOnInit() {

  }

   constructor(private http: HttpClient
   ) {}

  getPincode() {
    const pin = this.pincode?.value;
    if (pin.length > 4) return;
    this.http.get<any>(`https://verkaufalles.at/api/country/getcitylistbypincode.php?pincode=${pin}`)
      .subscribe({
        next: (res) => {
          this.cityList = res.records ?? [];   
          if(!this.cityList.length) return;
          this.form.patchValue({ statename: this.cityList[0]?.state_name });
          this.form.patchValue({ district: this.cityList[0]?.district });
        },
        error: (err) => {
          console.error('Pincode API error', err);
          this.cityList = [];
        }
      });
  }
}