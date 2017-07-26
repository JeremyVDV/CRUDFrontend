import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users',     component: UsersComponent },
  { path: 'detail/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
