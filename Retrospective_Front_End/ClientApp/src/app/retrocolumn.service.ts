import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";
import { RetroColumn } from "../models/retroColumn";

@Injectable({
  providedIn: 'root'
})
export class RetrocolumnService {
  private readonly baseUrlRetroColumn = BASE_URL + "api/retroColumns/";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient, private message: MessageService) { }

  getRetroColumns(id, cb) {
    this.http.get<RetroColumn>(this.baseUrlRetroColumn + id).subscribe((retroColumn) => cb(retroColumn))
  }
  
  createRetroColumn(title) {
    this.http.post<RetroColumn>(this.baseUrlRetroColumn,
      { title: title },
      this.httpOptions);
  }

  removeRetroColumn(id) {
    this.http.delete(this.baseUrlRetroColumn + id, this.httpOptions);
  }
}
