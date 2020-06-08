import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:63145/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    // added a router to the constructor to do a redirect once someone is authenticated
    constructor(private http: Http, private router: Router) {}

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    login(loginData) {

    }

    register(user) {
        // dont want to send the confirmPassword to the backend since it is only necess to handle it on frontend
        delete user.confirmPassword;
        this.http.post(this.BASE_URL+'/register', user).subscribe(res => {
            // adding authentication code to redirect the route to home page if authentication is successful
	    var authResponse = res.json();

            if(!authResponse.token) return;

            localStorage.setItem(this.TOKEN_KEY, authResponse.token);
	    localStorage.setItem(this.NAME_KEY, authResponse.firstName);
            // navigating to the home page given authentication is successful
	    this.router.navigate(['/']);
        });
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.NAME_KEY);
    }
}