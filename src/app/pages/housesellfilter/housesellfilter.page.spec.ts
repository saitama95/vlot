import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesellfilterPage } from './housesellfilter.page';

describe('HousesellfilterPage', () => {
  let component: HousesellfilterPage;
  let fixture: ComponentFixture<HousesellfilterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesellfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
