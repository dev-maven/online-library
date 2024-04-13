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
    loadChildren: () => import('./home/home.module').then((a) => a.HomeModule),
  },
  {
    path: 'book-detail/:id',
    loadChildren: () =>
      import('./book-detail/book-detail.module').then(
        (a) => a.BookDetailModule
      ),
  },
  {
    path: 'author-detail/:id',
    loadChildren: () =>
      import('./author-detail/author-detail.module').then(
        (a) => a.AuthorDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
