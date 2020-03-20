import { TestBed } from '@angular/core/testing';

import { IntuitAuthService } from './intuit-auth.service';

describe('IntuitAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntuitAuthService = TestBed.get(IntuitAuthService);
    expect(service).toBeTruthy();
  });
});
