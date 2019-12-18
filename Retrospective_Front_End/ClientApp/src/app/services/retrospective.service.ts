import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {BASE_URL} from '../../helpers/urlconstants';
import {MessageService} from './message.service';
import {Retrospective} from '../../models/Retrospective';
import {RetroColumn} from '../../models/retroColumn';

@Injectable({
  providedIn: 'root'
})
export class RetrospectiveService {

  private readonly baseUrlRetrospective: string = BASE_URL + 'retrospectives/';

  private retrospective: Retrospective;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  createRetrospective(title, description) {
    return this.http.post<Retrospective>(this.baseUrlRetrospective, {
      title: title,
      description: description
    }, this.httpOptions);
  }

  getRetrospective(id, cb) {
    this.http.get<Retrospective>(this.baseUrlRetrospective + id, this.httpOptions).subscribe((retrospective) => {
      this.retrospective = retrospective;
      cb(retrospective);
    });
  }

  removeRetrospective() {
    if (this.retrospective) {
      this.http.delete(this.baseUrlRetrospective + this.retrospective.id, this.httpOptions);
      this.retrospective = null;
    }
  }

  getCurrentRetrospective(): Retrospective {
    if (this.retrospective != null && this.retrospective !== undefined) {
      return this.retrospective;
    } else {
      return null;
    }
  }

  getCurrentRetrospectiveId(): number {
    if (this.retrospective != null && this.retrospective !== undefined) {
      return this.retrospective.id;
    } else {
      return null;
    }
  }
}
