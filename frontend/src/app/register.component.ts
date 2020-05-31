import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styles: [`
  	  err
  `]
})

export class RegisterComponent {
       form;

       constructor(private fb: FormBuilder) {
           this.form = fb.group({
	       firstName: ['', Validators.required],
	       lastName: ['', Validators.required],
	       email: ['', Validators.required],
	       password: ['', Validators.required],
	       confirmPassword: ['', Validators.required]
	   });
       }

       onSubmit() {
           console.log(this.form.valid);
       }

       isValid(control) {
           return this.form.controls[control].invalid && this.form.controls[control].touched
       }
}