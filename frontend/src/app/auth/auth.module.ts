import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth.routing';
import { SharedModule } from '../shared/module/shared.module';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { SharedComponentsModule } from '../shared/module/shared.components.module';
import { LayoutModule } from "../shared/layout/layout.module";

@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    AuthRoutingModule,
    RouterModule,
    LayoutModule
],
  declarations: [
    SingInComponent,
    SingUpComponent,
  ],
  exports: [
    SingInComponent,
    SingUpComponent,
  ]
})
export class AuthModule { }
