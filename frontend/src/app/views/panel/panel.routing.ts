import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelLayoutComponent } from './components/layout/panel-layout/panel-layout.component';

const routes: Routes = [
    {
        path: '',
        component: PanelLayoutComponent,
        children: [
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
            },
            // {
            //     path: 'cms',
            //     loadChildren: () => import('../cms/cms.module').then(m => m.CmsModule),
            //     data: { breadcrumb: 'مدیریت محتوا' }
            // },
            {
                path: '',
                redirectTo: 'admin',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PanelRoutingModule { }
