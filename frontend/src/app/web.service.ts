import { Http } from '@angular/http';
'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class WebService {
       BASE_URL = 'http://localhost:63145/api';

       messages = [];
       
       constructor(private http: Http, private sb: MatSnackBar) {
           //this.getMessages();
       }

       getMessages(user) {
           user = (user) ? '/' + user:'';
	   this.http.get(this.BASE_URL+'/messages'+user).subscribe(response => {
               this.messages = response.json();
	   }, error => {
               this.handleError(`unable to get messages with error: ${error}`);
	   });
       }      

       async postMessage(message) {
       	     try {
	     	 var response = await this.http.post(this.BASE_URL+'/messages', message).toPromise();
           	 this.messages.push(response.json());
	     } catch(error) {
	       this.handleError(`unable to post message with error: ${error}`);
	     }
       }      

       private handleError(error) {
       	       console.error(error);
       	       this.sb.open(error, 'close', {duration: 2000});
       }
}
