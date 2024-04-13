import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService, SearchParams } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group({
    searchText: [''],
    searchKey: ['Title'],
  });
  books: Book[] = [];
  noResult = false;
  showConfirmModal = false;
  modalTitle = '';
  selectedBook: Book | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private wishlistService: WishlistService,
    private bookService: BookService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.bookService.search(this.searchForm.value as SearchParams).subscribe({
      next: (result) => {
        if (result.docs && result.docs.length > 0) {
          this.noResult = false;
          let selectedBooks = result.docs.slice(0, 9);
          this.books = selectedBooks.map((book) =>
            this.bookService.mapBook(book)
          );
        } else {
          this.books = [];
          this.noResult = true;
        }
      },
      error: (error) => {
        this.noResult = true;
      },
    });
  }

  toggleWishList(book: Book): void {
    this.selectedBook = book;
    this.modalTitle = this.checkBookInWishList(book.book_olid)
      ? ` Are you sure you want to remove <strong>${book?.title}</strong> from your wish list ? `
      : ` Are you sure you want to add <strong>${book.title}</strong> to your wish list ?`;
    this.showConfirmModal = true;
  }

  onConfirm(confirm: boolean) {
    if (confirm) {
      if (this.selectedBook) {
        if (this.checkBookInWishList(this.selectedBook.book_olid)) {
          this.wishlistService.removeFromWishList(this.selectedBook.book_olid);
        } else {
          this.wishlistService.addToWishList(this.selectedBook);
        }
      }
    }
    this.showConfirmModal = false;
  }

  checkBookInWishList(bookId: string): boolean {
    return this.wishlistService.isBookInWishList(bookId);
  }

  goToBookDetail(book: Book) {
    this.router.navigate(['book-detail', book.book_olid], {
      queryParams: { title: book.title },
    });
  }

  goToAuthorDetail(book: Book) {
    this.router.navigate(['author-detail', book.author_olid], {
      queryParams: { name: book.author },
    });
  }
}
