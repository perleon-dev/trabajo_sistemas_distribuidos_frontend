import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
    name: 'boldText'
})
export class BoldTextPipe implements PipeTransform {

    constructor(
        private sanitizer: Sanitizer
    ) { }

    transform(value: string, apply: boolean) {
        return this.sanitize(this.replace(value, apply));
    }

    replace(str, apply) {
        if (apply)
            return str.replace(str, '<b>$1</b>');
        else
            return str;
    }

    sanitize(str) {
        return this.sanitizer.sanitize(SecurityContext.HTML, str);
    }
}