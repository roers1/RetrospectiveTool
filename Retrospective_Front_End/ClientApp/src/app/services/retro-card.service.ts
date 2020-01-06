import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../helpers/url-constants';
import { MessageService } from './message.service';
import { RetroCard } from '../../models/RetroCard';

@Injectable({
  providedIn: 'root'
})
export class RetroCardService {
  private readonly baseUrlRetroCards = baseUrl + 'retrocards';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private message: MessageService) {
  }

  createCard(columnId, position, content): Observable<RetroCard> {
    return this.http.post<RetroCard>(this.baseUrlRetroCards, {
      content: content,
      position: position,
      retrocolumnId: columnId
    }, this.httpOptions);
  }

  getRetroCard(id): Observable<RetroCard> {
    return this.http.get<RetroCard>(this.baseUrlRetroCards + id, this.httpOptions);
  }

  getRetroCards(): Observable<RetroCard[]> {
    return this.http.get<RetroCard[]>(this.baseUrlRetroCards, this.httpOptions);
  }

  updateRetroCard(retroCard: RetroCard, columnId) {
    return this.http.put<RetroCard>(this.baseUrlRetroCards, {
      id: retroCard.id,
      content: retroCard.content,
      position: retroCard.position,
      retroColumnId: columnId
    }, this.httpOptions);
  }

  updateRetroCardContent(retroCard: RetroCard, content) {
    return this.http.put<RetroCard>(this.baseUrlRetroCards, {
      id: retroCard.id,
      content: content,
      position: retroCard.position,
      retroColumnId: retroCard.retroColumnId
    }, this.httpOptions);
  }

  deleteRetroCard(retroCard: RetroCard) {
    return this.http.delete(this.baseUrlRetroCards + "/" + retroCard.id, this.httpOptions);
  }
}
