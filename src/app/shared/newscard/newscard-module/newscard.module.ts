import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewscardRoutingModule } from './newscard-routing.module';
import { NewscardComponent } from '../newscard.component';


@NgModule({
  declarations: [NewscardComponent],
  imports: [
    CommonModule,
    NewscardRoutingModule
  ],
  exports: [NewscardComponent]
})
export class NewscardModule { }
