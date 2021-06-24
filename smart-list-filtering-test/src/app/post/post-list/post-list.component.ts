import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListData } from 'src/app/shared/components/list/list.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import * as ListConstant from './../../shared/constants/lists';
import { AppPostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public listData: ListData = new ListData();
  public filterData: ListData = new ListData();

  constructor(
    private postService: AppPostService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.list();
    this.subscriptions.push(
      this.shared.emitPostReload.subscribe(
        () => {
          this.list();
        }
      )
    )
  }

  list() {
    this.subscriptions.push(
      this.postService.list().subscribe(
        (resp: Post) => {
          this.listData = this.filterData = {
            entity: ListConstant.POST,
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
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }
}
