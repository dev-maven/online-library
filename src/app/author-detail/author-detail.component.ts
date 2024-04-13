import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  author: Author | undefined = undefined;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((params) => {
      const name = params['name'];
      this.authorService.getAuthor(name).subscribe(async (result) => {
        this.author = result.docs.find((x) => x.key === id);
        if (this.author) {
          await this.loadImage(this.author);
          this.author.top_subjects = this.author.top_subjects.slice(0, 5);
        }
      });
    });
  }

  loadImage(author: Author) {
    this.authorService
      .checkImage(`https://covers.openlibrary.org/a/olid/${author.key}.json`)
      .subscribe({
        next: (result: any) => {
          if (result === 'success') {
            author.imageUrl = `https://covers.openlibrary.org/a/olid/${author.key}-M.jpg`;
          } else {
            author.imageUrl = '/assets/images/author.png';
          }
        },
        error: (err) => {
          author.imageUrl = '/assets/images/author.png';
        },
      });
  }
}
