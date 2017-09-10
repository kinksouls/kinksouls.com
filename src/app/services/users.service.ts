import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { api } from '../../api.config';

// for test
import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../services/auth.service';

import * as model from '../models/_all.models';

@Injectable()
export class UsersService {
    
    public user : model.Account;

    private url: string = api.home+'/'+api.version;

    constructor( private auth :AuthService, private http :Http) {

        console.log('api version: '+api.version);
    }

    public getUser(username :string) :model.Account {
        
        if(username === 'testUser') {

            this.user = this.auth.testAccount;

            return this.user;
        }

        return null;
    }
}