import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class RetrocardService {

  constructor(private message: MessageService) { }

  updateRetroCard(id: number, content: string) {
    
  }

  createRetroCard(content: string) {

  }
}
