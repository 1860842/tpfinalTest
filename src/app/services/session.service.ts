import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiUrl = 'us-central1-cegep-al.cloudfunctions.net';

  constructor(
    private http: HttpClient
  ) { 
    console.log("Serveur : " + this.apiUrl);
  }
  private _userName: string = "";
  private _sessionExists: boolean = false;

  _mySessionSubject = new BehaviorSubject<boolean>(this._sessionExists);

  get mySessionSubject(): Observable<boolean> {
    return this._mySessionSubject.asObservable();
  }

  _myUsernameSubject = new BehaviorSubject<string>(this._userName);

  get myUsernameSubject(): Observable<string> {
    return this._myUsernameSubject.asObservable();
  }
  _token = '';
  username: String = '';
  
  createSession(username: String, password: String) {
    return this.http.post<string>(
      'https://us-central1-cegep-al.cloudfunctions.net/session',
      {
        username: username,
        password: password
      }
    ).pipe(
      tap(token => {
        console.log('Token utilisateur: ', token);
        localStorage.setItem('token', token); // Store token in local storage
        sessionStorage.setItem('username', username.toString()); // Store username in session storage
        sessionStorage.setItem('password', password.toString()); // Store password in session storage
        //this.token = token;
        //this.username = username;
        this._sessionExists = true;
        this._mySessionSubject.next(this._sessionExists);
        this._myUsernameSubject.next(this._userName);
      }
    ));
  }
  termineSession() {
    this._token = "";
    this._userName = "";
    this._sessionExists = false;
    this._mySessionSubject.next(this._sessionExists);
    this._myUsernameSubject.next(this._userName);
  }
}
