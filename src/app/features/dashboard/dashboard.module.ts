import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StarRatingComponent, StarRatingModule } from 'angular-star-rating';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    StarRatingModule.forRoot(),
  ],
})
export class DashboardModule {}
