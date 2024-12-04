import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnregistrementService {
  private apiUrl = 'http://localhost:3000'; // URL du serveur local

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string, email: string) {
    const url = 'https://us-central1-cegep-al.cloudfunctions.net/create-user';
    const body = {
      username,
      password,
      email,
      key: 'cal41202'
    };
    return this.http.post(url, body);
  }
/*
  createProfile(profileData: any): Observable<any> {
    const url = `${this.apiUrl}/profiles`;
    return this.http.post(url, profileData);
  }

  getUserProfile(username: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/profiles?username=${username}`;
    const headers = { 'Authorization': `${token}` };
    return this.http.get(url, { headers });
  }*/
}
