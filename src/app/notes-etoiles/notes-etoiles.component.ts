import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-etoiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-etoiles.component.html',
  styleUrl: './notes-etoiles.component.css'
})
export class NotesEtoilesComponent {
  @Input() note: number = 0; 
  @Output() noteTotale = new EventEmitter<number>(); 

  // Envoie la note totale
  nbEtoiles(etoile: number): void {
    this.note = etoile;
    this.noteTotale.emit(this.note);
  }
}
