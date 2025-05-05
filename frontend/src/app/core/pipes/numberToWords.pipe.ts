import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  private ones = [
    '', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه',
  ];
  private teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  private tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  private thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوآدریلیون', 'کوینتیلیون'];

  transform(value: number): string {
    if (value === 0) {
      return 'صفر تومان';
    }

    let words = '';
    let groupIndex = 0;

    while (value > 0) {
      const currentGroup = value % 1000;
      if (currentGroup > 0) {
        words = this.convertGroup(currentGroup) + (this.thousands[groupIndex] ? ' ' + this.thousands[groupIndex] : '') + ' و' + words;
      }
      value = Math.floor(value / 1000);
      groupIndex++;
    }

    words = words.trim();
    if (words.endsWith('و')) {
      words = words.slice(0, -1);
    }

    return words + ' تومان';
  }

  private convertGroup(value: number): string {
    let result = '';
    if (value >= 100) {
      const hundredPart = Math.floor(value / 100);
      if (hundredPart === 1) {
        result += 'یک صد ';
      } else if (hundredPart === 2) {
        result += 'دویست ';
      } else if (hundredPart === 3) {
        result += 'سیصد ';
      } else if (hundredPart === 4) {
        result += 'چهارصد ';
      } else if (hundredPart === 5) {
        result += 'پانصد ';
      } else if (hundredPart === 6) {
        result += 'ششصد ';
      } else if (hundredPart === 7) {
        result += 'هفتصد ';
      } else if (hundredPart === 8) {
        result += 'هشتصد ';
      } else if (hundredPart === 9) {
        result += 'نهصد ';
      }
      value %= 100;
    }

    if (value >= 20) {
      result += this.tens[Math.floor(value / 10)] + ' ';
      value %= 10;
    }
    if (value >= 10) {
      result += this.teens[value - 10] + ' ';
    } else if (value > 0) {
      result += this.ones[value] + ' ';
    }
    return result.trim();
  }

}
