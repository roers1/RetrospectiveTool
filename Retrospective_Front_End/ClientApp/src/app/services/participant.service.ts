import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../helpers/url-constants';
import { MessageService } from './message.service';
import { Participant } from '../../models/Participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private readonly baseUrlParticipant = baseUrl + 'participants/';
  private readonly baseUrlFacilitator = baseUrl + 'facilitators/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private message: MessageService) { }

  getParticipantsFromFacilitator(facilitatorId): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.baseUrlFacilitator + facilitatorId + '/participants', this.httpOptions);
  }

  addParticipant(participantId, facilitatorId): Observable<Participant> {
    return this.http.post<Participant>(this.baseUrlFacilitator + facilitatorId + '/participants/' + participantId, this.httpOptions);
  }

  removeParticipant(participantId, facilitatorId) {
    this.http.delete(this.baseUrlFacilitator + facilitatorId + 'participants/' + participantId, this.httpOptions);
  }
}
