import {Routes, RouterModule} from '@angular/router';
import {HomePage} from './app/components/home.page';
import {AboutPage} from './app/components/about.page';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePage},
    {path: 'about', component: AboutPage}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
