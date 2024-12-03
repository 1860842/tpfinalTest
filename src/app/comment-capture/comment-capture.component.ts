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

  @Output() commentaireSoumis = new EventEmitter<{ id: string; commentaire: string; note: number }>();

  commentaire: string = '';
  note: number = 0;
  messageSoumis: boolean = false;

  constructor(private commentairesService: CommentairesService, private sessionService: SessionService) {}

  noteSelectionner(note: number) {
    this.note = note;
  }

  soumettre() {
    const commentaire = {
      message: this.commentaire,
      rating: this.note
    };

    this.commentairesService.ajouterCommentaire(commentaire).subscribe(response => {
      this.commentaireSoumis.emit(response);
      this.commentaire = '';
      this.note = 0;
      this.messageSoumis = true;
      setTimeout(() => this.messageSoumis = false, 3000); // Hide message after 3 seconds
    });
  }
}