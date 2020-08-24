import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestlistingComponent } from '../interestlisting.component';
import { InterestlistingRoutingModule } from './interestlisting-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ActivityListModule } from 'src/app/shared/activity-list/activity-list-module/activity-list.module';

import { ListingcardModule } from '../../../shared/listingcard/listingcard-module/listingcard.module';

@NgModule({
  declarations: [InterestlistingComponent],
  imports: [
    CommonModule,
    InterestlistingRoutingModule,
    // ActivityListModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ListingcardModule
  ]
})
export class InterestlistingModule { }
