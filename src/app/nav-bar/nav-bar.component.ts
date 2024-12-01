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
    this.sessionService.myUsernameSubject.subscribe(username => {
      this.username = username;
    });
    if (this.sessionActive()) {
      this.username = sessionStorage.getItem('username');
    }
  }

  sessionActive(): boolean {
    return this.sessionService.isSessionActive;
  }

  logout() {
    this.sessionService.terminateSession();
    this.username = null;
  }

  login() {
    this.router.navigate(['/connexion']);
  }
}
