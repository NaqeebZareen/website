import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateRoutingModule } from './date-routing.module';
import { DateComponent } from '../date.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from "ng-pick-datetime";

// this for to remove time from date in owl date time formate
export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  timePickerInput: { hour: 'numeric', minute: 'numeric' },
  monthYearLabel: { year: 'numeric', month: 'short' },
  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'long' },
};

@NgModule({
  declarations: [DateComponent],
  imports: [
    CommonModule,
    DateRoutingModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    FormsModule,
    // OwlDateTimeModule, OwlNativeDateTimeModule
  ],
  exports: [DateComponent],
  // providers: [
  //   { 
  //     provide: 
  //     OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS 
  //   }]
})
export class DateModule { }
