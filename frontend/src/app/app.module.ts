import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {WebService} from './web.service';
import {HttpModule} from '@angular/http';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewMessageComponent } from './new-message.component';
import { MessagesComponent } from './messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavComponent} from './nav.component';
import {HomeComponent} from './home.component';
import {RegisterComponent} from './register.component';
import {AuthService} from './auth.service';
import {LoginComponent} from './login.component';
import {UserComponent} from './user.component';

var routes = [
{
    path: '',
    component: HomeComponent
},
{
    path: 'messages',
    component: MessagesComponent
},
{
    path: 'messages/:name',
    component: MessagesComponent
},
{
    path: 'register',
    component: RegisterComponent
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'user',
    component: UserComponent
},];

@NgModule({
  declarations: [
    AppComponent, MessagesComponent, NewMessageComponent, NavComponent, HomeComponent, RegisterComponent, LoginComponent, UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
