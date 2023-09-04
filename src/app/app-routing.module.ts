import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRole } from './services/auth.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginInAuthGuard } from './guards/login-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginInAuthGuard],
  },

  {
    path: 'products',
    component: UserViewComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRole: UserRole.USER,
    },
  },

  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRole: UserRole.USER,
    },
  },
  {
    path: 'dashboard',
    component: AdminViewComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRole: UserRole.ADMIN,
    },
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
