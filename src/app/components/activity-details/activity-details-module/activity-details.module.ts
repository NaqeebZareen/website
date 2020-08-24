import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// thired party libraries
import { AgmCoreModule } from '@agm/core';
import { SearchResultCardModule } from '../../../shared/search-result-card/search-result-card-module/search-result-card.module';
import { ActivityDetailsRoutingModule } from './activity-details-routing.module';
import { ActivityDetailsComponent } from '../activity-details.component';
import { RecmondedCardModule } from '../../../shared/recmonded-card/recmonded-card-module/recmonded-card.module';
// import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [ActivityDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActivityDetailsRoutingModule,
    SearchResultCardModule,
    RecmondedCardModule,
    SlickCarouselModule
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyB42qwPDDlq7bSbT4kJwXrJqVdI1evn1EA",
    //   libraries: ["places"]
    // }),
    // NgxQRCodeModule,
  ]
})
export class ActivityDetailsModule { }
