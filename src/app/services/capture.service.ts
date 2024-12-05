import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaptureService {

  constructor(private http: HttpClient) {

  }

  startActivity(description: string) {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activite';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const body = { description };
    return this.http.post<{ debut?: { value: string } }>(url, body, { headers }).pipe(
    
    );
  }

  stopActivity() {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activite';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.delete(url, { headers }).pipe(
 
    );
  }

  getActivity(): Observable<any> {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/activite';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any>(url, { headers }).pipe(
      tap(response => {
        console.log('Activity data:', response);
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

}
