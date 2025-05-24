import { Module } from "@nestjs/common";
import { LogGateway } from "./log.gateway";
import { LogInterceptor } from "./log.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    providers:[LogGateway,{
        provide:APP_INTERCEPTOR,
        useClass:LogInterceptor
    }],
    exports:[LogGateway]
})
export class LogModule{}