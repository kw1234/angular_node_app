import { Http } from '@angular/http';
'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from './auth.service';

@Injectable()
export class WebService {
       BASE_URL = 'http://localhost:63145/api';

       private messageStore = [];

       private messageSubject = new Subject();

       messages = this.messageSubject.asObservable();
       
       constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) {
       }

       getMessages(user) {
           user = (user) ? '/' + user:'';
	   this.http.get(this.BASE_URL+'/messages'+user).subscribe(response => {
               this.messageStore = response.json();
	       this.messageSubject.next(this.messageStore);
	   }, error => {
               this.handleError(`unable to get messages with error: ${error}`);
	   });
       }      

       async postMessage(message) {
       	     try {
	     	 var response = await this.http.post(this.BASE_URL+'/messages', message).toPromise();
           	 this.messageStore.push(response.json());
		 console.log(response.json());
		 this.messageSubject.next(this.messageStore);
	     } catch(error) {
	       this.handleError(`unable to post message with error: ${error}`);
	     }
       }      

       getUser() {
	   return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).pipe(map(res => res.json()));
       }

       saveUser(userData) {
	  this.auth.setName(userData.firstName);
          return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader).pipe(map(res => res.json()));
       }

       private handleError(error) {
       	       console.error(error);
       	       this.sb.open(error, 'close', {duration: 2000});
       }
}
