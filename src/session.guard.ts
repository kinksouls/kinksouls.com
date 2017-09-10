import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './app/services/auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
    
    constructor(private router: Router,
                private auth: AuthService) {}
    
    canActivate() { console.log( 'Active Session: ' + this.auth.inSession() );

        if( this.auth.inSession() === true ) {
            return true;
        }

        this.auth.logout();
        this.router.navigate(['/login']);
        return false;
    }
}