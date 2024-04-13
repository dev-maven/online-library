import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorDetailComponent } from './author-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

export const routes = [
  {
    path: '',
    component: AuthorDetailComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [AuthorDetailComponent],
})
export class AuthorDetailModule {}
