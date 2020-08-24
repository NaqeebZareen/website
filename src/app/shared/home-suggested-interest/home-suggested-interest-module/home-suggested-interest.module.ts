import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeSuggestedInterestRoutingModule } from './home-suggested-interest-routing.module';
import { HomeSuggestedInterestComponent } from '../home-suggested-interest.component';

@NgModule({
  declarations: [HomeSuggestedInterestComponent],
  imports: [
    CommonModule,
    HomeSuggestedInterestRoutingModule

  ],
  exports: [HomeSuggestedInterestComponent]
})
export class HomeSuggestedInterestModule { }
