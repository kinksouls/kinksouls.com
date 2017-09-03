import {Routes, RouterModule} from '@angular/router';
import * as pages from './app/pages/_all.pages';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: pages.HomePage},
    {path: 'about', component: pages.AboutPage}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
