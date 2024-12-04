import { Component, OnInit } from '@angular/core';
import { EnregistrementService } from '../services/enregistrement.service';
import { SessionService } from '../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profile: any;

  constructor(
    private enregistrementService: EnregistrementService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
   /* const username = sessionStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (username && token) {
      this.enregistrementService.getUserProfile(username, token).subscribe({
        next: (profiles) => {
          if (profiles.length > 0) {
            this.profile = profiles[0];
            console.log('Profile fetched successfully', this.profile);
          } else {
            console.error('Profile not found');
          }
        },
        error: (error) => {
          console.error('Error fetching profile', error);
        }
      });
    } else {
      console.error('Username or token is missing');
    }*/
  }
}
