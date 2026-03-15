import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filterheader',
  templateUrl: './filterheader.component.html',
  styleUrls: ['./filterheader.component.scss'],
  standalone:false
})
export class FilterheaderComponent  implements OnInit {

  @Output() back = new EventEmitter<any>;
  @Output() submitfilter = new EventEmitter<any>;
  constructor() { }

  ngOnInit() {}


  goBack(){
    this.back.emit();
  }

  postfilterdata(){
    this.submitfilter.emit();
  }
}
