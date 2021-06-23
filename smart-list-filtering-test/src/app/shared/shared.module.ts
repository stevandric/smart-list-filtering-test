import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoundUpPipe } from './pipes/round-up.pipe';

import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    SpinnerComponent,
    RoundUpPipe
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    SpinnerComponent,
    NgxDatatableModule,
    RoundUpPipe
  ],
})
export class SharedModule {}
