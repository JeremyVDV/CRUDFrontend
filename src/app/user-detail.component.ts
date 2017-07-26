import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})

export class UserDetailComponent implements OnInit {
  @Input() user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.update(this.user)
      .then(() => this.goBack());
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
      .subscribe(user => this.user = user);
  }
}
