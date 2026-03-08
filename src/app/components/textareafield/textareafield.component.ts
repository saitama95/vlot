import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-textareafield',
  templateUrl: './textareafield.component.html',
  styleUrls: ['./textareafield.component.scss'],
  standalone:false
})
export class TextareafieldComponent  implements OnInit {


  @ViewChild(IonModal) modal!: IonModal;
  constructor() { }

  ngOnInit() {}
  @Input() description: string = '';
  @Input() isInvalid: boolean = false;          // ✅ receive validation state
  @Output() descriptionChange = new EventEmitter<string>();  
   tempDescription: string = '';  
   
  openModal(): void {
    this.tempDescription = this.description;   // ✅ pre-fill with current value
    this.modal.present();
  }

  getdescription(): void {
    console.log(this.description);
    this.descriptionChange.emit(this.description);  // ✅ notify parent
    this.modal.dismiss(this.description, 'confirm');
  }

  goback(){
      if(!this.description){
        this.isInvalid=true;
      }
     this.modal.dismiss(null, 'cancel');
  }
}
