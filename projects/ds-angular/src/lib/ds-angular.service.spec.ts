import { TestBed } from '@angular/core/testing';

import { DsAngularService } from './ds-angular.service';

describe('DsAngularService', () => {
  let service: DsAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
