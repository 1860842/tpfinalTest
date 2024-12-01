import { Component } from '@angular/core';
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
export class NavBarComponent {
  username: string | null = null;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
 
  }

  sessionActive(): boolean {
    return true;
  }

  logout() {
    this.sessionService.termineSession();
  }

  login() {
    this.router.navigate(['/connexion']);
  }
}
