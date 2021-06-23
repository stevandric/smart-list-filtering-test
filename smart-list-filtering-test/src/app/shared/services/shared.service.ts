import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public emitPostReload: EventEmitter<any> = new EventEmitter();

  constructor(private spinner: SpinnerService, private toastr: ToastrService) {}

  public handleError(error?: HttpErrorResponse) {
    const message =
      error && error.error && error.error.message
        ? error.error.message
        : 'Something went wrong. Please try again.';
    this.toastr.error(message, 'Error:');
    this.spinner.show(false);
  }
}
