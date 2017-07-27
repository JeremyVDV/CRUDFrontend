import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  private todosUrl = 'http://localhost:8082/todo';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'}); // Headers voor het updaten

  constructor(private http: Http) { }

  getTodos(){
    const url = `${this.todosUrl}/list`;
    /*
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);*/
    return this.http.get(url)
      .map((res: Response) => res.json() as Todo[]);
  }

  getTodo(id: number): Promise<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Todo)
      .catch(this.handleError);
  }

  update(todo: Todo): Promise<Todo> {
    const url = `${this.todosUrl}/update/${todo.id}`;
    return this.http
      .put(url, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(() => todo)
      .catch(this.handleError);
  }

  create(shortdesc: string, longdesc: string): Promise<Todo> {
    const url = `${this.todosUrl}/create`;
    return this.http
      .post(url, JSON.stringify({shortdesc: shortdesc, longdesc: longdesc, done: 0}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Todo)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.todosUrl}/delete/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
