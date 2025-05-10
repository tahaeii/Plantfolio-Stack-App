import { AuthService } from './../auth.service';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(private authService:AuthService){
        super({
            clientID:'YOUR_GOOGLE_CLIENT_ID',
            clientSecret:'YOUR_GOOGLE_CLIENT_SECRET',
            callbackURL:'http://localhost:5500/auth/google/callback',
            scope:['profile','email']
        })
    }
    async validate(accessToken:string,refreshToken:string,profile:any){
        return this.authService.validateGoogleUser(profile)
    }
}