import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WohnflachefilterfieldComponent } from './wohnflachefilterfield.component';

describe('WohnflachefilterfieldComponent', () => {
  let component: WohnflachefilterfieldComponent;
  let fixture: ComponentFixture<WohnflachefilterfieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WohnflachefilterfieldComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WohnflachefilterfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
