import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
        selector: 'nav',
        template:`
        <mat-toolbar color="primary">
		<button	mat-button routerLink="/">Message Board</button>
		<button mat-button routerLink="/messages">Messages</button>
	</mat-toolbar>
        `
})

export class NavComponent {
       constructor() {}
}