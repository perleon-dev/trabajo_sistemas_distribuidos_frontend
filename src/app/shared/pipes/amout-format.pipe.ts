import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amoutFormat'
})
export class AmoutFormatPipe implements PipeTransform {

  transform(value: any): any {
    if(!value) return '0.00';

    return Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

}
