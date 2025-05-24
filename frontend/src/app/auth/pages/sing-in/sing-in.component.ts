import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CaptchaService } from 'src/app/core/services/auth/captcha.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  /** Form group for login inputs */
  form: FormGroup;

  /** Toggles password visibility in input field */
  passwordVisible: boolean = false;

  /** Captcha image URL */
  captchaUrl: string = '';

  /** Captcha key required for verification */
  captchaKey: string = '';

  /**
   * Constructor initializes the form with validation rules.
   * @param authService - Service for authentication API calls
   * @param fb - FormBuilder to create and manage the form group
   */
  constructor(
    private authService: AuthService, private fb: FormBuilder, private _notificationSvc: NotificationService,
    public captchaService: CaptchaService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      captchaText: ['', Validators.required]
    });
  }

  /**
   * Handles the login process by verifying the form values, sending them to the authentication service,
   * and storing the access and refresh tokens upon successful login.
   * Also handles errors by logging them and refreshing the CAPTCHA.
   */
login(): void {
  if (this.form.invalid) return;

  const { email, password, captchaText } = this.form.value;
  const captchaData = this.captchaService.getCurrentCaptcha();

  if (!captchaData) {
    this._notificationSvc.error('کد امنیتی یافت نشد. دوباره تلاش کنید.');
    this.captchaService.loadCaptcha();
    return;
  }

  const captchaUpper = captchaText.toUpperCase();

  // ✅ اینجا مقادیر را در کنسول چاپ می‌کنیم
  console.log('Login Data:', {
    email,
    password,
    captchaText: captchaUpper,
    captchaId: captchaData.key
  });

  this.authService.login(email, password, captchaUpper, captchaData.key).subscribe(
    (response) => {
      this.authService.navigateToDashboard();
    },
    (error) => {
      console.error('Login Error:', error);
      this.captchaService.resetCaptcha();
      this.form.get('captchaText')?.setValue('');
    }
  );
}


  /**
   * Requests a new CAPTCHA from the authentication service and updates the CAPTCHA key and image URL.
   * Also clears the current CAPTCHA input value.
   */
  refreshCaptcha(): void {
    this.authService.getCaptcha().subscribe((data: any) => {
      this.captchaKey = data.captchaId;
      this.captchaUrl = `${environment.captchaUrl}${data.image_url}`;
      this.form.get('captchaText')?.setValue(''); // Clear the CAPTCHA input field
    });
  }


  /**
   * Lifecycle hook that initializes the component.
   * Loads saved email and password (if available) and fetches a new captcha.
   */
  ngOnInit(): void {
    this.captchaService.loadCaptcha();
  }

  /**
   * Toggles the visibility of the password input field.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  copyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this._notificationSvc.success('Copied!', 3000);
  }

}