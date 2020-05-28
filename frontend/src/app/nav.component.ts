import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
        selector: 'nav',
        template:`
        <mat-toolbar color="primary">
		Message Board
	</mat-toolbar>
        `
})

export class NavComponent {
       constructor() {}
}