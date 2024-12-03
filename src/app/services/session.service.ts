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
        console.log('Session creee avec succes');
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

  destroySession(): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `${this._token}`
    });
    return this.http.delete<void>(
      'https://us-central1-cegep-al.cloudfunctions.net/session',
      { headers }
    ).pipe(
      tap(() => {
        console.log('La session et le token a ete detruite');
        localStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        this._token = null;
        this._sessionExists = false;
        this._isSessionActive = false;
        this._userName = '';
      })
    );
  }
  ngOnInit(){
    this.validateToken();
  }
  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `${this._token}`
    });
    return this.http.get<{ valid: boolean }>(
      'https://us-central1-cegep-al.cloudfunctions.net/secret',
      { headers }
    ).pipe(
      map(response => response.valid),
      tap(isValid => {
        this._isSessionActive = isValid;
        if (isValid) {
          console.log('Session valide');
          this.getUsername().subscribe(username => {
            sessionStorage.setItem('username', username);
          });
        } else {
          this._token = null;
          this._sessionExists = false;
          this._isSessionActive = false;
          this._userName = '';
          localStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('password');
          this.destroySession();
        }
      })
    );
  }

  getUsername(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `${this._token}`
    });
    return this.http.get<{ owner: string }>(
      'https://us-central1-cegep-al.cloudfunctions.net/secret',
      { headers }
    ).pipe(
      map(response => response.owner),
      tap(username => {
        this._userName = username;
      })
    );
  }

 
  getUserId(): string {
    return this._isSessionActive ? this._userName : '';
  }
}
