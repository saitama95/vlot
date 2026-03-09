import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LageundsonstiguesComponent } from './lageundsonstigues.component';

describe('LageundsonstiguesComponent', () => {
  let component: LageundsonstiguesComponent;
  let fixture: ComponentFixture<LageundsonstiguesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LageundsonstiguesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LageundsonstiguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
