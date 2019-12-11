import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";
import { Retrospective } from "../models/Retrospective";

@Injectable({
  providedIn: 'root'
})
export class RetrospectiveService {

  constructor(private message: MessageService) { }

  createRetrospective(title: string, description: string) {

  }
}
