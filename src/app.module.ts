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
import * as pages from './app/pages/_all.pages';

// Global Components 
import * as components from './app/components/_all.components';

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
      components.NavbarComponent,
      pages.HomePage,
      pages.AboutPage
    ],
    providers: [
      appRoutingProviders,
      HealthService
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
