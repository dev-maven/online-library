import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookSubject } from '../models/subject';
import { Book } from '../models/book';

@Injectable()
export class BookService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSubjects(subject: string): Observable<BookSubject> {
    return this.http.get<BookSubject>(
      `${this.baseUrl}subjects/${subject}.json`
    );
  }

  getBooksFromLocalStorage() {
    const localBooks = sessionStorage.getItem('books');
    return localBooks ? JSON.parse(localBooks) : [];
  }

  getBookDetail(id: string): Book | undefined {
    const localBooksJson = sessionStorage.getItem('books');

    if (localBooksJson) {
      const localBooks: Book[] = JSON.parse(localBooksJson);
      return localBooks.find((x) => x.book_olid === id);
    }
    return undefined;
  }
}
