import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthComponent } from './auth/auth.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './core/utils/persian-dateadapter';
import { HomeModule } from './views/home/home.module';
import { AuthInterceptor } from './core/helpers/auth.interceptor';
import { LayoutModule } from './shared/layout/layout.module';
import { SharedComponentsModule } from './shared/module/shared.components.module';
// import { CoreModule } from './core/core.module';
import { GeneralModule } from './pages/general.module';
import { PanelModule } from './views/panel/panel.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/module/core.module';

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent
  ],
  imports: [
    HomeModule,
    CoreModule,
    GeneralModule,
    // LayoutModule,
    PanelModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    SharedComponentsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
