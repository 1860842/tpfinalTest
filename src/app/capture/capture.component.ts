import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../services/capture.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.css'
})
export class CaptureComponent {

  constructor(private captureService: CaptureService) {

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
}
