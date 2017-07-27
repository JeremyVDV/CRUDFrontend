import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from './person';
import { PersonService } from './person.service';
import { Todo } from '../todo/todo';
import { TodoService } from '../todo/todo.service';
import { NgForm } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'my-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  providers: [PersonService, TodoService]
})
export class PersonsComponent implements OnInit {
  persons: Person[];
  selectedPerson: Person;
  selectedTodo: Todo;
  todos: Todo[];

  constructor(private personService: PersonService, private todoService: TodoService,
              private router: Router) {
  }

  getPersons(): void {
    this.personService.getPersons().then(persons => this.persons = persons);
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      todos => {
        this.todos = todos
      }
    );
  }

  gotoDetail(person: Person ): void {
    this.router.navigate(['/person', person.id]);
  }

  removeFromPerson(p: Person, t: Todo): void {
    const index = p.todos.indexOf(t);
    p.todos.splice(index, 1);
    this.personService.update(p)
      .then();
  }

  getUniqueTodos(p: Person): void {
    this.todoService.getTodos()
      .subscribe(
        data => {
          for (let i = 0, len = p.todos.length; i < len; i++) {
            data.filter(function(value, index, array){
              if (p.todos[i].id === value.id) {
                array.splice(index, 1);
              }
            });
          }
          this.todos = data;
      }
    );
    /*
    for (let i = 0, len = p.todos.length; i < len; i++) {
      this.test.filter(function(value, index, array){
        if(this.test[i].id === value.id) {
          array.splice(index, 1);
        }
      });
    }*/
  }
/*
  getUniqueTodos(p: Person): void {
    this.todoService.getTodos().then(function(data){
      console.log(data);
      for(var propertyName in data) {

        console.log(data[propertyName])
        for(var boop in data[propertyName]) {
          console.log(boop);
        }
      }
      /*
       for (let i = 0, len = p.todos.length; i < len; i++) {
       this.todos.filter(function(value, index, array){
       if (p.todos[i].id === value.id) {
       array.splice(index, 1);
       }
       });
       }
    })
  }*/

  add(form: NgForm): void {
    const name = form.value.name.trim();
    if (!name) { return; }
    this.personService.create(name)
      .then(person => {
        this.persons.push(person);
        this.selectedPerson = null;
      });
  }

  delete(person: Person): void {
    this.personService
      .delete(person.id)
      .then(() => {
        this.persons = this.persons.filter(h => h !== person);
        if (this.selectedPerson === person) { this.selectedPerson = null; }
      });
  }

  ngOnInit(): void {
    this.getPersons();
    this.getTodos();
  }

  onSelectPerson(person: Person): void {
    this.selectedPerson = person;
    this.getUniqueTodos(person);
  }

  onSelectTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }
}
