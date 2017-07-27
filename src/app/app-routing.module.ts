import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonsComponent } from './person/persons.component';
import { PersonDetailComponent } from './person/person-detail.component';
import { TodosComponent } from './todo/todos.component';
import { TodoDetailComponent } from './todo/todo-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  { path: 'persons',     component: PersonsComponent },
  { path: 'person/:id', component: PersonDetailComponent },
  { path: 'todos',     component: TodosComponent },
  { path: 'todo/:id', component: TodoDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
