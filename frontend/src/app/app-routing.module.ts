import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  { path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  
  {
    path: 'panel',
    loadChildren: () => import('./views/panel/panel.module').then(m => m.PanelModule), 
    canActivate: [AuthGuard],
    data: { breadcrumb: 'داشبورد' }
  },

  { path: '**', component: NotFoundComponent }

  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }