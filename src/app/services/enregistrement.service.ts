import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnregistrementService {
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
}
