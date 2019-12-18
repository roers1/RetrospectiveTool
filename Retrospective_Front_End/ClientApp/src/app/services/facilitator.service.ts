import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../helpers/url-constants';
import { MessageService } from './message.service';
import { Facilitator } from '../../models/Facilitator';

@Injectable({
  providedIn: 'root'
})
export class FacilitatorService {

  constructor(private http: HttpClient, private message: MessageService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  addParticipant(id) {

  }

  removeParticipant(id) {

  }

  cleanRetrospective() {

  }

}
