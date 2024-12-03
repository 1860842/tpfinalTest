import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommentCaptureComponent } from "../comment-capture/comment-capture.component";
import { NotesEtoilesComponent } from '../notes-etoiles/notes-etoiles.component';

@Component({
  selector: 'app-comment-affichage',
  standalone: true,
  imports: [NotesEtoilesComponent, CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule, CommentCaptureComponent],
  templateUrl: './comment-affichage.component.html',
  styleUrl: './comment-affichage.component.css'
})
export class CommentAffichageComponent {
  // Tableaux des commentaires
  commentaires: { commentaire: string, note: number }[] = [];

  // Ajoute un commentaire au tableau de commentaires
  ajouterCommentaire(nvxCommentaire: { commentaire: string; note: number }) {
    this.commentaires.push(nvxCommentaire);
}
}
