import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private apiUrl = 'https://us-central1-cegep-al.cloudfunctions.net/commentaire';
  private _comments = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  postComment(commentaire: string, note: number, userId: string, token: string | null): Observable<any> {
    const body = { message: commentaire, rating: note };
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.post(this.apiUrl, { ...body, userid: userId }, { headers }).pipe(
      tap(response => {
        this._comments.next([...this._comments.value, response]);
      })
    );
  }

  getComments(token: string | null): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      tap(comments => {
        this._comments.next(comments);
      })
    );
  }

  deleteComment(commentId: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.delete(`${this.apiUrl}/${commentId}`, { headers }).pipe(
      tap(() => {
        this._comments.next(this._comments.value.filter(comment => comment.id !== commentId));
      })
    );
  }

  get comments(): Observable<any[]> {
    return this._comments.asObservable();
  }
}
