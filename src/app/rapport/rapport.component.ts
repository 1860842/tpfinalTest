import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../services/capture.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent implements OnInit {
  activities: any[] = [];

  constructor(private captureService: CaptureService) {}

  ngOnInit() {
    this.captureService.getAllActivities().subscribe(data => {
      this.activities = data;
    });
  }
}
