import { TestBed } from '@angular/core/testing';

import { FixedSalaryService } from './fixed-salary.service';

describe('DriverService', () => {
  let service: FixedSalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedSalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
