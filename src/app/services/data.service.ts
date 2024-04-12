import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookSubject } from '../models/subject';

@Injectable()
export class DataService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSubjects(subject: string): Observable<BookSubject> {
    return this.http.get<BookSubject>(
      `${this.baseUrl}subjects/${subject}.json`
    );
  }
}
