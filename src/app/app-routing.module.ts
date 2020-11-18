import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultContainerComponent } from './containers/default-container/default-container.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './core/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DefaultContainerComponent
  ,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuardService]
    },
    {
      path: '',
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
      canActivate: [AuthGuardService]
    }

  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
