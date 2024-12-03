import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private apiUrl = 'https://us-central1-cegep-al.cloudfunctions.net/commentaire';

  constructor(private http: HttpClient) { }

  postComment(commentaire: string, note: number, userId: string, token: string | null): Observable<any> {
    const body = { message: commentaire, rating: note };
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.post(this.apiUrl, { ...body, userid: userId }, { headers });
  }
}
