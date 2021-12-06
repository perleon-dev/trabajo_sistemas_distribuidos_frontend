import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: string): any {
    if(!value) return '';
    
    return super.transform(value, 'dd/MM/yyyy');
  }

}
