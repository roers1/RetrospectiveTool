import { TestBed } from '@angular/core/testing';

import { RetroFamilyService } from './retro-family.service';

describe('RetroFamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetroFamilyService = TestBed.get(RetroFamilyService);
    expect(service).toBeTruthy();
  });
});
