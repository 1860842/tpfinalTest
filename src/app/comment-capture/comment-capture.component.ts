import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { NotesEtoilesComponent } from '../notes-etoiles/notes-etoiles.component';

@Component({
  selector: 'app-comment-capture',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass, NotesEtoilesComponent],
  templateUrl: './comment-capture.component.html',
  styleUrl: './comment-capture.component.css'
})
export class CommentCaptureComponent {

  @Output() commentaireSoumis = new EventEmitter<{ commentaire: string; note: number }>();

  commentaire: string = '';
  note: number = 0;

  noteSelectionner(note: number) {
    this.note = note;
  }

  // Soumet les commentaires au composant comment-affichage
  soumettre() {
    if (this.commentaire.trim().length > 0 && this.note > 0) {
      console.log('Commentaire soumis :', this.commentaire);
      console.log('Note soumise:', this.note);
      this.commentaireSoumis.emit({ commentaire: this.commentaire, note: this.note });
    
      this.commentaire = ''; 
      this.note = 0;
    }
  }
}
