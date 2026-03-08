import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfflinepagePage } from './offlinepage.page';

describe('OfflinepagePage', () => {
  let component: OfflinepagePage;
  let fixture: ComponentFixture<OfflinepagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflinepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
