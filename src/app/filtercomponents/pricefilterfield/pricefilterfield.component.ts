import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-pricefilterfield',
  templateUrl: './pricefilterfield.component.html',
  styleUrls: ['./pricefilterfield.component.scss'],
  standalone:false
})
export class PricefilterfieldComponent  implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal;
  @Input() priceplaceholder:string="";
  @Input() tempPrice1placeholder:string="";

  @Output() priceValues = new EventEmitter<any>;
  showtoggle=false;
  constructor() { }
  
  selectprice2:string="";
  selectprice1:string=""
  tempPrice1: string = '';
  tempPrice2: string = '';
  displayPriceMin: number = 0;
  displayPriceMax: number = 0;
  displayPriceRange: string = ''; 
  toggleStatus=false;
  getpricerange1 = [
    {value : 0,range1: '0'},
    {value : 1,range1: '1'},
    {value : 2,range1: '2'},
    {value : 3,range1: '3'},
    {value : 4,range1: '4'},
    {value : 5,range1: '5'},
    {value : 10,range1: '10'},
    {value : 15,range1: '15'},
    {value : 20,range1: '20'},
    {value : 25,range1: '25'},
    {value : 30,range1: '30'},
    {value : 40,range1: '40'},
    {value : 50,range1: '50'},
    {value : 60,range1: '60'},
    {value : 70,range1: '70'},
    {value : 80,range1: '80'},
    {value : 90,range1: '90'},
    {value : 100,range1: '100'},
    {value : 200,range1: '200'},
    {value : 300,range1: '300'},
    {value : 400,range1: '400'},
    {value : 500,range1: '500'},
    {value : 1000,range1: '1000'},
    {value : 2000,range1: '2000'},
    {value : 3000,range1: '3000'},
    {value : 4000,range1: '4000'},
    {value : 5000,range1: '5000'},
    {value : 10000,range1: '10.000'},
    {value : 20000,range1: '20.000'},
    {value : 30000,range1: '30.000'},
    {value : 40000,range1: '40.000'},
    {value : 50000,range1: '50.000'},
    {value : 100000,range1: '100.000'},
    {value : 120000,range1: '120.000'},
    {value : 140000,range1: '140.000'},
    {value : 160000,range1: '160.000'},
    {value : 180000,range1: '180.000'},
    {value : 200000,range1: '200.000'},
    {value : 220000,range1: '220.000'},
    {value : 240000,range1: '240.000'},
    {value : 260000,range1: '260.000'},
    {value : 280000,range1: '280.000'},
    {value : 300000,range1: '300.000'},
    {value : 320000,range1: '320.000'},
    {value : 340000,range1: '340.000'},
    {value : 360000,range1: '360.000'},
    {value : 380000,range1: '380.000'},
    {value : 400000,range1: '400.000'},
    {value : 420000,range1: '420.000'},
    {value : 440000,range1: '440.000'},
    {value : 460000,range1: '460.000'},
    {value : 480000,range1: '480.000'},
    {value : 500000,range1: '500.000'},
  ]

  getpricerange2 = [
    // //{value : 'beliebig',range2: 'beliebig'},
    // {value : 0,range2: '0'},
    {value : 1,range2: '1'},
    {value : 2,range2: '2'},
    {value : 3,range2: '3'},
    {value : 4,range2: '4'},
    {value : 5,range2: '5'},
    {value : 10,range2: '10'},
    {value : 15,range2: '15'},
    {value : 20,range2: '20'},
    {value : 25,range2: '25'},
    {value : 30,range2: '30'},
    {value : 40,range2: '40'},
    {value : 50,range2: '50'},
    {value : 60,range2: '60'},
    {value : 70,range2: '70'},
    {value : 80,range2: '80'},
    {value : 90,range2: '90'},
    {value : 100,range2: '100'},
    {value : 200,range2: '200'},
    {value : 300,range2: '300'},
    {value : 400,range2: '400'},
    {value : 500,range2: '500'},
    {value : 1000,range2: '1000'},
    {value : 2000,range2: '2000'},
    {value : 3000,range2: '3000'},
    {value : 4000,range2: '4000'},
    {value : 5000,range2: '5000'},
    {value : 10000,range2: '10.000'},
    {value : 20000,range2: '20.000'},
    {value : 30000,range2: '30.000'},
    {value : 40000,range2: '40.000'},
    {value : 50000,range2: '50.000'},
    {value : 100000,range2: '100.000'},
    {value : 120000,range2: '120.000'},
    {value : 140000,range2: '140.000'},
    {value : 160000,range2: '160.000'},
    {value : 180000,range2: '180.000'},
    {value : 200000,range2: '200.000'},
    {value : 220000,range2: '220.000'},
    {value : 240000,range2: '240.000'},
    {value : 260000,range2: '260.000'},
    {value : 280000,range2: '280.000'},
    {value : 300000,range2: '300.000'},
    {value : 320000,range2: '320.000'},
    {value : 340000,range2: '340.000'},
    {value : 360000,range2: '360.000'},
    {value : 380000,range2: '380.000'},
    {value : 400000,range2: '400.000'},
    {value : 420000,range2: '420.000'},
    {value : 440000,range2: '440.000'},
    {value : 460000,range2: '460.000'},
    {value : 480000,range2: '480.000'},
    {value : 500000,range2: '500.000'},
  ]
  ngOnInit() {}

  openModal() { this.modal.present(); }
  goback()    { this.modal.dismiss(null, 'cancel'); }
  cutprice(){
    this.selectprice2 = "";
    this.selectprice1="";
    this.tempPrice1='';
    this.tempPrice2= '';
    this.displayPriceMin = 0;
    this.displayPriceMax = 0;
    this.displayPriceRange = '';
  }

  postFilterData(){
    this.priceValues.emit({ 
      'displayPriceMin':this.displayPriceMin,
      'displayPriceMax':this.displayPriceMax,
      'displayPriceRange':this.displayPriceRange
    })
    this.goback();
  }
 
  gobackPage(){}
  changeState(event:any){}
 

getPriceDataRange1(value: string) {
  this.selectprice1 = value;
  this.tempPrice1 = value; 
  this.updatePriceRange();
}

getPriceDataRange2(value: string) {
  this.selectprice2 = value;
  this.tempPrice2 = value;
  this.updatePriceRange();
}


getinput1(event: any) {
  this.tempPrice1 = event.detail.value;
  this.updatePriceRange();
}


getinput2(event: any) {
  this.tempPrice2 = event.detail.value;
  this.updatePriceRange();
}

updatePriceRange() {
  const val1 = parseFloat(this.tempPrice1) || parseFloat(this.selectprice1) || 0;
  const val2 = parseFloat(this.tempPrice2) || parseFloat(this.selectprice2) || 0;

  this.displayPriceMin = Math.min(val1, val2);
  this.displayPriceMax = Math.max(val1, val2);

  if (this.displayPriceMin > 0 || this.displayPriceMax > 0) {
    const formattedMin = this.formatGerman(this.displayPriceMin);
    const formattedMax = this.formatGerman(this.displayPriceMax);
    this.displayPriceRange = `€ ${formattedMin} - ${formattedMax}`;
  }
}

formatGerman(value: number): string {
  return value.toLocaleString('de-DE');
}
 
} 
