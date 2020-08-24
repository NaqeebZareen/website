import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewwishlistRoutingModule } from '../newwishlist-module/newwishlist-routing.module';
import { NewwishlistComponent } from '../newwishlist.component';
import { WishListCardModule } from 'src/app/shared/wishList-card/wishList-card-module/wishList-card.module';
import { SideBarModule } from 'src/app/shared/sider-bar/side-bar-module/side-bar.module';
import { NewscardModule } from 'src/app/shared/newscard/newscard-module/newscard.module';
import { NewscardwithoutimgModule } from 'src/app/shared/newscardwithoutimg/newscardwithoutimg-module/newscardwithoutimg.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [NewwishlistComponent],
  imports: [
    CommonModule,
    NewwishlistRoutingModule,
    WishListCardModule,
    SideBarModule,
    NewscardModule,
    NewscardwithoutimgModule
  ]
})
export class NewwishlistModule { }
