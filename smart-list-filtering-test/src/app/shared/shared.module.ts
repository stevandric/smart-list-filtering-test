import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoundUpPipe } from './pipes/round-up.pipe';
import { GlobalFilterPipe } from './pipes/global-filter.pipe';

import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalHeaderComponent } from './components/details/modal-header/modal-header.component';
import { CommentsComponent } from './components/details/comments/comments.component';
import { ModalFooterComponent } from './components/details/modal-footer/modal-footer.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    SpinnerComponent,
    RoundUpPipe,
    GlobalFilterPipe,
    ModalHeaderComponent,
    CommentsComponent,
    ModalFooterComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    SpinnerComponent,
    NgxDatatableModule,
    RoundUpPipe,
    GlobalFilterPipe,
    NgSelectModule
  ],
})
export class SharedModule {}
