import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {imgUrl} from './weixin.api'
import { WinxinService } from './weixin.service';
import {QRLogin} from './QRLogin.class';
import { Account } from './account.class';
import { Member } from './member.class';


let login:QRLogin;

@Component({
    selector: 'wx-login-box',
    templateUrl: `${__dirname}/../template/weixinLogin.html`,
    styleUrls: ['./template/css/weixinLogin.css'],
    providers: [WinxinService]
})
export class WeixinLoginComponent implements OnInit {

    isScan:boolean = false;
    loginimg:string;
    msg1n = 0;
    curuser:Account;
    userAvatar:string;
    redirecturi:string;
    scanInfo:string = '扫描二维码登录微信';
    baseRequest:string;

    @Input() accounts:Account[];
    @Output() onCloseLoginBox = new EventEmitter<boolean>();

    constructor(
        private weixinService: WinxinService
    ){
       
    }

    ngOnInit() {
        this.weixinService.getLoginUuid()
                          .then(res => {
                              login = new QRLogin(res.text());  
                              this.loginimg = imgUrl + '/' + login.uuid; 
                              // this.curuser = new Account(); 
                             // this.susers.push(this.curuser);
                              this.curuser = this.accounts[this.accounts.length -1];
                              console.log(this.accounts);
                                console.log(this.curuser);
                              this.wait4LoginMsg();  

        
                          });
    }

    wait4LoginMsg(){
        this.weixinService
            .getLogMsg(login.uuid)
            .then(res => {
                //if(this.msg1n > 10) return;
                let s = res.text();
                let reg = /([^;]*);?([\w\W]*);$/g;
                let arr = reg.exec(s);
                arr.shift();
                console.log(arr);

                arr.map(v => {
                    if(v.includes('window.code')){
                        let a = v.split('=');
                        this.curuser.code = Number(a[1]);
                    } else if (v.includes('window.userAvatar')) {
                        let i = v.indexOf('=');
                        let s = v.substr(i+1);
                        this.curuser.userAvatar = s.trim().replace(/'/g,'');                    
                    } else if (v.includes('window.redirect_uri')) {
                        let i = v.indexOf('=');
                        let s = v.substr(i+1);
                        this.redirecturi = s.trim().replace(/"/g,'');                    
                    }
                })
                if (this.curuser.code === 408){
                    this.msg1n++;
                    this.wait4LoginMsg();                
                } else if(this.curuser.code === 201) {
                    this.scanInfo = '扫描成功等待确认';
                    this.isScan = true;
                    this.userAvatar = this.curuser.userAvatar;
                    this.msg1n++;
                    this.wait4LoginMsg();
                } else if(this.curuser.code === 200) {
                    this.loginInfo(this.redirecturi);
                    this.onCloseLoginBox.emit(false);
                }

            });
    }

    loginInfo(url:string){
        if(url){
            this.weixinService
                .getLoginInfo(url)
                .then(res => {
                    let s = res.text()
                    let  parser = new DOMParser();
                    let doc = parser.parseFromString(s,'application/xml');
                    this.curuser.skey = String(doc.getElementsByTagName("skey")[0].innerHTML);
                    this.curuser.wxsid = String(doc.getElementsByTagName("wxsid")[0].innerHTML);
                    this.curuser.wxuin = String(doc.getElementsByTagName("wxuin")[0].innerHTML);
                    this.curuser.pass_ticket = String(doc.getElementsByTagName("pass_ticket")[0].innerHTML);  
                    let t = new Date();
                    this.curuser.deviceid = 'e'+t.getTime();
                    this.baseRequest = `{"BaseRequest":{"Uid":"${this.curuser.wxuin}","Sid":"${this.curuser.wxsid}","Skey":"${this.curuser.skey}","DeviceID":"${this.curuser.deviceid}"}}`;
                    this.weixinAvatar();
                })
        }
    }

    weixinAvatar(){
        this.weixinService
            .getWeixinAvatar(this.curuser.pass_ticket,this.baseRequest)
            .then(res => {
                this.curuser.nickname = res.User.NickName;
                this.curuser.username = res.User.UserName;
                this.wxstatusnotify();
            })       
    }

    wxstatusnotify(){
        let t = new Date();
        let s = `{"BaseRequest":{"Uid":"${this.curuser.wxuin}","Sid":"${this.curuser.wxsid}","Skey":"${this.curuser.skey}","DeviceID":"${this.curuser.deviceid}"},"Code":"3","FromUserName":"${this.curuser.username}","ToUserName":"${this.curuser.username}","ClientMsgId":${t.getTime()}}`;

        this.weixinService
            .getStatusnotify(this.curuser.pass_ticket,s)
            .then(res => {
                console.log(res);
                this.listContent()
            }) 
    }

    listContent(){
        this.weixinService
                .getContactList(this.curuser.pass_ticket,this.curuser.skey)
                .then(res => {
                    let s = res.MemberList;
                    this.curuser.memberList = new Array<Member>();
                    for (let i = 0; i < s.length; i++) {
                        let m = new Member();
                        m.Uin = s[i].Uin;
                        m.Alias = s[i].Alias;
                        m.AppAccountFlag = s[i].AppAccountFlag;
                        m.AttrStatus = s[i].AttrStatus;
                        m.ChatRoomId = s[i].ChatRoomId;
                        m.City = s[i].City;
                        m.ContactFlag = s[i].ContactFlag
                        m.DisplayName = s[i].DisplayName;
                        m.EncryChatRoomId = s[i].EncryChatRoomId;
                        m.HeadImgUrl = 'https://wx.qq.com'+s[i].HeadImgUrl;
                        m.HideInputBarFlag = s[i].HideInputBarFlag;
                        m.KeyWord = s[i].KeyWord;
                        m.NickName = s[i].NickName;
                        m.OwnerUin = s[i].OwnerUin;
                        m.Province = s[i].Province;
                        m.PYInitial = s[i].PYInitial;
                        m.PYQuanPin = s[i].PYQuanPin;
                        m.RemarkName = s[i].RemarkName;
                        m.RemarkPYInitial = s[i].RemarkPYInitial;
                        m.Sex = s[i].Sex;
                        m.Signature = s[i].Signature;
                        m.SnsFlag = s[i].SnsFlag;
                        m.StarFriend = s[i].StarFriend;
                        m.Statues = s[i].Statues;
                        m.UniFriend = s[i].UniFriend;
                        m.UserName = s[i].UserName;
                        m.VerifyFlag = s[i].VerifyFlag;
                        this.curuser.memberList.push(m);
                    }
                })

    }
}

