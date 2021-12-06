import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { constants } from 'src/app/shared/utility/constants';

@Injectable({
    providedIn: 'root'
})
export class Global {
    constructor(
        private message: NzMessageService
    ) { }

    formatParameter(object: any): string {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + (object[prop] ?? ''));
            }
        }
        return encodedString;
    }

    validForm(form: FormGroup, msg?: string): boolean {
        var errors = [];
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
            var status = form.controls[i].status;
            if (status === 'INVALID') {
                errors.push(status);
            }
        }

        if (errors.length !== 0)
            this.message.warning(msg ? msg : 'Por favor completar los campos del formulario.');

        return errors.length === 0 ? true : false;
    }

    fetchResponseErrors(data: any): string {
        var li = '';
        var total = 0;
        var message = '';
        for (let key of Object.keys(data)) {
            var errors = data[key];
            for (let item of errors) {
                li = li + '<li>' + item + '</li>';
                total += 1;
                message = item;
            }
        }
        return total === 1 ? message : ('<ul>' + li + '</ul >');
    }


    GenerarExcel(response:any){
        var blob = new Blob([this.s2ab(atob(response.file))], { type: 'application/octet-stream' });
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

    getTypeSellerCategory(typeSeller: number) : number {
        
        var type = 0;
        
        if(typeSeller == constants.SELLER_TYPE.SELLER)
            type = constants.SELLER_TYPE.SELLER;
        else if(typeSeller == constants.SELLER_TYPE.VTEX_TO_VTEX)
            type = constants.SELLER_TYPE.VTEX;
        else if(typeSeller == constants.SELLER_TYPE.VTEX)
            type = constants.SELLER_TYPE.VTEX;

        return type;
    }
}