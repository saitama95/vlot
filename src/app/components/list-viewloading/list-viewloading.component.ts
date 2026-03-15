import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-viewloading',
  templateUrl: './list-viewloading.component.html',
  styleUrls: ['./list-viewloading.component.scss'],
  standalone:false
})
export class ListViewloadingComponent implements OnInit {

  constructor() { }
  @Input() arrdata:any[] = [];
  ngOnInit() {}

  repearframe = [1,2,3,4,5];
}
