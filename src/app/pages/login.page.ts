import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../models/headers';


@Component({
    selector: 'app-login',
    templateUrl: './templates/login.template.html'
})
export class LoginPage {
    
    constructor(public router: Router, public http: Http) {
    }
  
    login(event, username, password) {
      event.preventDefault();
      let body = JSON.stringify({ username, password });
      this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
        .subscribe(
          response => {
            localStorage.setItem('id_token', response.json().id_token);
            this.router.navigate(['home']);
          },
          error => {
            alert(error.text());
            console.log(error.text());
          }
        );
    }
  
    signup(event) {
      event.preventDefault();
      this.router.navigate(['signup']);
    }
}