import { FormGroup } from '@angular/forms';

export function stringFormat(str: string, ...val: any[]) {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}

export function notNullInput(val: any) {
  if (val == null)
    return '';
  else
    return val;
}

export function GenerarExcel(response:any){
  var blob = new Blob([s2ab(atob(response.file))], { type: 'application/octet-stream' });
  var a = document.createElement('a');
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = response.fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function validForm(form: FormGroup) {
  var errors = [];
  for (const i in form.controls) {
    form.controls[i].markAsDirty();
    form.controls[i].updateValueAndValidity();
    var status = form.controls[i].status;
    if (status === 'INVALID') {
      errors.push(status);
    }
  }
  return errors.length === 0 ? true : false;
}

export function formatNumber(value: any){  
  if(value === 0) return '0.00';
  else return Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
}

export function formatDateAAAAMMDD(value: Date): string{
  let dateFormat: string = '';

  dateFormat = value.getFullYear() + '/' + (value.getMonth() + 1).toString().padStart(2, '0') + '/' + value.getDate().toString().padStart(2, '0');

  return dateFormat;
}

export function clearHSMDate(date: Date){
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}

export function thousandsSeparator(num) {
  if (!num || num == 'NaN') return '0.00';
  if (num == 'Infinity') return '&#x221e;';
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
      num = "0";
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents: any = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
      cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

