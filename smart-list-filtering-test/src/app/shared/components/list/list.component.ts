import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { ListData } from './list.model';

import { SpinnerService } from './../../services/spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AppPostService } from 'src/app/post/post.service';
import { SharedService } from '../../services/shared.service';

import { DetailsComponent } from './../details/details.component';
import { Comment } from './../../constants/forms';
import * as ListConstants from './../../constants/lists';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/post/post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data: ListData;
  @Input() filterData: ListData;
  @ViewChild('ngxDatatable') ngxDatatable: DatatableComponent;

  public reorderable: boolean = true;
  public faPencilAlt = faPencilAlt;
  public faTrashAlt = faTrashAlt;
  public listConstants = ListConstants;
  public selectedLimit = 10;
  public userIds: any = [];
  public gFilter = '';

  constructor(
    private spinner: SpinnerService,
    private postService: AppPostService,
    private shared: SharedService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userIds = [...new Set(this.data.rows.map(item => item.userId))];
  }

  ngOnChanges(): void {
    this.data = {...this.data};
  }

  delete(entity: string, id: number) {
    this.spinner.show(true);
    switch (entity) {
      case ListConstants.POST:
        this.postService.delete(id).subscribe(
          () => {
            this.toastr.success('Post ' + id + ' deleted successfully!', 'Success!');
            this.shared.emitPostReload.emit();
            this.spinner.show(false);
          },
          (error: HttpErrorResponse) => {
            this.shared.handleError(error);
          }
        );
        break;

      default:
        this.spinner.show(false);
        return;
    }
  }

  getDetails(entity: string, id: number) {
    this.spinner.show(true);
    switch (entity) {
      case ListConstants.POST:
        this.postService.get(id).subscribe(
          (post: Post) => {
            this.postService.getComments(id).subscribe(
              (comments: Comment) => {
                this.open(ListConstants.POST, post, comments);
              },
              (error: HttpErrorResponse) => {
                this.open(ListConstants.POST, post);
                this.shared.handleError(error);
              }
            )
          },
          (error: HttpErrorResponse) => {
            this.shared.handleError(error);
          }
        );
        break;
    }
  }

  open(entity: string, modalData?: Post, comments?: Comment) {
    const modal = this.modalService.open(DetailsComponent);
    modal.componentInstance.modalData = modalData;
    modal.componentInstance.entity    = entity;
    modal.componentInstance.comments  = comments;
    this.spinner.show(false);
    return modal;
  }

  onLimitChange(event: any) {
    this.ngxDatatable.offset = 0;
  }

  filterListByUserId(userId: number) {
    if (userId) {
      this.filterData.rows = this.data.rows.filter(item => item.userId == userId);
    } else {
      this.filterData.rows = this.data.rows;
    }
  }

}
