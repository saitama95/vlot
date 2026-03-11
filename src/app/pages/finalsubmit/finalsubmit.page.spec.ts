import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalsubmitPage } from './finalsubmit.page';

describe('FinalsubmitPage', () => {
  let component: FinalsubmitPage;
  let fixture: ComponentFixture<FinalsubmitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalsubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
