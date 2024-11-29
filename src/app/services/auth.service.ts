import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticate(username: string, password: string): boolean {
    // Replace with real authentication logic
    return username === 'admin' && password === 'admin';
  }
}
