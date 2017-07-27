import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person/person-detail.component';
import { PersonsComponent } from './person/persons.component';
import { PersonService } from './person/person.service';
import { TodoDetailComponent } from './todo/todo-detail.component';
import { TodosComponent } from './todo/todos.component';
import { TodoService } from './todo/todo.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PersonDetailComponent,
    PersonsComponent,
    TodoDetailComponent,
    TodosComponent
  ],
  providers: [
    PersonService,
    TodoService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
