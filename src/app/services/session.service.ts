import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  createSession(username: string, password: string) {
    sessionStorage.setItem('user', username);
    sessionStorage.setItem('password', password);
    console.log('Session active');	
  }

  destroySession() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('password');
  }

  isSessionActive(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  getSessionUser(): string | null {
    return sessionStorage.getItem('user');
  }

  getSessionPassword(): string | null {
    return sessionStorage.getItem('password');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('user');
  }
}
