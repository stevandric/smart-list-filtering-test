import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})

export class AppPostService {

  constructor(
    private http: HttpClient
  ) {
  }

  list(): Observable<Post> {
    return this.http.get<Post>(environment.API_ENDPOINT + 'posts');
  }

  get() {

  }

  edit() {

  }

  delete() {

  }
}
