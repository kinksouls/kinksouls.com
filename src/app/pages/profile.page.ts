import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

import * as model from '../models/_all.models';

@Component({
    selector: 'app-profile',
    templateUrl: './templates/profile.template.html'
})
export class ProfilePage {

    private account :model.Account;

    constructor(private auth :AuthService,
                private users :UsersService
                ) {
        
        console.log('Token to use : '+auth.getToken());
        
        this.account = users.getUser('test');
    }

    
}