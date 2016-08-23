import { Injectable } from '@angular/core';
import {Http,HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/toPromise';

//微信api
import {uuidUrl,rtmsg1,wxinit,contact,notify} from './weixin.api'

@Injectable()
export class WinxinService {

    constructor(private http: Http) { }

    getLoginUuid(){
        return this.http.get(uuidUrl)
                        .toPromise()
                        .then(response => response)
                        .catch(this.handleError);
    }

    getLogMsg(uuid:string){
        let t = new Date();
        return this.http.get(rtmsg1+'&uuid='+uuid+'&tip=0&_='+t.getTime())
                        .toPromise()
                        .then(response => response)
                        .catch(this.handleError);
    }

    getLoginInfo(url:string){
        return this.http.get(url+'&fun=new&version=v2')
                        .toPromise()
                        .then(response => response)
                        .catch(this.handleError);
    }

    getWeixinAvatar(ticket:string,baseRequest:any){
        let json = eval('('+baseRequest+')')
        return this.http.post(wxinit+ticket,JSON.stringify(json))
                        .toPromise()
                        .then(response => response.json())
                        .catch(this.handleError);
    }

    getStatusnotify(ticket:string,baseRequest:any){
        let json = eval('('+baseRequest+')')
        return this.http.post(notify+ticket,JSON.stringify(json))
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getContactList(ticket:string,skey:string){
        let t = new Date();
        return this.http.get(contact+'&pass_ticket='+ticket+'&skey='+skey+'&r='+t.getTime()+'&seq=0')
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

