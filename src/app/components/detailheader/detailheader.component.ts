import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detailheader',
  templateUrl: './detailheader.component.html',
  styleUrls: ['./detailheader.component.scss'],
  standalone:false
})
export class DetailheaderComponent  implements OnInit {

  @Input() productdetails:any;
  constructor(
    private nvctrl:NavController
  ) { }

  ngOnInit() {}

  goBack(){
    this.nvctrl.back();
  }
}
