import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewscardwithoutimgRoutingModule } from './newscardwithoutimg-routing.module';
import { NewscardwithoutimgComponent } from '../newscardwithoutimg.component';


@NgModule({
  declarations: [NewscardwithoutimgComponent],
  imports: [
    CommonModule,
    NewscardwithoutimgRoutingModule
  ],
  exports: [NewscardwithoutimgComponent]
})
export class NewscardwithoutimgModule { }
