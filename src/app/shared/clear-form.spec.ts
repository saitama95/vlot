import { TestBed } from '@angular/core/testing';

import { ClearForm } from './clear-form';

describe('ClearForm', () => {
  let service: ClearForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
