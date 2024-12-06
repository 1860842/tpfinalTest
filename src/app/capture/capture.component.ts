import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../services/capture.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.css'
})
export class CaptureComponent implements OnInit {
  activiteEnCours: boolean = false;
  tempsEcouler: number = 0; // Variable to store elapsed time
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(
    private captureService: CaptureService) 
    {
      this.captureService.activiteEnCours$.subscribe(status => {
        this.activiteEnCours = status;
      });
      this.captureService.tempsEcouler$.subscribe(time => {
        this.tempsEcouler = time;
        this.calculateTime();
      });
  }

  ngOnInit() {
    this.captureService.getActivity().subscribe();
  }

  startCapture(description: string) {
    this.captureService.startActivity(description).subscribe(response => {
      console.log('Activity started:', response);
    });
  }

  stopCapture() {
    this.captureService.stopActivity().subscribe(response => {
      console.log('Activity stopped:', response);
    });
  }

  getActivite(): Observable<any> {
    return this.captureService.getActivity();
  }

  logActivityInfo() {
    this.captureService.getActivity().subscribe(response => {
      console.log('Activity data:', response);
    });
  }

  logAllActivitiesInfo() {
    this.captureService.getAllActivities().subscribe(response => {
      console.log('All activities data:', response);
    });
  }

  private calculateTime() {
    this.hours = Math.floor(this.tempsEcouler / 3600);
    this.minutes = Math.floor((this.tempsEcouler % 3600) / 60);
    this.seconds = this.tempsEcouler % 60;
  }
}
