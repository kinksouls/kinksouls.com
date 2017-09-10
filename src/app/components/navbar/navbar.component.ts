import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    isCollapsed :boolean = true;

    inSession :boolean = false;

    constructor(private auth: AuthService) {

        this.inSession = auth.inSession();
    }

    logout() {
        this.auth.logout();
    }
}