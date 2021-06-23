import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  public loaderStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  show(value: boolean) {
    this.loaderStatus$.next(value);
  }
}
