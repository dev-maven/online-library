import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from '../utils/app-interceptor';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, HttpClientModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    BookService,
    AuthorService,
  ],
})
export class CoreModule {}
