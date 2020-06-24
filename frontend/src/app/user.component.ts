import { Component } from '@angular/core'
import {WebService} from './web.service';
import {AuthService} from './auth.service';

@Component({
        selector: 'user',
        template:`
                <mat-card class="card">
                          <mat-card-content>
                                <mat-form-field>
                                        <input matInput [(ngModel)] ="model.firstName" placeholder="First Name">
                                </mat-form-field>
                                <mat-form-field>
                                        <input matInput [(ngModel)] ="model.lastName" placeholder="Last Name">
                                </mat-form-field>
                                <mat-card-actions>
                                        <button mat-raised-button (click)="post()" color="primary">Save Changes</button>
                                </mat-card-actions>
                          </mat-card-content>
                </mat-card>
        `
})

export class UserComponent {

       constructor(private webService: WebService, private auth: AuthService) {}

       model = {firstName: "", lastName: "", email:""}

       ngOnInit() {
           this.webService.getUser().subscribe(res => {
	       this.model.firstName = res.firstName;
	       this.model.lastName = res.lastName;
	       this.model.email = this.auth.email;
	   });
       }

       post() {
              this.webService.saveUser(this.model).subscribe();
       }
}