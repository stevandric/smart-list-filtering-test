import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data: any;

  data = {
    entity,
    source,

  }

  constructor() { }

  ngOnInit(): void {

  }

  openForm(entity: string, id: number) {

  }

  delete() {

  }

}
