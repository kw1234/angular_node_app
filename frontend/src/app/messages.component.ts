import { Component } from '@angular/core'
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'messages',
	template:`
	<div *ngFor="let message of webService.messages | async">
	     <mat-card class="card">
		<mat-card-header>
		<mat-card-title [routerLink]="['/messages', message.name]" style="cursor: pointer">{{message.name}}</mat-card-title>
		</mat-card-header>
		<mat-card-content> {{message.text}} </mat-card-content>
	     </mat-card>
	</div>`
})

export class MessagesComponent {
       constructor(public webService: WebService, private route: ActivatedRoute) {}

       ngOnInit() {
       		  var name = this.route.snapshot.params.name;
		  this.webService.getMessages(name);
		  this.webService.getUser().subscribe();
       }
}