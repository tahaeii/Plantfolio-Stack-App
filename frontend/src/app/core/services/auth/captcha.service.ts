// services/captcha.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

export interface CaptchaData {
  key: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  /**
  * Internal BehaviorSubject to hold the current CAPTCHA data.
  * Emits null when no CAPTCHA is loaded or after clearing.
  */
  private _captcha = new BehaviorSubject<CaptchaData | null>(null);

  /**
   * Constructor for CaptchaService.
   * @param authService - Injected AuthService used to request CAPTCHA from the backend.
   */
  constructor(private authService: AuthService) { }

  /**
   * Observable that provides the current CAPTCHA data.
   * Useful for subscribing in components to reflect CAPTCHA updates in the UI.
   * @returns {Observable<CaptchaData | null>} - An observable of current CAPTCHA data.
   */
  get captcha$(): Observable<CaptchaData | null> {
    return this._captcha.asObservable();
  }

  /**
   * Fetches a new CAPTCHA from the server via AuthService
   * and updates the internal BehaviorSubject with the new data.
   * Uses the base URL from environment variable `captchaUrl`.
   */
  loadCaptcha(): void {
    this.authService.getCaptcha().pipe(
      tap((data: any) => {
        this._captcha.next({
          key: data.captchaId,
          imageUrl: data.image_url
        });
      })
    ).subscribe();
  }

  /**
   * Resets the CAPTCHA by requesting a new one from the server.
   * Typically used after an incorrect CAPTCHA entry or expired session.
   */
  resetCaptcha(): void {
    this.loadCaptcha();
  }

  /**
   * Returns the current CAPTCHA data stored in the service.
   * Useful when sending CAPTCHA value and key to the backend.
   * @returns {CaptchaData | null} - The current CAPTCHA data or null if not set.
   */
  getCurrentCaptcha(): CaptchaData | null {
    return this._captcha.getValue();
  }

  /**
   * Clears the stored CAPTCHA data from memory.
   * Can be used on logout or form reset.
   */
  clear(): void {
    this._captcha.next(null);
  }
}