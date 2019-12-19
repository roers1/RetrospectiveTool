import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../helpers/url-constants';
import { MessageService } from './message.service';
import { Facilitator } from '../../models/Facilitator';
import { Participant } from '../../models/Participant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private authenticatedFacilitator: Facilitator;
  private authenticatedParticipant: Participant;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private message: MessageService) { }

  registerFacilitator(username: string) {

  }

  logout() {
    this.authenticatedFacilitator = null;
    this.authenticatedParticipant = null;
  }

  handleError<T>(operation = 'operation', message: string, result?: T) {
    return (error: any): Observable<T> => {
      this.message.push(operation, message);
      return of(result as T);
    };
  }

  isAuthenticated() {
    return this.authenticatedFacilitator != null || this.authenticatedParticipant != null;
  }

  getFacilitator(): Facilitator {
    return this.authenticatedFacilitator;
  }

  getParticipant(): Participant {
    return this.authenticatedParticipant;
  }
}
