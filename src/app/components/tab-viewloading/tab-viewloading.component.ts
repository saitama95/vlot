import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-viewloading',
  templateUrl: './tab-viewloading.component.html',
  styleUrls: ['./tab-viewloading.component.scss'],
  standalone:false
})
export class TabViewloadingComponent implements OnInit {

  @Input() marketplace="";
  @Input() property="";
  @Input() automotar="";
  @Input() pets="";
  @Input() searchbar=true;
  @Input() arrdata:any[]=[];
  constructor() { }
  itemMar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  leftarr = [1,2,3,4,5,6,7,8];
  ngOnInit() {}

}
