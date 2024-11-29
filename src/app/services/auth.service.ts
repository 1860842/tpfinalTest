import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private sessionService: SessionService) { }

  authenticate(username: string, password: string): boolean {
    const sessionUser = this.sessionService.getSessionUser();
    const sessionPassword = this.sessionService.getSessionPassword();

    if (sessionUser && sessionPassword) {
      return username === sessionUser && password === sessionPassword;
    }

    // If no user is found in session storage, create a new session
    this.sessionService.createSession(username, password);
    return true;
  }
}
