import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  books: Book[] | undefined = undefined;
  selectedBook: Book | null = null;
  private wishListSubscription: Subscription | undefined;
  showConfirmModal = false;
  modalTitle = '';
  constructor(
    private wishListService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.wishListSubscription = this.wishListService
      .getWishList()
      .subscribe((books) => (this.books = books));
  }

  removeFromWishlist(book: Book): void {
    this.selectedBook = book;
    this.modalTitle = ` Are you sure you want to remove <strong>${book?.title}</strong> from your wish list ? `;
    this.showConfirmModal = true;
  }

  onConfirm(confirm: boolean) {
    if (confirm) {
      if (this.selectedBook)
        this.wishListService.removeFromWishList(this.selectedBook.book_olid);
    }
    this.showConfirmModal = false;
  }

  ngOnDestroy(): void {
    if (this.wishListSubscription) {
      this.wishListSubscription.unsubscribe();
    }
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
