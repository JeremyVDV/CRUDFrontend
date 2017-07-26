import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserService {
  private usersUrl = 'http://localhost:8082/person';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'}); // Headers voor het updaten

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    const url = `${this.usersUrl}/list`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.usersUrl}/update/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  create(name: string): Promise<User> {
    const url = `${this.usersUrl}/create`;
    return this.http
      .post(url, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.usersUrl}/delete/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // Aanpassen naar een legitieme error afhandeling
    return Promise.reject(error.message || error);
  }
}
