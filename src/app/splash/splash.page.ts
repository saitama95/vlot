import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network,ConnectionStatus } from '@capacitor/network';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:false
})
export class SplashPage implements OnInit {

  networkStatus!: ConnectionStatus;
  constructor(
    private router:Router, 
    private navCtrl : NavController
  ) { 
  }

ngOnInit() {
    this.router.navigate(['tabs/tab1']);
  }
  
  checkNetConnection(){
    
    if(Network){
      Network.getStatus().then(status=>{
        this.networkStatus = status;
      })
    }
    Network.addListener("networkStatusChange",status=>{
      this.networkStatus=status;
      //this.navCtrl.navigateRoot("/pages/offlinepage");
    })
  }

}
