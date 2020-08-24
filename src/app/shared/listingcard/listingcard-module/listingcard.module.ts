import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingcardRoutingModule } from './listingcard-routing.module';
import { ListingcardComponent } from '../listingcard.component'
import { from } from 'rxjs';

@NgModule({
  declarations: [ListingcardComponent],
  imports: [
    CommonModule,
    ListingcardRoutingModule
  ]
  ,
  exports: [ListingcardComponent]
})
export class ListingcardModule { }
