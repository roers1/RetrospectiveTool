import { TestBed } from '@angular/core/testing';

import { RetroColumnService } from './retro-column.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RetroColumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RetroColumnService = TestBed.get(RetroColumnService);
    expect(service).toBeTruthy();
  });
});
