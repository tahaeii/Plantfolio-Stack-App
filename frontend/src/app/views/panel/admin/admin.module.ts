import { NgModule } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { AdminRoutingModule } from "./admin.routing";
import { ImageCropperModule } from "ngx-image-cropper";
import { SharedModule } from "src/app/shared/module/shared.module";
import { SharedComponentsModule } from "src/app/shared/module/shared.components.module";
import { AdminLayoutComponent } from "../components/layout/admin-layout/admin-layout.component";

@NgModule({
    declarations: [
        AdminLayoutComponent,
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        ImageCropperModule,
        QuillModule.forRoot(
            { format: 'html' }
        ),
        SharedComponentsModule

    ],
})
export class AdminModule { }
