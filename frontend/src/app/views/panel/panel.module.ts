import { NgModule } from "@angular/core";
import { PanelLayoutComponent } from "./components/layout/panel-layout/panel-layout.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule, Routes } from "@angular/router";
import { PanelRoutingModule } from "./panel.routing";
import { CommonModule } from "@angular/common";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { SharedComponentsModule } from "../../shared/module/shared.components.module";
import { SharedModule } from "src/app/shared/module/shared.module";


@NgModule({
    imports: [
        PanelRoutingModule,
        RouterModule,
        CommonModule,
        SharedModule,
        SharedComponentsModule
    ],
    declarations: [
        PanelLayoutComponent,
        SidebarComponent,
        TopbarComponent

    ],
    exports: [
        // PanelLayoutComponent,    

    ],
})
export class PanelModule { }