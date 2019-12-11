import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";
import { RetroCard } from "../models/RetroCard";

@Injectable({
  providedIn: 'root'
})
export class RetrocardService {
  private readonly baseUrlRetroCards = BASE_URL + "api/retroCards/";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient, private message: MessageService) { }

  createRetroCard(content) {
    this.http.post<RetroCard>(this.baseUrlRetroCards, { content: content }, this.httpOptions);
  }

  getRetroCard(id, cb) {
    this.http.get<RetroCard>(this.baseUrlRetroCards + id, this.httpOptions)
      .subscribe((retroCard) => cb(retroCard));
  }

  updateRetroCard(id, content) {
    this.http.put<RetroCard>(this.baseUrlRetroCards + id, { content: content }, this.httpOptions);
  }

  deleteRetroCard(id) {
    this.http.delete(this.baseUrlRetroCards + id, this.httpOptions);
  }
}
