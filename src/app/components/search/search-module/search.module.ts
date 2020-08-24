import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from '../search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateModule } from 'src/app/shared/date/date/date.module';

import { ActivityListModule } from 'src/app/shared/activity-list/activity-list-module/activity-list.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SideBarModule } from '../../../shared/sider-bar/side-bar-module/side-bar.module'
import { from } from 'rxjs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CarouselModule,
    CommonModule,
    SearchRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DateModule,
    ActivityListModule,
    BsDatepickerModule.forRoot(),
    SideBarModule
    // Ng5SliderModule
  ]
})
export class SearchModule { }
