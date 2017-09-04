// Agular Core Dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AUTH_PROVIDERS } from 'angular2-jwt';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// App Component
import { AppComponent } from './app/app.component';
import { routing, appRoutingProviders } from './app.routing';
import { SessionGuard } from './session.guard';

// Pages
import * as page from './app/pages/_all.pages';

// Global Components 
import * as component from './app/components/_all.components';

// Services
import * as service from './app/services/_all.services';

import './rxjs-extensions';

// ag-grid
import { AgGridModule } from 'ag-grid-angular/main';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      ReactiveFormsModule,
      routing,
      BrowserAnimationsModule,
      ToastModule.forRoot(),
      NgbModule.forRoot(),
      AgGridModule.withComponents([])
    ],
    declarations: [
      AppComponent,
      component.NavbarComponent,
      page.HomePage,
      page.AboutPage,
      page.LoginPage,
      page.SignupPage
    ],
    providers: [
      appRoutingProviders,
      SessionGuard, AUTH_PROVIDERS,
      service.AuthService,
      service.HealthService
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
