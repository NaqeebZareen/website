import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewssearchlistingRoutingModule } from './newssearchlisting-routing.module';
import { NewssearchlistingComponent } from '../newssearchlisting.component';
import { NewscardModule } from '../../newscard/newscard-module/newscard.module';
import { NewscardwithoutimgModule } from '../../newscardwithoutimg/newscardwithoutimg-module/newscardwithoutimg.module';
@NgModule({
  declarations: [NewssearchlistingComponent],
  imports: [
    CommonModule,
    NewssearchlistingRoutingModule,
    NewscardModule,
    NewscardwithoutimgModule
  ]
  ,
  exports: [NewssearchlistingComponent]
})
export class NewssearchlistingModule { }
