import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Person } from './person';

@Injectable()
export class PersonService {
  private personsUrl = 'http://localhost:8082/person';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'}); // Headers voor het updaten

  constructor(private http: Http) { }

  getPersons(): Promise<Person[]> {
    const url = `${this.personsUrl}/list`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Person[])
      .catch(this.handleError);
  }

  getPerson(id: number): Promise<Person> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);
  }

  update(person: Person): Promise<Person> {
    const url = `${this.personsUrl}/update/${person.id}`;
    return this.http
      .put(url, JSON.stringify(person), {headers: this.headers})
      .toPromise()
      .then(() => person)
      .catch(this.handleError);
  }

  create(name: string): Promise<Person> {
    const url = `${this.personsUrl}/create`;
    return this.http
      .post(url, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Person)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.personsUrl}/delete/${id}`;
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
