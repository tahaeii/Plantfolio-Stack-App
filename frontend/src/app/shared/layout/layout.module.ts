import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation/navigation.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [NavigationComponent, FooterComponent],
    imports: [CommonModule, RouterLink],
    exports: [NavigationComponent, FooterComponent]
})
export class LayoutModule { }
