import { TestBed } from '@angular/core/testing';

import { RetrocardService } from './retrocard.service';

describe('RetrocardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrocardService = TestBed.get(RetrocardService);
    expect(service).toBeTruthy();
  });
});
