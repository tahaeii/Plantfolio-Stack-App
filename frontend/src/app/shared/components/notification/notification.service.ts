import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationType, Notification } from './notification.models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private _subject = new Subject<Notification>();
  private _idx = 0;

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(message: string, timeout: number) {
    this._subject.next(new Notification(this._idx++, NotificationType.info, message, timeout));
  }

  success(message: string, timeout: number) {
    this._subject.next(new Notification(this._idx++, NotificationType.success, message, timeout));
  }

  warning(message: string, timeout: number) {
    this._subject.next(new Notification(this._idx++, NotificationType.warning, message, timeout));
  }

  error(message: string, timeout = 0) {
    this._subject.next(new Notification(this._idx++, NotificationType.error, message, timeout));
  }



  // Notification Service Start
  notificationHandler(error: HttpErrorResponse) {

    if (error.status === 200 || error.status === 201) {
      this.success('درخواست موفقیت‌آمیز بود!', 3000);
    } else if (error.status === 400) {
      this.warning('درخواست نامعتبر است!', 3000);
    }
    else if (error.status === 401) {
      this.error('درخواست غیرمجاز است!', 3000);
    } else if (error.status === 403) {
      this.error('درخواست ممنوع است!', 3000);
    } else if (error.status === 404) {
      this.info('درخواست یافت نشد!', 3000);
    } else if (error.status === 500) {
      this.error('خطای سرور!', 3000);
    } else {
      this.error('خطایی رخ داده:(', 3000);
    }
  }

}