import { Routes, RouterModule } from '@angular/router';
import { SessionGuard } from './session.guard';
import * as page from './app/pages/_all.pages';

const routes: Routes = [
    { path: '',        component: page.LoginPage  },
    { path: 'login',   component: page.LoginPage  },
    { path: 'signup',  component: page.SignupPage },
    { path: 'home',    component: page.HomePage   },
    { path: 'about',   component: page.AboutPage  },
    { path: 'legal',   component: page.LegalPage  },
    { path: 'profile', component: page.ProfilePage, canActivate:[SessionGuard]   },
    { path: 'user/:username', component: page.UserPage, canActivate:[SessionGuard]   },
    { path: '**',      redirectTo: ''             }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});

