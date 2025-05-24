import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { ScreenLoaderComponent } from '../components/screen-loader/screen-loader.component';
import { AuthInterceptor } from 'src/app/core/helpers/auth.interceptor';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from 'src/app/core/utils/persian-dateadapter';
import { ModalComponent } from '../components/modal/modal.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from './shared.module';
import { RouterLink } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { WebsiteLoaderComponent } from '../components/website-loader/website-loader.component';

@NgModule({
    declarations: [
        BreadcrumbComponent, NotificationComponent, WebsiteLoaderComponent, ScreenLoaderComponent, CustomInputComponent, ModalComponent
    ],
    imports: [
        SharedModule,
        RouterLink,
        QuillModule.forRoot(
            { format: 'html' }
        ),
        ImageCropperModule,
    ],
    exports: [
        SharedModule,
        BreadcrumbComponent, NotificationComponent, WebsiteLoaderComponent, ScreenLoaderComponent, CustomInputComponent, ModalComponent
    ],
})
export class SharedComponentsModule { }
