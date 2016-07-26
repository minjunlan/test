import {Component, OnInit} from '@angular/core';
import { WinxinService } from './weixin.service';

/**
 * QRLogin
 */
class QRLogin {
    code:number;
    uuid:string;

    constructor() {}
}

@Component({
    selector: 'my-app',
    templateUrl : `${__dirname}/../template/app.html`,
    providers: [WinxinService]
})
export class AppComponent implements OnInit {

    constructor(
        private weixinService: WinxinService
    ) {}

    ngOnInit() {

    }

    addUser(e:any) {
        this.weixinService.getLoginUuid()
                          .then(res => eval("'"+res.text()+"'"));
        
    }
    addUser2(e:any) {
        console.log(QRLogin)
    }
 }