import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import * as model from '../models/_all.models';

import 'rxjs/add/operator/filter';

@Injectable()
export class AuthService {

    public currentAccount :model.Account;

    public testAccount : model.Account = {
        email : 'test@domain.com',
        username : 'testUser',
        password : Md5.hashStr('test').toString(),
        details : {
            gender: 'Male, I think',
            orientation: 'Straight Forward',
            role: 'Dominate Test User',
            age: new Date('July 5, 1993, 00:00:00'),
            lookingFor: 'something special',
            about: 'Hi am a test user, I can put whatever I want here...',
        },
        accessToken : 'test',
        expiresIn : 999999
    };

    constructor(private router: Router) {}
    
    public encrypt(password: string) :string {

        return Md5.hashStr(password).toString();
    }

    public isExpired(): boolean {
        
        const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
        return new Date().getTime() > expiresAt;
    }

    public inSession(): boolean {
        
        if(localStorage.getItem('currentToken') !== '' ||
           localStorage.getItem('currentToken') !== null ) {
            
            if(this.isExpired() === false) {
                return true;
            }
        }

        //usually false
        return false;
    }

    public getToken() :string {
        
        if(this.inSession() === true) {
            return localStorage.getItem('currentToken');
        }

        return '';
    }

    public getAccountProfile(token :string) {
        if(token === 'test') {
            this.currentAccount = this.testAccount;
        }
    }
    
    public login(username :string, password :string): void {

        password = this.encrypt(password);

        if(username === 'testUser') {
            password = this.encrypt('test');
            this.setSession('test', 99999);
            this.router.navigate(['/profile']);
        }
    }

    public setSession(accessToken :string, expiresIn :number): void {
        
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        
        localStorage.setItem('currentToken', accessToken);
        localStorage.setItem('expiresAt', expiresAt);
    }

    public logout(): void {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresAt');
        this.router.navigate(['/']);
    }

}