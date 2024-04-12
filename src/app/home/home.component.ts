import { Component, OnInit } from '@angular/core';
import { BookSubject, Work } from '../models/subject';
import { DataService } from '../services/data.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadSubject();
  }

  loadSubject() {
    this.dataService.getSubjects('finance').subscribe(
      (result) => {
        let selectedBooks = result.works.slice(0, 9);
        this.books = selectedBooks.map((book) => ({
          title: book.title,
          author: book.authors[0].name,
          cover_id: book.cover_id,
          first_publish_year: book.first_publish_year,
          edition_count: book.edition_count,
          book_olid: book.key.substring(book.key.lastIndexOf('/') + 1),
          author_olid: book.authors[0].key.substring(
            book.authors[0].key.lastIndexOf('/') + 1
          ),
          cover_url: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`
            : '',
        }));

        console.log(this.books);
      },
      (error) => console.log(error)
    );
  }
}
