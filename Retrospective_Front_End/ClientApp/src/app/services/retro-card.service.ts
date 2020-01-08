import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../helpers/url-constants';
import { MessageService } from './message.service';
import {RetrospectiveService} from './retrospective.service';
import { RetroCard } from '../../models/RetroCard';
import {BaseItem} from '../../models/BaseItem';

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

  constructor(private http: HttpClient, private message: MessageService, private retrospectiveService: RetrospectiveService) {
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

  updateRetroCard(retroCard: RetroCard) {
    return this.http.put<RetroCard>(this.baseUrlRetroCards, {
      id: retroCard.id,
      content: retroCard.content,
      position: retroCard.position,
      upvotes: retroCard.upVotes,
      downvotes: retroCard.downVotes,
      retroColumnId: retroCard.retroColumnId
    }, this.httpOptions);
  }

  deleteRetroCard(retroCard: RetroCard) {
    return this.http.delete(this.baseUrlRetroCards + '/' + retroCard.id, this.httpOptions);
  }
}
