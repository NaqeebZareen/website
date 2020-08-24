import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityListRoutingModule } from './activity-list-routing.module';
import { ActivityListComponent } from '../activity-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultCardModule } from '../../search-result-card/search-result-card-module/search-result-card.module';
import { RecmondedCardModule } from '../../recmonded-card/recmonded-card-module/recmonded-card.module';

@NgModule({
  declarations: [ActivityListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActivityListRoutingModule,
    SearchResultCardModule,
    RecmondedCardModule

  ],
  exports: [ActivityListComponent]
})
export class ActivityListModule { }
