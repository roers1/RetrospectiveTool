import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages = {};

  push(key: string, message: string) {
    this.messages[key] = message;
  }

  get(key: string) {
    return this.messages[key];
  }
}
