import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { StarRatingModule } from 'angular-star-rating';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogoComponent } from './components/logo/logo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NotFoundIllustrationComponent } from './components/not-found-illustration/not-found-illustration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserViewComponent,
    AdminViewComponent,
    LoginPageComponent,
    ProductDetailsComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    PageNotFoundComponent,
    NotFoundIllustrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    StarRatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
