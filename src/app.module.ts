// Agular Core Dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// App Component
import { AppComponent } from './app/app.component';
import { routing, appRoutingProviders } from './app.routing';

// Pages
//import { HomePage } from './app/components/home.page';
//import { AboutPage } from './app/components/about.page';
import * as components from './app/components';

// Global Components 
import { NavbarComponent } from './app/shared/navbar/navbar.component';

// Services
import { HealthService } from './app/services/health.service';

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
      NavbarComponent,
      components.HomePage,
      components.AboutPage
    ],
    providers: [
      appRoutingProviders,
      HealthService
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
