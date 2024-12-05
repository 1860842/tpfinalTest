import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AideService {
  private apiUrl = 'https://us-central1-cegep-al.cloudfunctions.net';
  private aideContentSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getAide(langue: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.apiUrl}/aide2024/${langue}`, { headers }).pipe(
      tap(data => this.aideContentSubject.next(data)),
      catchError(this.handleError)
    );
  }

  get aideContent$(): Observable<any> {
    return this.aideContentSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
