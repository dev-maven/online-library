import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book | null = null;
  @Output() openBookDetail = new EventEmitter();
  @Output() openAuthorDetail = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  navigateToBookDetail() {
    this.openBookDetail.emit(this.book?.book_olid);
  }

  navigateToAuthorDetail() {
    this.openAuthorDetail.emit(this.book);
  }
}
