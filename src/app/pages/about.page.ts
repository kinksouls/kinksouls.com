import { Component, OnInit } from '@angular/core';
import { HealthService } from '../services/health.service';

@Component({
    selector: 'app-about',
    templateUrl: './templates/about.template.html'
})
export class AboutPage implements OnInit {

    serverHealth : string;

    constructor(private _heath : HealthService) {
    }

    ngOnInit() : void {
        this._heath.serverHealth().then((health) => this.serverHealth = health);
    }
}
