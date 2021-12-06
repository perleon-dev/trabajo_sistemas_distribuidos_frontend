import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class downloadFile {
    constructor(
        private message: NzMessageService
    ) { }

    GeneratePDF(response:any){
        var blob = new Blob([this.s2ab(atob(response.file))], { type: 'application/pdf' });
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = response.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };
}