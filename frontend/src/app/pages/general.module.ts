import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../shared/layout/layout.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LogViewerComponent } from "./log-viewer/log-viewer.component";
import { MaterialModule } from "../shared/module/material.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        NotFoundComponent,
        LogViewerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        HttpClientModule,
        LayoutModule
    ],
    exports: [
        NotFoundComponent,
        LogViewerComponent
    ]
})
export class GeneralModule { }
