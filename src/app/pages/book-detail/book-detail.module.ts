import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

export const routes = [
  {
    path: '',
    component: BookDetailComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [BookDetailComponent],
})
export class BookDetailModule {}
