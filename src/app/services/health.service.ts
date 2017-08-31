import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { api } from '../../api.config';

@Injectable()
export class HealthService {

    private url: string = api.home+'/'+api.version+'/test';

    constructor(private http: Http) {

        console.log('api version: '+api.version);
    }

    serverHealth() : Promise<string> {
        return this.http.get(this.url)
                    .map((res :Response) => {
                        //let json = res.json();
                        return res.text();
                    })
                    .toPromise()
                    .catch((err :any) => {
                        console.debug(err);
                        return 'Dead';
                    });
    }
}