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
  private readonly baseUrlRetroCards = BASE_URL + "retrocards/";
  private readonly baseUrlRetroColumn = BASE_URL + "retroColumns/";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient, private message: MessageService) { }

  createRetroCard(content) {
    return this.http.post<RetroCard>(this.baseUrlRetroCards, { content: content }, this.httpOptions);
  }

  addRetroCardToColumn(cardId, columnId): Observable<RetroCard> {
    return this.http.post<RetroCard>(this.baseUrlRetroColumn + columnId + "/retrocards/" + cardId, this.httpOptions);
  }

  removeRetroCardFromColumn(cardId, columnId) {
    return this.http.delete<RetroCard>(this.baseUrlRetroColumn + columnId + "/retrocards/" + cardId, this.httpOptions);
  }

  getRetroCard(id): Observable<RetroCard> {
    return this.http.get<RetroCard>(this.baseUrlRetroCards + id, this.httpOptions);
  }

  getRetroCards(): Observable<RetroCard[]> {
    return this.http.get<RetroCard[]>(this.baseUrlRetroCards, this.httpOptions);
  }

  updateRetroCard(id, content) {
    return this.http.put<RetroCard>(this.baseUrlRetroCards + id, { content: content }, this.httpOptions);
  }

  deleteRetroCard(id) {
    return this.http.delete(this.baseUrlRetroCards + id, this.httpOptions);
  }
}
