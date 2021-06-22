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

  get(id: number): Observable<Post> {
    return this.http.get<Post>(environment.API_ENDPOINT + 'posts/' + id);
  }

  update(data: Post, id: number) {
    return this.http.put<Post>(environment.API_ENDPOINT + 'posts/' + id, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.API_ENDPOINT + 'posts/' + id);
  }

  create(data: Post): Observable<Post> {
    return this.http.post<Post>(environment.API_ENDPOINT + 'posts', data);
  }
}
