import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification, NotificationType } from "./notification.models";
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private _subscription: Subscription | undefined;
  private progressIntervals: { [key: number]: any } = {};
  private notificationTimeouts: { [key: number]: any } = {};

  constructor(protected _notificationSvc: NotificationService) { }

  ngOnInit() {
    // Subscribe To Notification Service To Receive New Notifications
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  private _addNotification(notification: Notification) {
    // Add Notification To List
    this.notifications.push(notification);
    notification.startTime = Date.now();

    // Delay Adding 'show' Class For Fade-in Animation
    setTimeout(() => {
      const index = this.notifications.findIndex(notif => notif.id === notification.id);
      if (index !== -1) {
        document.querySelectorAll('.notification')[index].classList.add('show');
      }
    }, 10);

    // Start Progress Bar And Set Auto-Remove If Timeout Is Set
    if (notification.timeout !== 0) {
      this.startProgress(notification);
      this.notificationTimeouts[notification.id] = setTimeout(() => {
        this.close(notification);
      }, notification.timeout);
    }
  }

  close(notification: Notification) {
    const index = this.notifications.findIndex(notif => notif.id === notification.id);
    if (index !== -1) {
      // Trigger Fade-out Animation
      const element = document.querySelectorAll('.notification')[index];
      element.classList.remove('show');
      element.classList.add('hide');

      // Remove Notification After Animation Completes
      setTimeout(() => {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
      }, 500); // Should Match The CSS Transition Duration
    }
  }

  private startProgress(notification: Notification) {
    // Start Progress Interval To Update Notification's Progress Percentage
    const interval = setInterval(() => {
      notification.progress = Math.min((Date.now() - notification.startTime) / notification.timeout * 100, 100);
      if (notification.progress >= 100) {
        clearInterval(interval); // Stop Progress Interval At 100%
      }
    }, 100);

    this.progressIntervals[notification.id] = interval;
  }

  ngOnDestroy() {
    // Unsubscribe From Notification Service
    this._subscription?.unsubscribe();

    // Clear All Active Intervals When Component Is Destroyed
    Object.values(this.progressIntervals).forEach(interval => clearInterval(interval));
    Object.values(this.notificationTimeouts).forEach(timeout => clearTimeout(timeout));
  }

  className(notification: Notification): string {
    // Determine Notification Style Class Based On Notification Type
    switch (notification.type) {
      case NotificationType.success:
        return 'success';
      case NotificationType.warning:
        return 'warning';
      case NotificationType.error:
        return 'error';
      default:
        return 'info';
    }
  }
}
