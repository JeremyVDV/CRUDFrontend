import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail.component';
import { UsersComponent } from './users.component';
import { UserSearchComponent } from './user-search.component';
import { UserService } from './user.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    UserDetailComponent,
    UsersComponent,
    UserSearchComponent
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
