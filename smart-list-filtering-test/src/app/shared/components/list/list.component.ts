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

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/post/post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data: ListData;
  @ViewChild('ngxDatatable') ngxDatatable: DatatableComponent;

  public reorderable: boolean = true;

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  constructor(
    private spinner: SpinnerService,
    private postService: AppPostService,
    private shared: SharedService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.data = {...this.data};
  }

  delete(entity: string, id: number) {
    this.spinner.show(true);
    switch (entity) {
      case 'post':
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
      case 'post':
        this.postService.get(id).subscribe(
          (post: Post) => {
            this.postService.getComments(id).subscribe(
              (comments: Comment) => {
                this.open('post', post, comments);
              },
              (error: HttpErrorResponse) => {
                this.open('post', post);
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

}
