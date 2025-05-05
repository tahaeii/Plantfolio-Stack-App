import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../components/layout/admin-layout/admin-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            // {
            //     path: 'create-course',
            //     component: CourseCreateComponent,
            //     data: { breadcrumb: 'ساخت دوره' }
            // },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
