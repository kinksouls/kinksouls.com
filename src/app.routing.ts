import { Routes, RouterModule } from '@angular/router';
import { SessionGuard } from './session.guard';
import * as page from './app/pages/_all.pages';

const routes: Routes = [
    { path: '',       component: page.LoginPage  },
    { path: 'login',  component: page.LoginPage  },
    { path: 'signup', component: page.SignupPage },
    { path: 'home',   component: page.HomePage, canActivate:[SessionGuard] },
    { path: 'about',  component: page.AboutPage  },
    { path: '**',     component: page.SignupPage }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});

