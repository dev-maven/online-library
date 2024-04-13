import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  showConfirmModal = false;
  modalTitle = '';
  constructor(
    private bookService: BookService,
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.books = this.bookService.getBooksFromLocalStorage();
    if (this.books.length === 0) {
      this.loadSubject();
    }
  }

  loadSubject() {
    this.bookService.getSubjects('finance').subscribe(
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

        sessionStorage.setItem('books', JSON.stringify(this.books));
      },
      (error) => console.log(error)
    );
  }

  checkBookInWishList(bookId: string): boolean {
    return this.wishlistService.isBookInWishList(bookId);
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

  goToBookDetail(id: string) {
    this.router.navigate(['book-detail', id]);
  }

  goToAuthorDetail(book: Book) {
    this.router.navigate(['author-detail', book.author_olid], {
      queryParams: { name: book.author },
    });
  }
}
