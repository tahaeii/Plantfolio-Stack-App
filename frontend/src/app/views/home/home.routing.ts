import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/views/home/pages/home/home.component";
import { ProductsAllComponent } from "./pages/products/products-all/products-all.component";
import { ProductsDetailsComponent } from "./pages/products/products-details/products-details.component";

const routes: Routes = [ // Add Components

    //   { path: "XXX", component: XXXComponent },
    //   { path: "XXX/:id", component: XXXComponent },

    { path: '', component: HomeComponent }, // canActivate: [AuthGuard]
    { path: 'products', component: ProductsAllComponent },
    { path: 'product', component: ProductsDetailsComponent }, // product/:id

    // { path: 'auth', loadChildren: () => import('../../auth/pages/auth.module').then(m => m.AuthModule) },
    // { path: "panel", loadChildren: () => import('../../core/module/panel-components.module').then(m => m.PanelComponentsModule)}


];

export const HomeRoutes = RouterModule.forChild(routes);
