import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * AuthService handles user authentication, token management, and user session control.
 */
export class AuthService {
  private api = environment.apiAddress;
  private userType !: string;

  /**
   * Initializes the AuthService and retrieves user type from local storage.
   * @param http HttpClient for API requests.
   * @param router Router for navigation.
   * @param _notificationSvc Notification service to display messages.
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private _notificationSvc: NotificationService
  ) { }

  /**
   * Sends login request with credentials and CAPTCHA data.
   * @param email User's email.
   * @param password User's password.
   * @param captcha CAPTCHA text entered by user.
   * @param captchaKey CAPTCHA key received from backend.
   * @returns Observable of login response.
   */
  login(email: string, password: string, captchaText: string, captchaId: string): Observable<any> {
    const payload = {
      email,
      password,
      captchaText,
      captchaId
    };

    return this.http.post(`${environment.apiAddress}auth/`, payload);
  }

  /**
   * Redirects the user to dashboard and displays welcome message.
   */
  navigateToDashboard() {
    this.router.navigate(['/panel']);
    this._notificationSvc.success('خوش آمدید!', 3000);
  }

  /**
   * Fetches a new CAPTCHA image and key from the backend.
   * @returns Observable of CAPTCHA data.
   */
  getCaptcha(): Observable<{ captchaId: string, image_url: string }> {
    return this.http.get(`${environment.captchaUrl}`, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map(response => {
        // const captchaId = response.headers.get('captchaId');
        const captchaId = response.headers.get('captcha-Id') || response.headers.get('captchaid') || response.headers.get('captchaId');

        const imageBlob = response.body!;
        const imageUrl = URL.createObjectURL(imageBlob);

        return {
          captchaId: captchaId!,
          image_url: imageUrl
        };
      })
    );
  }


}
