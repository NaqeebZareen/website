import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewslistingRoutingModule } from './newslisting-routing.module';
import { NewslistingComponent } from '../newslisting.component';
import { NewscardModule } from '../../newscard/newscard-module/newscard.module'
import { NewscardwithoutimgModule } from '../../newscardwithoutimg/newscardwithoutimg-module/newscardwithoutimg.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [NewslistingComponent],
  imports: [
    CommonModule,
    NewscardModule,
    NewslistingRoutingModule,
    NewscardwithoutimgModule
  ],
  exports: [NewslistingComponent]
})
export class NewslistingModule { }
