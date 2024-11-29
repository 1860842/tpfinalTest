import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  createSession(username: string) {
    sessionStorage.setItem('user', username);
  }

  destroySession() {
    sessionStorage.removeItem('user');
  }

  isSessionActive(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}
