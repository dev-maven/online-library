import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((a) => a.HomeModule),
  },
  {
    path: 'book-detail/:id',
    loadChildren: () =>
      import('./pages/book-detail/book-detail.module').then(
        (a) => a.BookDetailModule
      ),
  },
  {
    path: 'author-detail/:id',
    loadChildren: () =>
      import('./pages/author-detail/author-detail.module').then(
        (a) => a.AuthorDetailModule
      ),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./pages/wishlist/wishlist.module').then((a) => a.WishlistModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
