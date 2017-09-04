import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './app/services/auth.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class SessionGuard implements CanActivate {
    
    constructor(private router: Router,
                private authService: AuthService) {}
    
    canActivate() {

        if(tokenNotExpired()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}