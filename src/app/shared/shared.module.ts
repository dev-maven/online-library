import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { ConfirmComponent } from './confirm.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BookCardComponent, ConfirmComponent, NotFoundComponent],
  exports: [BookCardComponent, ConfirmComponent, NotFoundComponent],
})
export class SharedModule {}
