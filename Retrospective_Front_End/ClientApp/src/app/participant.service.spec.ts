import { TestBed } from '@angular/core/testing';

import { ParticipantService } from './participant.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ParticipantService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ParticipantService = TestBed.get(ParticipantService);
    expect(service).toBeTruthy();
  });
});
