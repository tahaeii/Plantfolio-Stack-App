import { NgModule } from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgChartsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgChartsModule
    ]
})
export class SharedModule { }