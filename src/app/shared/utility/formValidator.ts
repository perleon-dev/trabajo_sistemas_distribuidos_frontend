import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidator {
    constructor(
    ) { }

    optionalValidateDNI = (control: FormControl): { [s: string]: boolean } => {
        if (control.value === null || control.value === "")
            return {};

        if (control.value.toString().length !== 8)
            return { error: true, optionalValidateDNI: true };

        return {};
    }

    optionalValidateEmail = (control: FormControl): { [s: string]: boolean } => {
        if (control.value === null || control.value === "")
            return {};

        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!regexp.test(control.value))
            return { error: true, optionalValidateEmail: true };

        return {};
    }

    validateLocalArea = (control: FormControl): { [s: string]: boolean } => {
        if (control.value === null || control.value === "")
            return {};

        var regexp = new RegExp(/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/);

        if (!regexp.test(control.value))
            return { error: true, validateLocalArea: true };

        return {};
    }

    validateAmount = (control: FormControl): { [s: string]: boolean } => {
        if (control.value === null || control.value === "")
            return {};

        var regexp = new RegExp(/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/);

        if (!regexp.test(control.value))
            return { error: true, validateAmount: true };

        return {};
    }

    validateDiscountEmit = (control: FormControl): { [s: string]: boolean } => {
        if (control.value === null || control.value === "")
            return {};

        var regexp = new RegExp(/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/);

        if (!regexp.test(control.value))
            return { error: true, validateDiscountEmit: true };

        if (parseFloat(control.value) > 100)
            return { error: true, validateDiscountEmit: true };
        return {};
    }

    espacionBlanco(control: FormControl) {
        const isWhitespace = (String(control.value) || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    validateNumber = (event): boolean => {    
        let charCode = (event.which) ? event.which : event.keyCode;    
        let tecla = String.fromCharCode(charCode).toLowerCase();    
        let ctrl = (document.all) ? event.ctrlKey : event.modifiers & event.CONTROL_MASK;        
        if ((event.ctrlKey || event.metaKey) && event.keyCode == 86) {      return true;    }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {      return false;    }    return true;  
    }

}