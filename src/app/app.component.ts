import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed typo here
})
export class AppComponent implements OnInit{
  title = 'tpFinalTest';
  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit(){
    this.sessionService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          console.log('Token is valid');
          this.sessionService.getUsername().subscribe(username => {
            sessionStorage.setItem('username', username);
          });
        } else {
          console.log('Token is invalid on init');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la validation du token au démarrage', err);
      }
    });
  }
}
