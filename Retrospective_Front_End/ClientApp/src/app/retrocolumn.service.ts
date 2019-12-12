import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";
import { RetroColumn } from "../models/retroColumn";
import { RetrospectiveService } from "./retrospective.service";

@Injectable({
  providedIn: 'root'
})
export class RetrocolumnService {
  private readonly baseUrlRetrospective: string = BASE_URL + "retrospectives/";

  private readonly baseUrlRetroColumn = BASE_URL + "retroColumns/";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient, private retrospectiveService: RetrospectiveService) { }

  getRetroColumns(): Observable<RetroColumn[]> {
    return this.http.get<RetroColumn[]>(this.baseUrlRetroColumn, this.httpOptions);
  }

  getRetroColumn(id): Observable<RetroColumn> {
    return this.http.get<RetroColumn>(this.baseUrlRetroColumn + id, this.httpOptions);
  }

  createRetroColumn(title) {
    return this.http.post<RetroColumn>(this.baseUrlRetroColumn,
      { title: title },
      this.httpOptions);
  }

  addRetroColumnToRetrospective(columnId): Observable<RetroColumn> {
    if (this.retrospectiveService.getRetrospective) {
      return this.http.post<RetroColumn>(this.baseUrlRetrospective + this.retrospectiveService.getCurrentRetrospectiveId + "/retrocolumns/" + columnId, this.httpOptions);
    }
  }

  removeRetroColumnToRetrospective(columnId): Observable<RetroColumn> {
    if (this.retrospectiveService.getRetrospective) {
      return this.http.delete<RetroColumn>(this.baseUrlRetrospective + this.retrospectiveService.getCurrentRetrospectiveId + "/retrocolumns/" + columnId, this.httpOptions);
    }
  }

  removeRetroColumn(id) {
    this.http.delete(this.baseUrlRetroColumn + id, this.httpOptions);
  }
}
