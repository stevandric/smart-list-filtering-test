import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [CommonModule, PostRoutingModule, RouterModule, SharedModule]
})
export class PostModule {}
