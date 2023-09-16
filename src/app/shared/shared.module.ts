import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundIllustrationComponent } from './components/not-found-illustration/not-found-illustration.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import {
  AngularToastifyModule,
  ToastifyToastContainerComponent,
} from 'angular-toastify';

@NgModule({
  declarations: [
    LogoComponent,
    NotFoundIllustrationComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StarRatingModule.forRoot(),
    AngularToastifyModule,
    TranslateModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbModule,
  ],
  exports: [
    ToastifyToastContainerComponent,
    NotFoundIllustrationComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
    NgbPaginationModule,
  ],
})
export class SharedModule {}
