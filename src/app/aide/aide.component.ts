import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { AideService } from '../services/aide.service';
import { Observable } from 'rxjs';
import { AideEnfantComponent } from '../aide-enfant/aide-enfant.component';

@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [MatRadioModule, RouterOutlet, NavBarComponent, FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterModule, AideEnfantComponent],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.css'
})
export class AideComponent implements OnInit {
  aideContent: { application: { nom: string, description: string, vues: any[] } } | null = null;
  langue: string = (document.documentElement.lang || 'fr').substring(0, 2);
  selectedView: any = null;

  constructor(private aideService: AideService) {}

  ngOnInit(): void {
    this.afficherAide();
    this.aideService.aideContent$.subscribe({ 
      next: (data: { application: { nom: string, description: string, vues: any[] } }) => {
        this.aideContent = data;
      },
      error: (err) => {
        console.error('Error fetching aide content', err);
      }
    });
  }

  afficherAide(): void {
    this.aideService.getAide(this.langue).subscribe({
      next: (data) => {
        this.aideContent = data;
        console.log(this.langue);
        console.log(this.aideContent?.application);
      },
      error: (err) => {
        console.error('Error fetching aide content', err);
      }
    });
  }

  selectView(view: any): void {
    this.selectedView = this.selectedView === view ? null : view;
  }
}