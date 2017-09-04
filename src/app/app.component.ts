import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    serverAlive: boolean = false;

    copyright: string;

    constructor(private router: Router,
                private toastr: ToastsManager,
                private vRef: ViewContainerRef) {
      
        toastr.setRootViewContainerRef(vRef);
        this.copyright = (new Date()).getFullYear().toString();

    }

    ngOnInit(): void {
        console.debug('ready');
    }

}
