import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommentCaptureComponent } from "../comment-capture/comment-capture.component";
import { NotesEtoilesComponent } from '../notes-etoiles/notes-etoiles.component';
import { CommentairesService } from '../services/commentaires.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-comment-affichage',
  standalone: true,
  imports: [NotesEtoilesComponent, CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule, CommentCaptureComponent],
  templateUrl: './comment-affichage.component.html',
  styleUrl: './comment-affichage.component.css'
})
export class CommentAffichageComponent implements OnInit {
  commentaires: any[] = [];

  constructor(private commentairesService: CommentairesService) {}

  ngOnInit() {
    this.commentairesService.getCommentaires().subscribe(comments => {
      this.commentaires = comments;
    });
  }

  ajouterCommentaire(commentaire: { id: string; commentaire: string; note: number }) {
    this.commentaires.push(commentaire);
  }

  supprimerCommentaire(id: string) {
    this.commentaires = this.commentaires.filter(comment => comment.id !== id);
  }
}
