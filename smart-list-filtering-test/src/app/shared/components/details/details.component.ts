import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/post/post.model';
import { AppPostService } from 'src/app/post/post.service';
import { SharedService } from '../../services/shared.service';
import { SpinnerService } from '../../services/spinner.service';
import { FormData, PostForm, Comment } from './../../constants/forms';
import * as ListConstant from './../../../shared/constants/lists';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() modalData: Post;
  @Input() comments: Comment; // todo
  @Input() entity: string;

  public modalTitle: string = '';
  public detailsForm: FormGroup;
  public hasComments: boolean = false;
  public formData: FormData[];

  constructor(
    private activeModal: NgbActiveModal,
    private postService: AppPostService,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.modalTitle = this.modalData ? ('Edit ' + this.entity) : ('New ' + this.entity);
    if (this.modalData) {
      this.setForm();
    } else {
      // This should be used from login response.
      const userId = 1;
      this.detailsForm.controls.userId.setValue(userId);
    }
  }

  createForm() {
    let group = {};
    switch (this.entity) {
      case ListConstant.POST:
        this.formData = PostForm;
        this.hasComments = true;
        PostForm.forEach((item: FormData) => {
          group[item.prop] = item.required ? new FormControl('', Validators.required) : new FormControl('');
        })
        this.detailsForm = new FormGroup(group);
    }
  }

  setForm() {
    PostForm.forEach((item: FormData) => {
      this.detailsForm.controls[item.prop].setValue(this.modalData[item.prop]);
    })
  }

  close() {
    this.activeModal.close();
  }

  save() {
    if (!this.detailsForm.valid) {
      this.toastr.warning(`Form is not valid, please check required fields.`, 'Success');
      return;
    }

    const saveData = this.detailsForm.getRawValue();
    this.spinner.show(true);

    if (this.modalData) {
      switch (this.entity) {
        case ListConstant.POST:
          this.postService.update(saveData, this.modalData.id).subscribe(
            () => {
              this.toastr.success(`Post ${this.modalData.id} successfully updated.`, 'Success');
              this.spinner.show(false);
              this.activeModal.close();
            },
            (error: HttpErrorResponse) => {
              this.shared.handleError(error);
            }
          )
      }
    } else {
      switch (this.entity) {
        case ListConstant.POST:
          const saveData = this.detailsForm.getRawValue();
          this.postService.create(saveData).subscribe(
            () => {
              this.toastr.success(`Post successfully created.`, 'Success');
              this.spinner.show(false);
              this.activeModal.close();
            },
            (error: HttpErrorResponse) => {
              this.shared.handleError(error);
            }
          )
      }
    }
  }
}
