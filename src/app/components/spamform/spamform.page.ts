import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-spamform',
  templateUrl: './spamform.page.html',
  styleUrls: ['./spamform.page.scss'],
  standalone:false
})
export class SpamformPage implements OnInit {

  selectedId:any[] = [];
  checkdata = [
    {id:1,title:'Scam oder Betrug?'},
    {id:2,title:'Verkauft illegaler oder reglementierter Güter?'},
    {id:3,title:'Nacktheit oder sexuelle Handlungen?'},
    {id:4,title:'Hassrede oder -symbole?'},
    {id:5,title:'Andere Gründe?'},
  ];

  constructor(
    private modalController : ModalController,
    private platform: Platform
  ) { 
    this.backbuttonEvent();
  }

  backbuttonEvent(){
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.goBack();
    });
  }

  ngOnInit() {}
  
  async goBack(){
    return await this.modalController.dismiss(null,'cancel');
  }

  async savespam(){
    let reason = document.getElementById('reason') as HTMLInputElement;
    if(reason.value || this.selectedId.length){
      let obj = {
        reason:reason.value,
        selectbox:this.convertarraytostring()
      };
      return await this.modalController.dismiss(obj,'confirm');
    }else{
      this.goBack();
    }
  }

  convertarraytostring(){
    let arr:any[]=[];
    arr.push(...this.selectedId);
    let title = arr.map(item => item.title).join(',');
    let mult_title = `"${title}"`;
    mult_title = mult_title.replace(/"/g, '');
    return mult_title;
  }

  getItem(event:any,id:number,title:number){
    if(event.target.checked){
      this.selectedId.push({proid:id,title:title})
    }else{
      this.selectedId = this.selectedId.filter(item=>item.proid != id);
    }
  }
}
