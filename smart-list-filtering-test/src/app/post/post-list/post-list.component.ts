import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { AppPostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  rows: Post;

  columns = [{ prop: 'userId' }, { prop: 'title' }];

  constructor(
    private postService: AppPostService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.postService.list().subscribe(
      (resp: Post) => {
        console.log('resp: ', resp);
        this.rows = resp;
      }
    );
  }


}
