import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './features/dashboard/pages/admin-view/admin-view.component';
import { ProductsListComponent } from './features/products/pages/products-list/products-list.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './core/interfaces/user-role.enum';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { LoginInAuthGuard } from './core/guards/login-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginInAuthGuard],
  },

  {
    path: 'products',
    component: ProductsListComponent,
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

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
