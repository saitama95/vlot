import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyproductdetailsPage } from './propertyproductdetails.page';

describe('PropertyproductdetailsPage', () => {
  let component: PropertyproductdetailsPage;
  let fixture: ComponentFixture<PropertyproductdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyproductdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
