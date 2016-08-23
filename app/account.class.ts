import { Member } from './member.class';

/**
 * Account
 */
export class Account {
    public uuid:string;
    public code:number;
    public userAvatar:string;
    public skey:string; //微信的skey值
    public wxsid:string; //微信的SID值
    public wxuin:string; //微信的UID值
    public pass_ticket:string; //微信的ticket值
    public nickname:string;
    public username:string;
    public deviceid:string;
    public memberList:Member[];

    constructor(
       
    ) { }
}