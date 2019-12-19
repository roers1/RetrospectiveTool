import { TestBed } from '@angular/core/testing';

import { FacilitatorService } from './facilitator.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FacilitatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FacilitatorService = TestBed.get(FacilitatorService);
    expect(service).toBeTruthy();
  });
});
