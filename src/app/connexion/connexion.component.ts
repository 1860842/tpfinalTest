import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../services/session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  
  username: string = ''
  password: string = ''

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitted = false;
  error = '';
  message = '';

  creeSession() {
    this.submitted = true;
    this.error = '';
    this.sessionService.createSession(this.username, this.password).subscribe({
      next: (token) => {
        this.message = 'Session créée';
        this.submitted = true;
        console.log('Session créée');
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.msg;
        this.submitted = false;
        console.log('La session n\'a pas pu être créée');
      }
    });
  }
}
