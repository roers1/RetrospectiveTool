import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from 'src/models/User';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { baseUrl } from '../../../helpers/url-constants'

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    endpoint: string = baseUrl;
    currentUser = localStorage.getItem('user_id');
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, public router: Router) { }


  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}auth/register`;
    return this.http.post(api, user)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  // Sign-in
  signIn(login) : Observable<any>{
    const body = {
      'email': login.email,
      'password': login.password
    };
  
    
    return this.http.post<User>(`${this.endpoint}auth/login`, body, this.httpOptions)
    .pipe(
      catchError(err => {
          return throwError(err);
      })
    )
  }

    activateEmit() {
        this.fireIsLoggedIn.emit('');
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    getCurrentUserId() {
        return localStorage.getItem('user_id');
    }

    isLoggedIn(): boolean {
        const authToken = localStorage.getItem('access_token');
        return authToken !== null;
    }

    doLogout() {
        const removeToken = localStorage.removeItem('access_token');
        const removeUserId = localStorage.removeItem('user_id');
        this.currentUser = null;
        if (this.router.url === '/dashboard') {
            this.router.navigate(['/']);
        } else {
            this.activateEmit();
        }
    }

    getEmitter() {
        return this.fireIsLoggedIn;
    }

    recoverAccount(email: string) {
        return this.http.post<any>(this.endpoint + 'auth/recovery', {Email: email}, this.httpOptions);
    }

    updatePassword(token: string, password: string) {
        return this.http.post<any>(this.endpoint + 'auth/updatepassword/' + token, {Password: password}, this.httpOptions);
    }
}

