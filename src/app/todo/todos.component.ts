import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from './todo';
import { TodoService } from './todo.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'my-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  selectedTodo: Todo;

  constructor(private todoService: TodoService,
              private router: Router) {
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  gotoDetail(todo: Todo): void {
    this.router.navigate(['/todo', todo.id]);
  }

  add(form: NgForm): void {
    const shortdesc = form.value.shortdesc.trim();
    const longdesc = form.value.longdesc.trim();
    if (!shortdesc || !longdesc) { return; }
    this.todoService.create(shortdesc, longdesc)
      .then(todo => {
        this.todos.push(todo);
        this.selectedTodo = null;
      });
  }

  delete(todo: Todo): void {
    this.todoService
      .delete(todo.id)
      .then(() => {
        this.todos = this.todos.filter(h => h !== todo);
        if (this.selectedTodo === todo) { this.selectedTodo = null; }
      });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }
}
