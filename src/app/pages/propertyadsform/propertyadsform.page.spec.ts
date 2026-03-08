import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyadsformPage } from './propertyadsform.page';

describe('PropertyadsformPage', () => {
  let component: PropertyadsformPage;
  let fixture: ComponentFixture<PropertyadsformPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyadsformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
