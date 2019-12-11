import { TestBed } from '@angular/core/testing';

import { FacilitatorService } from './facilitator.service';

describe('FacilitatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilitatorService = TestBed.get(FacilitatorService);
    expect(service).toBeTruthy();
  });
});
