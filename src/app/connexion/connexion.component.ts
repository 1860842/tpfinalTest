import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../services/session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
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
      next: (isActive) => {
        if (isActive) {
          this.message = 'Session créée avec succès';
          this.router.navigate(['/mytime']);
          this.username = ''; // Clear username field
          this.password = ''; // Clear password field
        } else {
          this.error = 'La session n\'a pas pu être créée';
          this.message = '';
          this.submitted = false;
          console.log('La session n\'a pas pu être créée');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.msg;
        this.message = '';
        this.submitted = false;
        console.log('La session n\'a pas pu être créée');
      }
    });
  }
}
