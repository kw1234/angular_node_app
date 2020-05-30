import { Component } from '@angular/core'
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'messages',
	template:`
	<div *ngFor="let message of messages">
	     <mat-card class="card">
		<mat-card-header>
		<mat-card-title [routerLink]="['/messages', message.owner]" style="cursor: pointer">{{message.owner}}</mat-card-title>
		</mat-card-header>
		<mat-card-content> {{message.text}} </mat-card-content>
	     </mat-card>
	</div>`
})

export class MessagesComponent {
       constructor(public webService: WebService, private route: ActivatedRoute) {}

       messages;

       ngOnInit() {
       		  var name = this.route.snapshot.params.name;
		  this.webService.getMessages(name);
		  this.webService.messageSubject.subscribe(messages => {
                      this.messages = messages;
                  });
       }
}