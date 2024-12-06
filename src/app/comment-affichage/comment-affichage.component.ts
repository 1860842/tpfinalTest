import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommentCaptureComponent } from "../comment-capture/comment-capture.component";
import { NotesEtoilesComponent } from '../notes-etoiles/notes-etoiles.component';
import { CommentairesService } from '../services/commentaires.service';
import { SessionService } from '../services/session.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-comment-affichage',
  standalone: true,
  imports: [NotesEtoilesComponent, CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule, CommentCaptureComponent, NavBarComponent],
  templateUrl: './comment-affichage.component.html',
  styleUrl: './comment-affichage.component.css'
})
export class CommentAffichageComponent implements OnInit {
  commentaires: any[] = [];
  nombreCommentaires: number = 0;

  constructor(private commentairesService: CommentairesService, private sessionService: SessionService) {
    this.commentairesService.comments.subscribe(comments => {
      this.commentaires = comments;
      this.nombreCommentaires = comments.length;
    });
    this.commentairesService.getCommentaires().subscribe();
    this.commentairesService.getNombreCommentaires().subscribe(count => {
      this.nombreCommentaires = count;
      console.log('Nombre de commentaires: ', this.nombreCommentaires);
    });
  }

  ngOnInit() {}

  ajouterCommentaire(commentaire: { id: string; commentaire: string; note: number }) {
    this.commentairesService.getCommentaires().subscribe(() => {
      this.commentairesService.getNombreCommentaires().subscribe(count => {
        this.nombreCommentaires = count;
      });
    });
  }

  supprimerCommentaire(id: string) {
    const userid = this.sessionService.getUserId();
    const commentaire = this.commentaires.find(comment => comment.id === id);
    if (commentaire && (commentaire.userid === '' || commentaire.userid === null || commentaire.userid === userid)) {
      this.commentairesService.supprimerCommentaire(id, userid).subscribe(() => {
        this.commentaires = this.commentaires.filter(comment => comment.id !== id);
        this.commentairesService.getNombreCommentaires().subscribe(count => {
          this.nombreCommentaires = count;
        });
      });
    }
  }
}
