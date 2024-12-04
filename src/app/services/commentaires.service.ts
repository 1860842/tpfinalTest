import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private apiUrl = 'https://us-central1-cegep-al.cloudfunctions.net/commentaire';
  private _comments = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  getCommentaires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(comments => this._comments.next(comments))
    );
  }

  get comments(): Observable<any[]> {
    return this._comments.asObservable();
  }

  ajouterCommentaire(commentaire: { message: string; rating: number }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem('token')}`
    });
    return this.http.post<any>(this.apiUrl, commentaire, { headers }).pipe(
      tap(newComment => {
        const currentComments = this._comments.value;
        this._comments.next([...currentComments, newComment]);
      })
    );
  }

  supprimerCommentaire(id: string, userid: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem('token')}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap(() => {
        const currentComments = this._comments.value.filter(comment => {
          // Allow deletion if the comment is anonymous or belongs to the current user
          return comment.id !== id;
        });
        this._comments.next(currentComments);
      })
    );
  }

  getNombreCommentaires(): Observable<number> {
    return this.http.get<{ data?: { msgs_count?: number } }>(`${this.apiUrl}/nb-commentaires`).pipe(
      map(response => response?.data?.msgs_count || 0)
    );
  }
}
