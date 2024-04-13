import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookSubject } from '../models/subject';
import { Book } from '../models/book';
import { BookDoc, SearchResult } from '../models/search-result';

export interface SearchParams {
  searchText: string;
  searchKey: string;
}
@Injectable()
export class BookService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSubjects(subject: string): Observable<BookSubject> {
    return this.http.get<BookSubject>(
      `${this.baseUrl}subjects/${subject}.json`
    );
  }

  search(params: SearchParams): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `${
        this.baseUrl
      }search.json?${params.searchKey.toLowerCase()}=${params.searchText.toLowerCase()}`
    );
  }

  getBookDetail(id: string, title: string): Observable<Book | undefined> {
    return new Observable<Book | undefined>((observer) => {
      let selectedBook: Book | undefined = this.loadBookFromStorage(id);
      if (selectedBook) {
        observer.next(selectedBook);
        return;
      }

      const search = {
        searchText: title,
        searchKey: 'title',
      };
      this.search(search).subscribe({
        next: (result) => {
          const book = result.docs.find(
            (x) => x.key.substring(x.key.lastIndexOf('/') + 1) === id
          );
          if (book) {
            selectedBook = this.mapBook(book);
            observer.next(selectedBook);
          } else {
            observer.next(undefined);
          }
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  mapBook(book: BookDoc): Book {
    return {
      title: book.title,
      author: book.author_name[0],
      cover_id: book.cover_i,
      first_publish_year: book.first_publish_year,
      edition_count: book.edition_count,
      book_olid: book.key.substring(book.key.lastIndexOf('/') + 1),
      author_olid: book.author_key[0].substring(
        book.author_key[0].lastIndexOf('/') + 1
      ),
      cover_url: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
        : '',
    };
  }

  getBooksFromLocalStorage() {
    const localBooks = sessionStorage.getItem('books');
    return localBooks ? JSON.parse(localBooks) : null;
  }

  loadBookFromStorage(id: string): Book | undefined {
    const localBooks = this.getBooksFromLocalStorage();
    if (localBooks) return localBooks.find((x: Book) => x.book_olid === id);

    return undefined;
  }
}
