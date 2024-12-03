import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  error: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.error = '';
    this.message = '';

    // Step 1: Get a token
    this.http.post<string>('https://us-central1-cegep-al.cloudfunctions.net/session', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (token) => {
        this.message = 'Token obtenu avec succès';
        console.log('Token obtenu avec succès');
        this.router.navigate(['/connexion']);
      },
      error: (err) => {
        this.error = 'Erreur lors de l\'obtention du token';
        console.error('Erreur lors de l\'obtention du token', err);
      }
    });
  }
}
