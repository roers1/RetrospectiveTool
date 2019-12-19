import { TestBed } from '@angular/core/testing';

import { RetrospectiveService } from './retrospective.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RetrospectiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RetrospectiveService = TestBed.get(RetrospectiveService);
    expect(service).toBeTruthy();
  });
});
