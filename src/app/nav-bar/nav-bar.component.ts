import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string | null = null;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.username = sessionStorage.getItem('username');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la validation du token', err);
      }
    });
  }

  sessionActive(): boolean {
    let isActive = false;
    this.sessionService.isSessionActive.subscribe(value => isActive = value);
    return isActive;
  }

  logout() {
    this.sessionService.destroySession().subscribe({
      next: () => {
        this.username = null;
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
      }
    });
  }

  login() {
    this.router.navigate(['/connexion']);
  }

  validateToken() {
    this.sessionService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          console.log('Token is valid');
        } else {
          console.log('Token is invalid');
          this.router.navigate(['/connexion']);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la validation du token', err);
        this.router.navigate(['/connexion']);
      }
    });
  }
}
