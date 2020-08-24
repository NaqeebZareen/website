import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsdetailsRoutingModule } from './newsdetails-routing.module';
import { NewsdetailsComponent } from '../newsdetails.component';
import { NewscardModule } from '../../../shared/newscard/newscard-module/newscard.module';
import { NewscardwithoutimgModule } from '../../../shared/newscardwithoutimg/newscardwithoutimg-module/newscardwithoutimg.module'
import { from } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [NewsdetailsComponent],
  imports: [
    CommonModule,
    NewsdetailsRoutingModule,
    NewscardModule,
    NewscardwithoutimgModule,
    SlickCarouselModule
  ]
})
export class NewsdetailsModule { }
