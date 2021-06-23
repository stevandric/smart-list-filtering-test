import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/constants/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment;
  constructor() { }

  ngOnInit(): void {
  }

}
