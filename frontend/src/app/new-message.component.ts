import { Component } from '@angular/core'
import {WebService} from './web.service';

@Component({
        selector: 'new-message',
	template:`
		<mat-card class="card">
			  <mat-card-content>
				<mat-form-field>
					<input matInput [(ngModel)] ="message.owner" placeholder="Name">
				</mat-form-field>
				<mat-form-field>
					<textarea matInput [(ngModel)] ="message.text" placeholder="Message"></textarea>
                                </mat-form-field>
				<mat-card-actions>
					<button mat-button (click)="post()" color="primary">POST</button>
				</mat-card-actions>
			  </mat-card-content>
		</mat-card>
	`
})

export class NewMessageComponent {
       constructor(private webService: WebService) {}

       message = {owner: "", text: "" }

       post() {
       	      console.log(this.message);
       }
}