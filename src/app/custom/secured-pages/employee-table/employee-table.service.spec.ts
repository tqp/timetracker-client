import { TestBed } from '@angular/core/testing';

import { EmployeeTableService } from './employee-table.service';

describe('EmployeeTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeTableService = TestBed.get(EmployeeTableService);
    expect(service).toBeTruthy();
  });
});
