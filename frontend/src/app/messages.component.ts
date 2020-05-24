import { Component } from '@angular/core'

@Component({
	selector: 'messages',
	template:` 
	this is the messages component
	<div *ngFor="let message of messages">
	     <mat-card style="margin:8px">
		<mat-card-header>
		<mat-card-title>{{message.text}}</mat-card-title>
		</mat-card-header>
		<mat-card-content>
                by {{message.owner}}
		   </mat-card-content>
	     </mat-card>
	</div>`
})

export class MessagesComponent {

       messages = [{text:'lala', owner: 'Mola'}, {text: 'bosa', owner: 'meeshu'}];
}