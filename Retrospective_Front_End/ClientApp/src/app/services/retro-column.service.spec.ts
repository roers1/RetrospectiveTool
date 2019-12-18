import { TestBed } from '@angular/core/testing';

import { RetroColumnService } from './retro-column.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RetrocolumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RetroColumnService = TestBed.get(RetroColumnService);
    expect(service).toBeTruthy();
  });
});
