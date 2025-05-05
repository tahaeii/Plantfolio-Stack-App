import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenLoaderService {

  private activeRequests = 0;
  private isLoading = new BehaviorSubject<boolean>(false);

  loading$ = this.isLoading.asObservable();

  show() {
    this.activeRequests++;
    this.updateLoaderState();
  }

  hide() {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    this.updateLoaderState();
  }

  private updateLoaderState() {
    if (this.activeRequests === 0) {
      this.isLoading.next(false);
    } else {
      this.isLoading.next(true);
    }
  }
}
