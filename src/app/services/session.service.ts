import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiUrl = 'us-central1-cegep-al.cloudfunctions.net';
  _token: string | null = localStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { 
    console.log("Serveur : " + this.apiUrl);
  }
  private _userName: string = "";
  private _sessionExists: boolean = false;
  private _isSessionActive: boolean = false;

  get userName(): string {
    return this._userName;
  }

  get sessionExists(): boolean {
    return this._sessionExists;
  }

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
        this._token = token;
        this._sessionExists = true;
        this._isSessionActive = true;
        this._userName = username.toString();
      }),
      map(() => this._sessionExists)
    );
  }

  validateToken(): Observable<boolean> {
    console.log('Validation du token');
    if (this._token) {
      console.log('Token existe', this._token);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this._token}`);
      return this.http.get<{ valid: boolean, owner?: string }>('https://us-central1-cegep-al.cloudfunctions.net/secret', { headers }).pipe(
        tap(response => {
          if (response.valid) {
            console.log('Token valide');
            this._isSessionActive = true;
            this._sessionExists = true;
            this._userName = response.owner || sessionStorage.getItem('username') || '';
          } else {
            this.terminateSession();
          }
        }),
        map(response => response.valid)
      );
    } else {
      this.terminateSession();
      return new Observable<boolean>(observer => observer.next(false));
    }
  }

  terminateSession() {
    if (this._token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this._token}`);
      this.http.delete('https://us-central1-cegep-al.cloudfunctions.net/session', { headers }).subscribe({
        next: () => {
          this._token = "";
          this._userName = "";
          this._sessionExists = false;
          this._isSessionActive = false;
          localStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('password');
          this._token = null;
          console.log('Session terminée');
        },
        error: () => {
          this._token = "";
          this._userName = "";
          this._sessionExists = false;
          this._isSessionActive = false;
          localStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('password');
          this._token = null;
        }
      });
    }
  }
}
