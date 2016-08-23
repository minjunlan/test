import {Component, OnInit, Input} from '@angular/core';
import { Message,CONF } from './message.class';

@Component({
    selector: 'wx-message',
    templateUrl : `${__dirname}/../template/message.html`,
    styleUrls:['./template/css/message.css']
})
export class MessageComponent implements OnInit{

    @Input() message:Message;
    public toeChoice:string = "Eenie11";
    public CONF:any;

    ngOnInit(){
        this.CONF = CONF;
    }
}