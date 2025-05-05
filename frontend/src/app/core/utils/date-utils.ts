import moment from "jalali-moment";

export function toGregorian(date: any): string {
    return date ? moment(date).format('YYYY-MM-DD') : '';
}