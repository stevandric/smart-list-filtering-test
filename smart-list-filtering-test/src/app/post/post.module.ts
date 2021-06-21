import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailsComponent
  ],
  imports: [PostRoutingModule, RouterModule, SharedModule]
})
export class PostModule {}
