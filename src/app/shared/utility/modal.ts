import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root'
})
export class Modal {
    constructor(
        private modal: NzModalService
    ) { }

    async confirm(message: string, onOk: any = null, onCancel: any = null) {
        this.modal.confirm({
            nzKeyboard: false,
            nzTitle: 'Confirmación',
            nzContent: message,
            nzOnOk: () => {
                return new Promise(async (resolve, reject) => {
                    await onOk();
                    reject();
                    resolve();
                }).catch(() => console.log('Oops errors!'));
            },
            nzOnCancel: () => {
                if (onCancel !== null && onOk !== null)
                    onCancel();
            },
        });
    }

    info(message: string, onOk: any = null) {
        this.modal.info({
            nzKeyboard: false,
            nzTitle: 'Mensaje',
            nzContent: (message),
            nzOnOk: () => {
                if (onOk !== null)
                    onOk();
            }
        });
    }

    success(message: string, onOk: any = null) {
        this.modal.success({
            nzKeyboard: false,
            nzTitle: 'Mensaje',
            nzContent: (message),
            nzOnOk: () => {
                if (onOk !== null)
                    onOk();
            },
        });
    };

    error(message: string, onOk: any = null, onCancel: any = null, width: any = null) {
        this.modal.error({
            nzWidth: width === null ? '416px' : width,
            nzKeyboard: false,
            nzTitle: 'Mensaje',
            nzContent: (message),
            nzOnOk() {
                if (onOk !== null && onOk !== null)
                    onOk();
            },
            nzOnCancel() {
                if (onCancel !== null && onOk !== null)
                    onCancel();
            },
        });
    };

    warning(message, onOk: any = null) {
        this.modal.warning({
            nzKeyboard: false,
            nzTitle: 'Mensaje',
            nzContent: (message),
            nzOnOk() {
                if (onOk !== null && onOk !== null)
                    onOk();
            },
        });
    };
}