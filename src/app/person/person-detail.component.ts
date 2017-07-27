import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { PersonService } from './person.service';
import { Person } from './person';
import {Todo} from '../todo/todo';

@Component({
  selector: 'person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: [ './person-detail.component.css' ],
})

export class PersonDetailComponent implements OnInit {
  @Input() person: Person;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.personService.update(this.person)
      .then(() => this.goBack());
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.personService.getPerson(+params.get('id')))
      .subscribe(person => this.person = person);
  }
}
