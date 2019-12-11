import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";;
import { Observable, of } from "rxjs";
import { BASE_URL } from "../helpers/urlconstants";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class RetrocolumnService {

  constructor(private message: MessageService) { }

  getRetroColumns(retrospectiveId: number) {

  }

  createRetroColumn(retrospectiveId: number, title: string) {
      
  }

  updateRetroColumn(id: number, title: string) {

  }

  removeRetroColumn(id: number, retrospectiveId: number) {
    
  }
}
