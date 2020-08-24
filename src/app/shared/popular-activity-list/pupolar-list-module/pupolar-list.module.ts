import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PupolarListRoutingModule } from './pupolar-list-routing.module';
import { PopularActivityListComponent } from '../popular-activity-list.component';

import { SearchResultCardModule } from '../../search-result-card/search-result-card-module/search-result-card.module';
import { RecmondedCardModule } from '../../recmonded-card/recmonded-card-module/recmonded-card.module';

@NgModule({
  declarations: [PopularActivityListComponent],
  imports: [
    CommonModule,
    PupolarListRoutingModule,
    RecmondedCardModule,
    SearchResultCardModule
  ],
  exports: [PopularActivityListComponent]
})
export class PupolarListModule { }
