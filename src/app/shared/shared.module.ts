import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BookCardComponent, ConfirmComponent],
  exports: [BookCardComponent, ConfirmComponent],
})
export class SharedModule {}
