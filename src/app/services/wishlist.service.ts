import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishList: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor() {
    this.loadWishList();
  }

  loadWishList(): void {
    const wishListJson = sessionStorage.getItem('book-wishlist');
    if (wishListJson) {
      const wishList: Book[] = JSON.parse(wishListJson);
      this.wishList.next(wishList);
    }
  }

  getWishList(): Observable<Book[]> {
    return this.wishList.asObservable();
  }

  addToWishList(book: Book): void {
    const currentWishList = this.wishList.value;
    currentWishList.push(book);
    this.updateWishList(currentWishList);
  }

  private updateWishList(wishList: Book[]): void {
    this.wishList.next(wishList);
    this.saveWishListToSessionStorage(wishList);
  }

  private saveWishListToSessionStorage(wishList: Book[]): void {
    const wishListJson = JSON.stringify(wishList);
    sessionStorage.setItem('book-wishlist', wishListJson);
  }

  removeFromWishList(bookId: string): void {
    const currentWishList = this.wishList.value;
    const updatedWishList = currentWishList.filter(
      (book) => book.book_olid !== bookId
    );
    this.updateWishList(updatedWishList);
  }

  isBookInWishList(bookId: string): boolean {
    const currentWishList = this.wishList.value;
    return currentWishList.some((book) => book.book_olid === bookId);
  }
}
