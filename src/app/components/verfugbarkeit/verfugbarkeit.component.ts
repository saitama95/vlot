import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-verfugbarkeit',
  templateUrl: './verfugbarkeit.component.html',
  styleUrls: ['./verfugbarkeit.component.scss'],
  standalone:false
})
export class VerfugbarkeitComponent  implements OnInit {

  @Input() label = "";
  @Output() formSubmit = new EventEmitter<string>();
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('dateModal') dateModal!: IonModal;
  availability_modal: string | null = null;
  selectedDate: string | null = null;
  displayValue: string | null = null;

  ngOnInit() {}

  openModal() {
    this.modal.present();
  }

  goback() {
    this.modal.dismiss(null, 'cancel');
  }

 radioGroupChange(event: any) {
  const value = event.detail.value;
  if (value) {
    this.availability_modal = value;
    this.selectedDate = null;
    this.displayValue = value;
    this.formSubmit.emit(value);
    this.modal.dismiss(null, 'confirm');
  }
}

 onDateChange(event: any) {
  const fullDate = event.detail.value;
  this.selectedDate = fullDate ? fullDate.substring(0, 10) : null;
  this.availability_modal = null;
  this.dateModal.dismiss(); 
}

  getValue() {
    let result: string | null = null;
    if (this.selectedDate) {
      result = 'ab ' + this.selectedDate;
    } else if (this.availability_modal) {
      result = this.availability_modal;
    }

    if (result) {
      this.displayValue = result;
      this.formSubmit.emit(result);
    }

    this.modal.dismiss(null, 'confirm');
  }

}
