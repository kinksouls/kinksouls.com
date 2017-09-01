import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { api } from '../../api.config';

@Injectable()
export class HealthService {

    private url: string = this.api.home+'/'+this.api.version+'/test';

    constructor(private http: Http, private api: api) {

        console.log('api version: '+api.version);
        console.log('api secret: '+api.secret);
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