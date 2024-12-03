import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommentCaptureComponent } from "../comment-capture/comment-capture.component";
import { NotesEtoilesComponent } from '../notes-etoiles/notes-etoiles.component';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-comment-affichage',
  standalone: true,
  imports: [NotesEtoilesComponent, CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule, CommentCaptureComponent],
  templateUrl: './comment-affichage.component.html',
  styleUrl: './comment-affichage.component.css'
})
export class CommentAffichageComponent {
  commentaires: { id: string, commentaire: string, note: number, userid: string }[] = [];
  isSessionActive: boolean = false;
  currentUserid: string = '';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  ngOnInit() {
    this.isSessionActive = this.sessionService.isSessionActive;
    this.currentUserid = sessionStorage.getItem('username') || '';
  }

  ajouterCommentaire(nvxCommentaire: { commentaire: string; note: number }) {
    const userid = this.isSessionActive ? this.currentUserid : '';
    const commentData = {
      message: nvxCommentaire.commentaire,
      rating: nvxCommentaire.note,
      userid: userid
    };

    this.http.post<{ id: string }>('https://us-central1-cegep-al.cloudfunctions.net/commentaire', commentData).subscribe({
      next: (response) => {
        this.commentaires.push({ id: response.id, commentaire: nvxCommentaire.commentaire, note: nvxCommentaire.note, userid: userid });
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du commentaire', err);
      }
    });
  }

  supprimerCommentaire(commentaireId: string, commentaireUserid: string) {
    if (this.isSessionActive && (commentaireUserid === '' || commentaireUserid === this.currentUserid)) {
      this.http.delete(`https://us-central1-cegep-al.cloudfunctions.net/commentaire/${commentaireId}`).subscribe({
        next: () => {
          this.commentaires = this.commentaires.filter(commentaire => commentaire.id !== commentaireId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du commentaire', err);
        }
      });
    } else {
      console.error('Vous n\'avez pas la permission de supprimer ce commentaire');
    }
  }

  canDeleteComment(commentaireUserid: string): boolean {
    return this.isSessionActive && (commentaireUserid === '' || commentaireUserid === this.currentUserid);
  }
}
