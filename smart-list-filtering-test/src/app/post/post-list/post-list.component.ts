import { Component, OnInit } from '@angular/core';
import { ListData } from 'src/app/shared/components/list/list.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Post } from '../post.model';
import { AppPostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public listData: ListData = new ListData();

  constructor(
    private postService: AppPostService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.list();
    this.shared.emitPostReload.subscribe(
      () => {
        this.list();
      }
    )
  }

  list() {
    this.postService.list().subscribe(
      (resp: Post) => {
        this.listData = {
          entity: 'post',
          rows: resp,
          loading: false,
          initialSort: 'userId',
          columns: [
            { 
              prop: 'userId',
              name: 'User ID'
            },
            { 
              prop: 'title',
              name: 'Title'
            },
            { 
              prop: 'actions',
              name: 'Actions'
            },
          ]
        };
      }
    );
  }
}
