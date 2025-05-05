import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separator'
})
export class SeparatorPipe implements PipeTransform {
  transform(value: string | number): string {
    if (value === null || value === undefined || value === '') return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
