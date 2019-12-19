import { TestBed } from '@angular/core/testing';

import { RetroCardService } from './retro-card.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RetrocardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RetroCardService = TestBed.get(RetroCardService);
    expect(service).toBeTruthy();
  });
});
