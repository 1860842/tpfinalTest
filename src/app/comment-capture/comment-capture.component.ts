import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { NotesEtoilesComponent } from '../notes-etoiles/notes-etoiles.component';
import { CommentairesService } from '../services/commentaires.service';
import { SessionService } from '../services/session.service';

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

  constructor(private commentairesService: CommentairesService, private sessionService: SessionService) {}

  noteSelectionner(note: number) {
    this.note = note;
  }

  // Soumet les commentaires au composant comment-affichage
  soumettre() {
    if (this.commentaire.trim().length > 0 && this.note > 0) {
      this.sessionService.isSessionActive.subscribe(isSessionActive => {
        const token = this.sessionService.getToken();
        console.log('Session active:', isSessionActive);
        if (isSessionActive) {
          this.sessionService.getUsername().subscribe(username => {
            const userId = username;
            this.commentairesService.postComment(this.commentaire, this.note, userId, token).subscribe(response => {
              console.log('Commentaire soumis à l\'API:', response);
              this.commentaireSoumis.emit({ commentaire: this.commentaire, note: this.note });
              this.commentaire = ''; 
              this.note = 0;
            });
          });
        } else {
          const userId = '';
          this.commentairesService.postComment(this.commentaire, this.note, userId, token).subscribe(response => {
            console.log('Commentaire soumis à l\'API:', response);
            this.commentaireSoumis.emit({ commentaire: this.commentaire, note: this.note });
            this.commentaire = ''; 
            this.note = 0;
          });
        }
      });
    }
  }
}
