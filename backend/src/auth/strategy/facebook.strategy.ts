import { AuthService } from './../auth.service';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy,'facebook'){
    constructor(private authService:AuthService){
        super({
            clientID:'YOUR_FACEBOOK_CLIENT_ID',
            clientSecret:'YOUR_FACEBOOK_CLIENT_SECRET',
            callbackURL:'http://localhost:5500/auth/facebook/callback',
            scope:['id','profile','email']
        })
    }
    async validate(accessToken:string,refreshToken:string,profile:any){
        return this.authService.validateFacebookUser(profile)
    }
}