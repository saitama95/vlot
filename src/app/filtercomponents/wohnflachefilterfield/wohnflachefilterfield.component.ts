import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-wohnflachefilterfield',
  templateUrl: './wohnflachefilterfield.component.html',
  styleUrls: ['./wohnflachefilterfield.component.scss'],
  standalone:false
})
export class WohnflachefilterfieldComponent  implements OnInit {
   @ViewChild(IonModal) modal!: IonModal;
  getRentHausWohnflacheRange1 = [
    {value: '0',range1: '0'},
    {value: '20',range1: '20'},
    {value: '25',range1: '25'},
    {value: '30',range1: '30'},
    {value: '35',range1: '35'},
    {value: '40',range1: '40'},
    {value: '45',range1: '45'},
    {value: '50',range1: '50'},
    {value: '55',range1: '55'},
    {value: '60',range1: '60'},
    {value: '65',range1: '65'},
    {value: '70',range1: '70'},
    {value: '75',range1: '75'},
    {value: '80',range1: '80'},
    {value: '85',range1: '85'},
    {value: '80',range1: '80'},
    {value: '85',range1: '85'},
    {value: '90',range1: '90'},
    {value: '95',range1: '95'},
    {value: '100',range1: '100'},
    {value: '105',range1: '105'},
    {value: '110',range1: '110'},
    {value: '115',range1: '115'},
    {value: '120',range1: '120'},
    {value: '125',range1: '125'},
    {value: '130',range1: '130'},
    {value: '135',range1: '135'},
    {value: '140',range1: '140'},
    {value: '145',range1: '145'},
    {value: '150',range1: '150'},
    {value: '155',range1: '155'},
    {value: '160',range1: '160'},
    {value: '165',range1: '165'},
    {value: '170',range1: '170'},
    {value: '175',range1: '175'},
    {value: '180',range1: '180'},
    {value: '185',range1: '185'},
    {value: '190',range1: '190'},
    {value: '195',range1: '195'},
    {value: '200',range1: '200'},
    {value: '300',range1: '300'},
    {value: '400',range1: '400'},
    {value: '500',range1: '500'},
  ]

  getRentHausWohnflacheRange2 = [
    {value: '20',range2: '20'},
    {value: '25',range2: '25'},
    {value: '30',range2: '30'},
    {value: '35',range2: '35'},
    {value: '40',range2: '40'},
    {value: '45',range2: '45'},
    {value: '50',range2: '50'},
    {value: '55',range2: '55'},
    {value: '60',range2: '60'},
    {value: '65',range2: '65'},
    {value: '70',range2: '70'},
    {value: '75',range2: '75'},
    {value: '80',range2: '80'},
    {value: '85',range2: '85'},
    {value: '80',range2: '80'},
    {value: '85',range2: '85'},
    {value: '90',range2: '90'},
    {value: '95',range2: '95'},
    {value: '100',range2: '100'},
    {value: '105',range2: '105'},
    {value: '110',range2: '110'},
    {value: '115',range2: '115'},
    {value: '120',range2: '120'},
    {value: '125',range2: '125'},
    {value: '130',range2: '130'},
    {value: '135',range2: '135'},
    {value: '140',range2: '140'},
    {value: '145',range2: '145'},
    {value: '150',range2: '150'},
    {value: '155',range2: '155'},
    {value: '160',range2: '160'},
    {value: '165',range2: '165'},
    {value: '170',range2: '170'},
    {value: '175',range2: '175'},
    {value: '180',range2: '180'},
    {value: '185',range2: '185'},
    {value: '190',range2: '190'},
    {value: '195',range2: '195'},
    {value: '200',range2: '200'},
    {value: '300',range2: '300'},
    {value: '400',range2: '400'},
    {value: '500',range2: '500'},
    {value: 'beliebig',range2: 'beliebig'},
  ]
  constructor() { }
  wohnflache_Val2="";
  wohnflache_Val1="";
  ngOnInit() {}

  postRentHausFilterData(){}

  getRentHausWohnflache2(event:any){}
  getRentHausWohnflache1(event:any){}

  openModal() { this.modal.present(); }
  goback()    { this.modal.dismiss(null, 'cancel'); }
  rentHouseWohnflacheData="";
  cutWohnflache(){}
}
