
/**
 * Message
 */
export class Message {

    private SubMsgType:number = 0;
    private AppMsgType:number = 0;
    private MMPeerUserName = '';
    private MMFileStatus = 0;
    private MMPlaying = false;

    constructor(
    private MMIsSend:boolean,
    private MsgType:number,
    private MMIsChatRoom:boolean = false,
    private MMTime:number,
    private MMActualContent:string,
    private MMStatus:number //1正在发送, 5发送失败
    ) { }
}

export enum CONF {
    MSGTYPE_TEXT = 1,
    MSGTYPE_IMAGE = 3,
    MSGTYPE_VOICE = 34,
    MSGTYPE_VERIFYMSG = 37,
    MSGTYPE_VIDEO = 43,
    MSGTYPE_EMOTICON = 47,
    MSGTYPE_LOCATION,
    MSGTYPE_SHARECARD = 49,
    MSGTYPE_MICROVIDEO = 62,
    MSGTYPE_APP,
    APPMSGTYPE_URL,
    APPMSGTYPE_ATTACH,
    APPMSGTYPE_READER_TYPE,
    APPMSGTYPE_RED_ENVELOPES,
    MM_SEND_FILE_STATUS_FAIL    
}