import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, BehaviorSubject, Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaptureService {
  private _activiteEnCours = new BehaviorSubject<boolean>(false);
  private _tempsEcouler = new BehaviorSubject<number>(0); // New variable to track elapsed time
  private _tempsDebut = new BehaviorSubject<Date | null>(null); // New variable to track start time
  activiteEnCours$ = this._activiteEnCours.asObservable();
  tempsEcouler$ = this._tempsEcouler.asObservable(); // Observable for the new variable
  tempsDebut$ = this._tempsDebut.asObservable(); // Observable for the new variable

  constructor(private http: HttpClient) {
    interval(1000).subscribe(() => {
      if (this._activiteEnCours.value && this._tempsDebut.value) {
        const now = new Date().getTime();
        const start = new Date(this._tempsDebut.value).getTime();
        const elapsed = Math.floor((now - start) / 1000);
        this._tempsEcouler.next(elapsed);
      }
    });
  }

  startActivity(description: string) {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activite';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const body = { description };
    return this.http.post<{ debut?: { value: string } }>(url, body, { headers }).pipe(
      tap(response => {
        console.log('Activity started:', response);
        this._activiteEnCours.next(true);
        this._tempsEcouler.next(0); // Reset elapsed time when activity starts
        this._tempsDebut.next(new Date()); // Set start time when activity starts
      })
    );
  }

  stopActivity() {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activite';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.delete(url, { headers }).pipe(
      tap(() => {
        this._activiteEnCours.next(false);
        this._tempsEcouler.next(0); // Reset elapsed time when activity stops
        this._tempsDebut.next(null); // Reset start time when activity stops
      })
    );
  }

  getActivity(): Observable<any> {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activite';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any>(url, { headers }).pipe(
      map(response => {
        console.log('Activity data:', response);
        if (response.length > 0) {
          this._activiteEnCours.next(true);
          this._tempsDebut.next(new Date(response[0].debut.value)); // Set start time from response
        } else {
          this._activiteEnCours.next(false);
          this._tempsDebut.next(null); // Reset start time if no activity
        }
        console.log('Lactivite est en cours: ', this._activiteEnCours.value);
        return response;
      })
    );
  }

  getAllActivities(): Observable<any> {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activites';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any>(url, { headers }).pipe(
      tap(response => {
        console.log('All activities data:', response);
      })
    );
  }

  updateElapsedTime(time: number) {
    this._tempsEcouler.next(time); // Method to update elapsed time
  }

  updateStartTime(time: Date) {
    this._tempsDebut.next(time); // Method to update start time
  }

}
