import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent
  ],
  imports: [
    NgxDatatableModule
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    NgxDatatableModule
  ],
})
export class SharedModule {}
