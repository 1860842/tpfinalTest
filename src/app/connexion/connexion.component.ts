import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  onSubmit() {
    if (this.username && this.password) {
      console.log(this.username, this.password);
      if (this.authService.authenticate(this.username, this.password)) {
        if (!this.sessionService.isSessionActive()) {
          this.sessionService.createSession(this.username, this.password);
        }
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    }
  }
  ngOnInit(){
  console.log('Page login');
}
}
