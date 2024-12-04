import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiUrl = 'us-central1-cegep-al.cloudfunctions.net';
  private _token = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private _userName = new BehaviorSubject<string>('');
  private _sessionExists = new BehaviorSubject<boolean>(false);
  private _isSessionActive = new BehaviorSubject<boolean>(false);
  private _isTokenValid = new BehaviorSubject<boolean>(true);
  
  constructor(private http: HttpClient) {
    console.log("Serveur : " + this.apiUrl);
    if (this._token.value) {
      this.validateToken().subscribe({
        next: (isValid) => {
          this._isTokenValid.next(isValid);
          if (isValid) {
            console.log('Token is valid');
            this.getUsername().subscribe(username => {
              sessionStorage.setItem('username', username);
            });
          } else {
            console.log('Token is invalid on init');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la validation du token au démarrage', err);
        }
      });
    } else {
      this._isTokenValid.next(false);
    }
  }

  get userName(): Observable<string> {
    return this._userName.asObservable();
  }

  get sessionExists(): Observable<boolean> {
    return this._sessionExists.asObservable();
  }

  get isSessionActive(): Observable<boolean> {
    return this._isSessionActive.asObservable();
  }

  get isTokenValid(): Observable<boolean> {
    return this._isTokenValid.asObservable();
  }

  getToken(): string | null {
    return this._token.value;
  }

  createSession(username: string, password: string): Observable<boolean> {
    return this.http.post<string>(
      'https://us-central1-cegep-al.cloudfunctions.net/session',
      { username, password }
    ).pipe(
      tap(token => {
        console.log('Session creee avec succes');
        console.log('Token utilisateur: ', token);
        localStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        this._token.next(token);
        this._sessionExists.next(true);
        this._isSessionActive.next(true);
        this._userName.next(username);
      }),
      map(() => this._sessionExists.value)
    );
  }

  destroySession(): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `${this._token.value}`
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
        this._token.next(null);
        this._sessionExists.next(false);
        this._isSessionActive.next(false);
        this._userName.next('');
      })
    );
  }

  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `${this._token.value}`
    });
    return this.http.get<{ valid: boolean }>(
      'https://us-central1-cegep-al.cloudfunctions.net/secret',
      { headers }
    ).pipe(
      map(response => response.valid),
      tap(isValid => {
        this._isTokenValid.next(isValid);
        this._isSessionActive.next(isValid);
        if (isValid) {
          console.log('Session valide');
          this.getUsername().subscribe(username => {
            sessionStorage.setItem('username', username);
          });
        } else {
          this._token.next(null);
          this._sessionExists.next(false);
          this._isSessionActive.next(false);
          this._userName.next('');
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
      'Authorization': `${this._token.value}`
    });
    return this.http.get<{ owner: string }>(
      'https://us-central1-cegep-al.cloudfunctions.net/secret',
      { headers }
    ).pipe(
      map(response => response.owner),
      tap(username => {
        this._userName.next(username);
      })
    );
  }

  getUserId(): string {
    return this._isSessionActive.value ? this._userName.value : '';
  }
}
