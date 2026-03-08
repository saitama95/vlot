import { Component, OnInit } from '@angular/core';
import { Network,ConnectionStatus } from '@capacitor/network';
@Component({
  selector: 'app-offlinepage',
  templateUrl: './offlinepage.page.html',
  styleUrls: ['./offlinepage.page.scss'],
  standalone:false
})
export class OfflinepagePage implements OnInit {

  networkStatus!:ConnectionStatus;
  constructor() { }

  ngOnInit() {
  }

    checkNetConnection(){
    
    if(Network){
      Network.getStatus().then(status=>{
        this.networkStatus = status;
        if(this.networkStatus.connected){
          window.history.back();
        }
      })
    }
    Network.addListener("networkStatusChange",status=>{
      this.networkStatus=status;     
    })
  }

}
