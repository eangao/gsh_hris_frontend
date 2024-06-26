import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authority } from './config/authority.constants';
import { UserRouteAccessService } from './core/auth/user-route-access.service';

const routes: Routes = [
  { path: 'login', loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule) },
  { path: 'error', loadChildren: () => import(`./errorpages/errorpages.module`).then(m => m.ErrorpagesModule) },
  {
    path: '',
    data: {
      authorities: [Authority.ADMIN, Authority.USER],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import(`./all-modules/all-modules.module`).then(m => m.AllModulesModule)
  }
  ,
  { path: '**', loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
