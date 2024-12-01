import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiUrl = 'us-central1-cegep-al.cloudfunctions.net';

  constructor(
    private http: HttpClient
  ) { 
    console.log("Serveur : " + this.apiUrl);
    this.validateTokenOnStart(); // Validate token on application start
  }
  private _userName: string = "";
  private _sessionExists: boolean = false;
  private _isSessionActive: boolean = false;

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

  get isSessionActive(): boolean {
    return this._isSessionActive;
  }
  
  createSession(username: String, password: String): Observable<boolean> {
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
        this._sessionExists = true;
        this._isSessionActive = true;
        this._mySessionSubject.next(this._sessionExists);
        this._myUsernameSubject.next(this._userName);
      }),
      map(() => this._sessionExists)
    );
  }

  validateToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<{ data?: { valid: boolean } }>('https://us-central1-cegep-al.cloudfunctions.net/secret', {
        headers: { Authorization: token }
      }).subscribe({
        next: (response) => {
          if (response.data && response.data.valid) {
            this._isSessionActive = true;
            this._sessionExists = true;
            this._mySessionSubject.next(this._sessionExists);
          } else {
            this.terminateSession();
          }
        },
        error: () => {
          this.terminateSession();
        }
      });
    } else {
      this.terminateSession();
    }
  }

  validateTokenOnStart(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.validateToken();
    }
  }

  terminateSession() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.delete('https://us-central1-cegep-al.cloudfunctions.net/session', {
        headers: { Authorization: token }
      }).subscribe({
        next: () => {
          this._token = "";
          this._userName = "";
          this._sessionExists = false;
          this._isSessionActive = false;
          this._mySessionSubject.next(this._sessionExists);
          this._myUsernameSubject.next(this._userName);
          localStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('password');
        },
        error: () => {
          this._token = "";
          this._userName = "";
          this._sessionExists = false;
          this._isSessionActive = false;
          this._mySessionSubject.next(this._sessionExists);
          this._myUsernameSubject.next(this._userName);
          localStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('password');
        }
      });
    }
  }
}
