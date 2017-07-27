import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: [ './todo-detail.component.css' ]
})

export class TodoDetailComponent implements OnInit {
  @Input() todo: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.todoService.update(this.todo)
      .then(() => this.goBack());
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.todoService.getTodo(+params.get('id')))
      .subscribe(todo => this.todo = todo);
  }
}
