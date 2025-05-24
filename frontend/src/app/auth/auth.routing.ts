import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingInComponent } from './pages/sing-in/sing-in.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { LogViewerComponent } from '../pages/log-viewer/log-viewer.component';

const routes: Routes = [

  { path: 'sign-in', component: SingInComponent },
  { path: 'sign-up', component: SingUpComponent },

    { path: 'log-viewer', component: LogViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
