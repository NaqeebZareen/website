import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitylistingRoutingModule } from './citylisting-routing.module';
import { CitylistingComponent } from '../citylisting.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ActivityListModule } from 'src/app/shared/activity-list/activity-list-module/activity-list.module';

import { ListingcardModule } from '../../../shared/listingcard/listingcard-module/listingcard.module';

@NgModule({
  declarations: [CitylistingComponent],
  imports: [
    CommonModule,
    CitylistingRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ListingcardModule
  ]
})
export class CitylistingModule { }
