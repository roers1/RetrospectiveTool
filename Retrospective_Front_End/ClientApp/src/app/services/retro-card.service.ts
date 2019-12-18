import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {baseUrl} from '../../helpers/url-constants';
import {MessageService} from './message.service';
import {RetroCard} from '../../models/RetroCard';

@Injectable({
  providedIn: 'root'
})
export class RetrocardService {
  private readonly baseUrlRetroCards = baseUrl + 'retrocards';
  private readonly baseUrlRetroColumn = baseUrl + 'retroColumns/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private message: MessageService) {
  }

  createCard(columnId, content): Observable<RetroCard> {
    return this.http.post<RetroCard>(this.baseUrlRetroCards, {
      content: content,
      retrocolumnId: columnId
    }, this.httpOptions);
  }

  removeCard(cardId, columnId) {
    return this.http.delete<RetroCard>(this.baseUrlRetroColumn + columnId + '/retrocards/' + cardId, this.httpOptions);
  }

  getRetroCard(id): Observable<RetroCard> {
    return this.http.get<RetroCard>(this.baseUrlRetroCards + id, this.httpOptions);
  }

  getRetroCards(): Observable<RetroCard[]> {
    return this.http.get<RetroCard[]>(this.baseUrlRetroCards, this.httpOptions);
  }

  updateRetroCard(id, content) {
    return this.http.put<RetroCard>(this.baseUrlRetroCards + id, {content: content}, this.httpOptions);
  }

  deleteRetroCard(id) {
    return this.http.delete(this.baseUrlRetroCards + id, this.httpOptions);
  }
}
