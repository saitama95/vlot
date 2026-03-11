import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-checkboxfield',
  templateUrl: './checkboxfield.component.html',
  styleUrls: ['./checkboxfield.component.scss'],
  standalone:false,
})
export class CheckboxfieldComponent  implements OnInit {

  @Input() label="";
  @Input() arrdata:any[]=[];
  @Input() isInValid=false;
  @Output() selectionChange = new EventEmitter<string[]>();
  constructor() { }
  selectedItems: string[] = [];
  @ViewChild(IonModal) modal!: IonModal;
  ngOnInit() {}

  openModal(){
    this.modal.present();
  }

 SaveDatas(): void {
    this.selectionChange.emit(this.selectedItems);  // ✅ emit to parent
    this.modal.dismiss(this.selectedItems, 'confirm');
  }

  toggleItem(name: string, checked: boolean): void {
    if (checked) {
      this.selectedItems = [...this.selectedItems, name];
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== name);
    }
  }

  isChecked(name: string): boolean {
    return this.selectedItems.includes(name);
  }

  
  get displayValue(): string {
    return this.selectedItems.length
      ? this.selectedItems.join(', ')
      : '';
  }

  reset(){
    this.selectedItems=[];
  }

  goback(){
     this.modal.dismiss(null, 'cancel');
  }
}
