import { Component } from '@angular/core'
import {WebService} from './web.service';
import {AuthService} from './auth.service';

@Component({
        selector: 'new-message',
	template:`
		<mat-card class="card">
			  <mat-card-content>
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

       constructor(private webService: WebService, private auth: AuthService) {}

       message = {name:this.auth.name, email:this.auth.email, text: "" }

       post() {
       	      this.webService.postMessage(this.message);
       }
}