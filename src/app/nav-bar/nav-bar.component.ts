import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  constructor(
    private sessionService: SessionService
  ) {}

  sessionActive(): boolean {
    return this.sessionService.isSessionActive();
  }
}
