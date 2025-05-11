import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

/**  test recapcha from https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally
 | Type           | Key                                        |
| -------------- | ------------------------------------------ |
| **Site Key**   | `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` |
| **Secret Key** | `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe` |
*/

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();

    // making test token
    //  function getToken() {
    //     grecaptcha.ready(function () {
    //       grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', { action: 'test' }).then(function (token) {
    //         console.log('Generated test token:', token);
    //         // You can now send `token` to your backend
    //       });
    //     });
    //   }

    const recaptchaToken=body.recaptchaToken
    if(!recaptchaToken){
        throw new ForbiddenException('Recaptcha token is required!')
    }

    const res = await firstValueFrom(
      this.httpService.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: this.configService.get('RECAPTCHA_SECRET'),
            response: recaptchaToken,
          },
        },
      ),
    );
    const data=await res.data
    if (!data.success) {
      throw new ForbiddenException('Recaptcha is invalid!');
    }
    return true;
  }
}
