import {Component, OnInit, AfterViewChecked } from '@angular/core';
import {WeixinLoginComponent} from './WeixinLogin.component';
import {MessageComponent} from './message.component';
import { WinxinService } from './weixin.service';
import { Account } from './account.class';
import { Member } from './member.class';
import { Message } from './message.class';

@Component({
    selector: 'my-app',
    templateUrl : `${__dirname}/../template/app.html`,
    styleUrls:['./template/css/app.css'],
    providers: [WinxinService],
    directives: [WeixinLoginComponent,MessageComponent],
    
})
export class AppComponent implements OnInit,AfterViewChecked{

    showLoginBox:boolean ;
    accounts: Account[];
    slectAccount:Account;
    slectMembers:Member[];
    slectMember:Member;
    index=1;
    showemjob=false;
    chatContent: Message[];
    contentLength:number;
    chatHeight:number;

    constructor( 
        private weixinService: WinxinService
    ) {}

    ngOnInit(){
        this.accounts = new Array();
        this.showLoginBox = false;
        this.chatContent = [
            new Message(true,1,false,1471314062,"我就是这么任性",5),
            new Message(false,3,false,1471318062,"cao!",0),
            new Message(true,34,false,0,"cao!",0),
        ];
        this.chatHeight = window.innerHeight;
    }



    ngAfterViewChecked(){
        let chatscroll = document.getElementById('chatscroll');
        if(chatscroll){
            chatscroll.scrollTop = chatscroll.scrollHeight;
        }
    }

    addUser(e:any) {
        this.accounts.push(new Account());
        this.showLoginBox = true;
    }

    closeLoginBox(e:any) {
        this.showLoginBox = false;
        console.log(this.accounts);      
        // console.log(this.showLoginBox);
    }

    onCloseLoginBox(value:boolean){
        this.showLoginBox = value;
    }

    listContent(account:Account){
        this.slectAccount = account;
        this.slectMembers = this.slectAccount.memberList;
    }

    selectOne(member:Member){
        this.slectMember = member;
    }

    selectEmoticon(e:any){
        let edit = document.getElementById("editArea");
        edit.innerHTML = edit.innerHTML + `<img class="qqemoji qqemoji${e.target.className.replace(/[^0-9]/ig,"")}" text="${e.target.title}_web" src="./public/images/spacer.gif">`
    }

    sendMessage(e:any){
        
        let edit = document.getElementById("editArea");

        if(e.ctrlKey && e.keyCode == 13){
           // edit.innerHTML = edit.innerHTML +　'<br/><br/>';
            
            // let len = edit.innerHTML.length;
            let sel  = document.activeElement;
            // sel.insertNode(br);
            console.log(sel)

        } else if(!e.ctrlKey && e.keyCode == 13){
            let str = edit.innerHTML;
            let msg = new Message(true,1,false,0,str,0);
            this.chatContent.push(msg);
            edit.innerHTML = '';

        }
    }
 }