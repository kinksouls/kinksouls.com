import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

import * as model from '../models/_all.models';

@Component({
    selector: 'app-profile',
    templateUrl: './templates/user.template.html'
})
export class UserPage implements OnInit {

    private username :string;

    private user :model.Account;

    constructor(private auth :AuthService,
                private users :UsersService,
                private route : ActivatedRoute,
                private router :Router
                ) {
        
        console.log('Token to use : '+auth.getToken());
        //this.user = this.users.getUser(this.username);
        
    }

    ngOnInit() {

        this.username = this.route.snapshot.paramMap.get('username');
        
        console.log('Username :: '+this.username);

        setTimeout(() => {
            this.user = this.users.getUser(this.username);
            console.log('User :: ' + this.user);
        }, 200);
    }
    
}