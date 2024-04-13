import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, flatMap, map, mergeMap, of } from 'rxjs';
import { AuthorSearch } from '../models/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAuthor(name: string): Observable<AuthorSearch> {
    return this.http.get<AuthorSearch>(
      `${this.baseUrl}search/authors.json?q=${name}`
    );
  }

  checkImage(url: string) {
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response) => {
        if (response.status === 404) {
          return '/assets/images/author.png';
        } else {
          return 'success';
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return of('/assets/images/author.png');
      })
    );
  }
}
