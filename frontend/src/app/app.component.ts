import { Component } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { NewMessageComponent } from './new-message.component';
import {NavComponent} from './nav.component';

@Component({
  selector: 'app-root',
  template: `
	    <nav></nav>
	    <new-message></new-message>
            <messages></messages>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
