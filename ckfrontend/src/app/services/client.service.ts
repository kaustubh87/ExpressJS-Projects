import { Injectable } from '@angular/core';

import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable
export class ClientServie{
    constuctor(private http: Http){
        
    }
    
    getClients(){
        returnthis.http.get('http://localhost:3000/api/clients')
            .map(res => res.json());
    }
}