import { Http } from '@angular/http';
'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';

@Injectable()
export class WebService {
       BASE_URL = 'http://localhost:63145/api';
       
       constructor(private http: Http) {}

       getMessages() {
           return this.http.get(this.BASE_URL+'/messages').toPromise();
       }      

       postMessage(message) {
           return this.http.post(this.BASE_URL+'/messages', message).toPromise();
       }      

}
