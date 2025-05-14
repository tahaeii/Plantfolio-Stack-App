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
  private isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userType: string;

  /**
   * Observable indicating login state of the user.
   */
  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

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
  ) {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userType = userData.user_type;
  }

  /**
   * Sends login request with credentials and CAPTCHA data.
   * @param email User's email.
   * @param password User's password.
   * @param captcha CAPTCHA text entered by user.
   * @param captchaKey CAPTCHA key received from backend.
   * @returns Observable of login response.
   */
  login(email: string, password: string, captcha: string, captchaKey: string): Observable<any> {
    const loginData = { email, password, captcha, captcha_key: captchaKey };
    return this.http.post<any>(`${this.api}identity/login/`, loginData).pipe(
      tap((response) => {
        const userType = response.user_type;
        this.setUserType(userType);
      }),
      catchError((error) => {
        this.handleLoginError(error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Returns current user type.
   * @returns User type string.
   */
  getUserType(): string {
    return this.userType;
  }

  /**
   * Stores user type in both memory and local storage.
   * @param userType Type of the user.
   */
  setUserType(userType: string) {
    this.userType = userType;
    localStorage.setItem('user_data', JSON.stringify({ user_type: userType }));
  }

  /**
   * Handles login errors by displaying appropriate messages.
   * @param error Error object received from backend.
   */
  private handleLoginError(error: any) {
    this._notificationSvc.notificationHandler(error);
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
  getCaptcha(): Observable<any> {
    return this.http.get<any>(`${this.api}identity/captcha/refresh/`);
  }

  /**
   * Decodes a JWT and returns its payload.
   * @param token JWT string.
   * @returns Decoded payload as an object.
   */
  private decodeJWT(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  /**
   * Refreshes the access token using refresh token.
   * @returns Observable of new access token.
   */
  refreshAccessToken(): Observable<string> {
    const refreshToken = this.getToken('refresh_token');
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<any>(`${this.api}identity/token/refresh/`, { refresh: refreshToken }).pipe(
      switchMap((response) => {
        const newAccessToken = response.access;
        this.setToken('access_token', newAccessToken);
        return newAccessToken ? [newAccessToken] : throwError(() => new Error('Failed to refresh access token'));
      }),
      catchError((error) => {
        console.error('Error refreshing access token:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Verifies the validity of the access token. If invalid, attempts to verify refresh token.
   */
  verifyToken() {
    const token = this.getToken('access_token');
    if (token) {
      return this.http.post<any>(`${this.api}identity/token/verify/`, { token }).subscribe({
        next: () => console.log('Access Token Is Valid'),
        error: (error) => {
          console.error('Access Token Is Invalid or Expired:', error);
          this.verifyRefreshToken();
          this._notificationSvc.notificationHandler(error);
        }
      });
    } else {
      console.warn('No Access Token Found, Redirecting to Login');
      this.logout();
    }
    return;
  }

  /**
   * Verifies the validity of the refresh token. If invalid, logs out the user.
   */
  private verifyRefreshToken() {
    const refreshToken = this.getToken('refresh_token');
    if (refreshToken) {
      return this.http.post<any>(`${this.api}identity/token/verify/`, { token: refreshToken }).subscribe({
        next: () => console.log('Refresh Token Is Valid'),
        error: (error) => {
          console.error('Refresh Token Is Invalid or Expired:', error);
          this.logout();
          this._notificationSvc.notificationHandler(error);
        }
      });
    } else {
      console.warn('No Refresh Token Found, Redirecting to Login');
      this.logout();
    }
    return;
  }

  /**
   * Logs out the user by clearing tokens and navigating to sign-in page.
   */
  logout() {
    this.clearTokens();
    this.isLoggedIn.next(false);
    this.router.navigate(['/sign-in']);
  }

  /**
   * Checks whether an access token is available in local storage.
   * @returns True if token exists, false otherwise.
   */
  public hasToken(): boolean {
    return !!this.getToken('access_token');
  }

  /**
   * Retrieves a token from local storage by key.
   * @param key Token key name (e.g., 'access_token' or 'refresh_token').
   * @returns Token string or null if not found.
   */
  public getToken(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Saves a token to local storage.
   * @param key Token key name.
   * @param token Token value.
   */
  private setToken(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  /**
   * Clears both access and refresh tokens from local storage.
   */
  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
