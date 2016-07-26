import {Component, OnInit} from '@angular/core';
import { WinxinService } from './weixin.service';

/**
 * QRLogin
 */
class QRLogin {
    code:number;
    uuid:string;

    constructor(str:string) {
        this.handleStr(str);
    }

    private handleStr(str:string){
        let arr1: string[];
        let arr2: string[];
        arr1 = str.split(";");
        this.code = Number(arr1[0].split("=")[1]);
        this.uuid = arr1[1].split("=")[1]
    }
}

let login:QRLogin;

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
                          .then(res => {
                              login = new QRLogin(res.text());
                          });
        
    }
    addUser2(e:any) {
        console.log(login)
    }
 }