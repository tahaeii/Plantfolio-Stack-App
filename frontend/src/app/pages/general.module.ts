import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../shared/layout/layout.module";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule
    ],
    exports: [
        NotFoundComponent
    ]
})
export class GeneralModule { }
