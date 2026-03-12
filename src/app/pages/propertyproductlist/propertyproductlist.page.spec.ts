import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyproductlistPage } from './propertyproductlist.page';

describe('PropertyproductlistPage', () => {
  let component: PropertyproductlistPage;
  let fixture: ComponentFixture<PropertyproductlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyproductlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
