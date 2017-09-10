import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../models/headers';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './templates/login.template.html'
})
export class LoginPage {
    
    constructor(private auth: AuthService,
                private router: Router, 
                private http: Http) {
        if(auth.inSession()) {
            router.navigate(['/profile']);
        }
    }

    private login(event, username, password) {

        event.preventDefault();

        console.log('un: '+username+'\n pwd: '+this.auth.encrypt(password));

        this.auth.login(username, password);
    }
}