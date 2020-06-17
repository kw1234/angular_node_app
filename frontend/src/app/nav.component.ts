import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthService} from './auth.service';

@Component({
        selector: 'nav',
        template:`
        <mat-toolbar color="primary">
		<button	mat-button routerLink="/">Message Board</button>
		<button mat-button routerLink="/messages">Messages</button>
                <span style="flex: 1 1 auto"></span>
		<button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login">Login</button>
                <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register">Register</button>
		<button *ngIf="auth.isAuthenticated" mat-button routerLink="/user">Welcome {{auth.name}}</button>
                <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logout()">Logout</button>
	</mat-toolbar>
        `
})

export class NavComponent {
       constructor(public auth: AuthService) {}
}