import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private message: MessageService) { }

  getParticipants(facilitatorId) {

  }

  addParticipant(participantId, facilitatorId) {

  }

  removeParticipant(participantId, facilitatorId) {

  }
  
}
