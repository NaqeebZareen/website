import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListCardRoutingModule } from './wishList-card-routing.module';
import { WishListCardComponent } from '../wishList-card.component';

@NgModule({
  declarations: [WishListCardComponent],
  imports: [
    CommonModule,
    WishListCardRoutingModule
  ],
  exports: [WishListCardComponent]
})
export class WishListCardModule { }
