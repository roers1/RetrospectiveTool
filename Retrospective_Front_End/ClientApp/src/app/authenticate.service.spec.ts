import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BASE_URL } from '../helpers/urlconstants';
import { MessageService } from './message.service';
import { Facilitator } from '../models/Facilitator';
import { Participant } from '../models/Participant';
import { AuthenticateService } from './authenticate.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RetroBoardComponent} from './components/retro-board/retro-board.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AuthenticateService = TestBed.get(AuthenticateService);
    expect(service).toBeTruthy();
  });
});
