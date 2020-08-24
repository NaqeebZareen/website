import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from '../wishlist.component';
import { WishListCardModule } from 'src/app/shared/wishList-card/wishList-card-module/wishList-card.module';
import { SideBarModule } from 'src/app/shared/sider-bar/side-bar-module/side-bar.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    WishListCardModule,
    SideBarModule
  ]
})
export class WishlistModule { }
