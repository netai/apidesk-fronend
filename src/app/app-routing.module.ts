import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      heading: 'Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      heading: 'Signup'
    }
  },
  {
    path: 'mock-api',
    canActivate: [AuthGuard],
    data: {
      heading: 'App'
    },
    loadChildren: () => import('./modules/mock-api/mock-api.module').then(m => m.MockAPIModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}