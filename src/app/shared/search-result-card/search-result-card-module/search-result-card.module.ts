import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultCardRoutingModule } from './search-result-card-routing.module';
import { SearchResultCardComponent } from '../search-result-card.component';

@NgModule({
  declarations: [SearchResultCardComponent],
  imports: [
    CommonModule,
    SearchResultCardRoutingModule
  ],
  exports: [SearchResultCardComponent]
})
export class SearchResultCardModule { }
