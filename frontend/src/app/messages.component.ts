import { Component } from '@angular/core'
import {WebService} from './web.service';

@Component({
	selector: 'messages',
	template:`
	<div *ngFor="let message of webService.messages">
	     <mat-card class="card">
		<mat-card-header>
		<mat-card-title>{{message.owner}}</mat-card-title>
		</mat-card-header>
		<mat-card-content> {{message.text}} </mat-card-content>
	     </mat-card>
	</div>`
})

export class MessagesComponent {
       constructor(public webService: WebService) {}
}