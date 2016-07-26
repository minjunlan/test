import { Injectable } from '@angular/core';
import {Http,HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WinxinService {
    private uuidUrl = 'https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb';

    constructor(private http: Http) { }

    getLoginUuid(){
        return this.http.get(this.uuidUrl)
                        .toPromise()
                        .then(response => response)
                        .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}