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
    // Token validation moved to SessionService constructor
  }
}
