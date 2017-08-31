import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GridOptions } from 'ag-grid/main';

import { Observable } from 'rxjs';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
    selector: 'app-home',
    templateUrl: '../templates/home.template.html'
})
export class HomePage {
	
		public statusMessage: String;

		public rowData: any[];

    public interval: number = 2500;
    public timerInterval: any;

    private gridOptions: GridOptions;
    private columnDefs: any[]; 

    constructor(private router: Router) {

        this.statusMessage = '';

        this.setGridOptions();
        this.setColumnDefs();
        
        this.rowData = [];
    }

    // ====== AG - GRID SET UP ======

    private setGridOptions() {

        const noDataTemplate= `<div><img class="empty-image" src="data:image/svg+xml;charset=utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTA1LjQwMyw0MDYuMzk0TDI5NS4zODksNTguMTAyYy04LjI3NC0xMy43MjEtMjMuMzY3LTIyLjI0NS0zOS4zOS0yMi4yNDVjLTE2LjAyMywwLTMxLjExNiw4LjUyNC0zOS4zOTEsMjIuMjQ2ICAgIEw2LjU5NSw0MDYuMzk0Yy04LjU1MSwxNC4xODItOC44MDQsMzEuOTUtMC42NjEsNDYuMzdjOC4xNDUsMTQuNDIsMjMuNDkxLDIzLjM3OCw0MC4wNTEsMjMuMzc4aDQyMC4wMjggICAgYzE2LjU2LDAsMzEuOTA3LTguOTU4LDQwLjA1Mi0yMy4zNzlDNTE0LjIwOCw0MzguMzQyLDUxMy45NTUsNDIwLjU3NCw1MDUuNDAzLDQwNi4zOTR6IE00NzcuMDM5LDQzNi4zNzIgICAgYy0yLjI0MiwzLjk2OS02LjQ2Nyw2LjQzNi0xMS4wMjYsNi40MzZINDUuOTg1Yy00LjU1OSwwLTguNzg0LTIuNDY2LTExLjAyNS02LjQzNWMtMi4yNDItMy45Ny0yLjE3Mi04Ljg2MiwwLjE4MS0xMi43NjUgICAgTDI0NS4xNTYsNzUuMzE2YzIuMjc4LTMuNzc3LDYuNDMzLTYuMTI0LDEwLjg0NC02LjEyNGM0LjQxLDAsOC41NjUsMi4zNDcsMTAuODQzLDYuMTI0bDIxMC4wMTMsMzQ4LjI5MiAgICBDNDc5LjIxMSw0MjcuNTEyLDQ3OS4yODEsNDMyLjQwMyw0NzcuMDM5LDQzNi4zNzJ6IiBmaWxsPSIjZmY5OTAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LjE1NCwxNzMuMDA1Yy0xMi42OCwwLTIyLjU3Niw2LjgwNC0yMi41NzYsMTguODY2YzAsMzYuODAyLDQuMzI5LDg5LjY4Niw0LjMyOSwxMjYuNDg5ICAgIGMwLjAwMSw5LjU4Nyw4LjM1MiwxMy42MDcsMTguMjQ4LDEzLjYwN2M3LjQyMiwwLDE3LjkzNy00LjAyLDE3LjkzNy0xMy42MDdjMC0zNi44MDIsNC4zMjktODkuNjg2LDQuMzI5LTEyNi40ODkgICAgQzI3OC40MjEsMTc5LjgxLDI2OC4yMTYsMTczLjAwNSwyNTYuMTU0LDE3My4wMDV6IiBmaWxsPSIjZmY5OTAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LjQ2NSwzNTMuMzA2Yy0xMy42MDcsMC0yMy44MTQsMTAuODI0LTIzLjgxNCwyMy44MTRjMCwxMi42OCwxMC4yMDYsMjMuODE0LDIzLjgxNCwyMy44MTQgICAgYzEyLjY4LDAsMjMuNTA1LTExLjEzNCwyMy41MDUtMjMuODE0QzI3OS45NywzNjQuMTMsMjY5LjE0NCwzNTMuMzA2LDI1Ni40NjUsMzUzLjMwNnoiIGZpbGw9IiNmZjk5MDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /> 
        <div class="empty-text">No Data available</div>`;

        const onGridReady = function(event:any) {
            if (this.rowData.length === 0) {
                event.api.showNoRowsOverlay();
            }
        };

        this.gridOptions = <GridOptions>{
            rowHeight: 33,
            rowSelection: 'multiple',
            pagination: false,
            paginationPageSize: 10,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            overlayNoRowsTemplate: noDataTemplate,
            onGridReady: onGridReady
        };
    }

    private setColumnDefs() {

        this.columnDefs = [
            {   headerName: 'Order ID', 
                field: 'orderID',
                filter: 'text',
                filterParams: { clearButton:true }
            },
            {   headerName: 'Market', 
                field: 'market',
                filter: 'text',
                filterParams: { clearButton:true }
            },
            {   headerName: 'Instrument', 
                field: 'instrument',
                filter: 'number',
                filterParams: { clearButton:true }
            },
            {   headerName: 'Side', 
                field: 'side',
                filter: 'text',
                filterParams: { clearButton:true }
            },
            {   headerName: 'Quantity', 
                field: 'quantity',
                filter: 'number',
                filterParams: { clearButton:true }
            },
            {   headerName: 'Price', 
                field: 'price',
                filter: 'number',
                filterParams: { clearButton:true }
            }
        ];
    }
}
