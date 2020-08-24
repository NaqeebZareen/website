import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from '../news.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateModule } from 'src/app/shared/date/date/date.module';
import { NewssearchlistingModule } from 'src/app/shared/newssearchlisting/newssearchlisting-module/newssearchlisting.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SideBarModule } from '../../../shared/sider-bar/side-bar-module/side-bar.module'
import { from } from 'rxjs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    CarouselModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DateModule,

    NewssearchlistingModule,
    BsDatepickerModule.forRoot(),
    SideBarModule
  ]
})
export class NewsModule { }
