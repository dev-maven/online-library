import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: Book | undefined = undefined;
  isBookInWishList = false;
  showConfirmModal = false;
  modalTitle = '';
  private wishListSubscription: Subscription | undefined;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private wishListService: WishlistService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.book = this.bookService.getBookDetail(id);
      if (this.book) {
        this.book.cover_url = this.book.cover_url
          ? this.book.cover_url.replace(/-S\.jpg$/, '-L.jpg')
          : '/assets/images/placeholder.png';

        this.isBookInWishList = this.wishListService.isBookInWishList(
          this.book.book_olid
        );
        this.wishListSubscription = this.wishListService
          .getWishList()
          .subscribe((wishList) => {
            this.isBookInWishList = wishList.some(
              (book) => book.book_olid === this.book?.book_olid
            );
          });
      }
    }
  }

  toggleWishList(): void {
    this.modalTitle = this.isBookInWishList
      ? ` Are you sure you want to remove <strong>${this.book?.title}</strong> from your wish list ? `
      : ` Are you sure you want to add <strong>${this.book?.title}</strong> to your wish list ?`;
    this.showConfirmModal = true;
  }

  onConfirm(confirm: boolean) {
    if (confirm) {
      if (this.book) {
        if (this.isBookInWishList) {
          this.wishListService.removeFromWishList(this.book.book_olid);
        } else {
          this.wishListService.addToWishList(this.book);
        }
      }
    }
    this.showConfirmModal = false;
  }

  ngOnDestroy(): void {
    if (this.wishListSubscription) {
      this.wishListSubscription.unsubscribe();
    }
  }
}
