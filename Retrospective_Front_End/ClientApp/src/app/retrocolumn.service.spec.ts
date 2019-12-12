import { TestBed } from '@angular/core/testing';

import { RetrocolumnService } from './retrocolumn.service';

describe('RetrocolumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrocolumnService = TestBed.get(RetrocolumnService);
    expect(service).toBeTruthy();
  });
});
