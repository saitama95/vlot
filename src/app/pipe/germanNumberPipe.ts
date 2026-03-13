import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'germanNumber',
  standalone: false
})
export class GermanNumberPipe implements PipeTransform {
  transform(value: number | string | null | undefined, decimals: number = 2): string {
    if (value === null || value === undefined || value === '' || value === 0 || value === '0') {
      return '';
    }
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return String(value);

    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }
}