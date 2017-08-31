import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    serverAlive: boolean = false;

    constructor(private toastr: ToastsManager,
                private vRef: ViewContainerRef) {

      toastr.setRootViewContainerRef(vRef);

    }

    ngOnInit(): void {
        console.debug('ready');
    }

}
