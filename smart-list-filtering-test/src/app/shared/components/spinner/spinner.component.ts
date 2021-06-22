import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

  showLoading = false;

  constructor(
    private _loaderService: SpinnerService
  ) {}

  ngOnInit() {
    this._loaderService.loaderStatus$.subscribe((val: boolean) => {
      this.showLoading = val;
    });
  }

}
