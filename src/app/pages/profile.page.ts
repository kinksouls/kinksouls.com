import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

import * as model from '../models/_all.models';

@Component({
    selector: 'app-profile',
    templateUrl: './templates/profile.template.html'
})
export class ProfilePage implements OnInit {

    private account :model.Account;

    constructor(private auth :AuthService,
                private users :UsersService
                ) {
        
        console.log('Token to use : '+auth.getToken());
    }

    ngOnInit( ) {
        
        this.auth.getAccountProfile(this.auth.getToken());

        setTimeout(() => {
            
            this.account = this.auth.currentAccount;

            console.log('Username: '+ this.account.username);
        }, 200);
    }
    
}