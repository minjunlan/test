/**
 * QRLogin
 */
export class QRLogin {
    code:number;
    uuid:string;

    constructor(str:string) {
        this.handleStr(str);
    }

    private handleStr(str:string){     
        let arr1: string[];
        arr1 = str.split(";");
        arr1.map(v=>{
            if (v.includes('QRLogin.code')) {
                this.code = Number(v.split("=")[1]);
            } else if (v.includes('QRLogin.uuid')) {
                let i = v.indexOf('=');
                let s = v.substr(i+1);
                this.uuid = s.replace(/"/g,'').trim();
            }
        })
        

    }
}