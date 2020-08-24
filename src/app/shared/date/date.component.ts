import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as _moment from 'moment';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
// import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
// import { MomentDateTimeAdapter } from 'ng-pick-datetime';
// import { MomentDateTimeAdapter, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'LL LT',
  datePickerInput: 'MMM DD, YYYY',
  timePickerInput: 'LT',
  // monthYearLabel: 'MMM YYYY',
  // dateA11yLabel: 'LL',
  // monthYearA11yLabel: 'MMMM YYYY',
};
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // `MomentDateTimeAdapter` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    // { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },

    // { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})

export class DateComponent implements OnInit, OnChanges {
  @Input() public searchInputDates: Date[];



  // to detect input changes ...
  ngOnChanges(changes: SimpleChanges): void {
    this.flag = 1;
  }

  // props
  public minDate: any;
  public isActive: boolean = false;
  public searchInputDate1: string;// used with ngModel
  public flag: number = 0; // to check if flag 0 it mean user search parameters come from home component cz at first time load 
  // onChange hook will execute and will initialize to 1 so on first load dateChange function will not emit any value and we don't
  // want that cz these input parameters come from other cmponent ,we emit if select on search comp,if one it will emit value to search component
  // where it will call selectedDate func to load new activities base on date

  // props for dateRange picker
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private srvLoggingService: LoggingService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.searchInputDates = new moment();
  }


  @Output() public notify = new EventEmitter();

  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    // for dateRange picker
    this.bsConfig = Object.assign({},
      {
        showWeekNumbers: false,
        containerClass: 'theme-green',
        rangeInputFormat: 'DD/MMM',


      });
  }
  // function tp make active date inputs
  makeDateActive = (event) => {
    if (event) {
      this.isActive = !this.isActive
    } else {
      this.isActive = true
    }
  }
  // fuc to select date for search 
  selectSearchDate = (event: any) => {
    // we initialize here cz it first clict we get mouse event that initialize it to mouse even type
    // if we do like this  this.searchInputDate = event this method is just for to track user action
    this.searchInputDate1 = 'Date';
  }

  selectRange = (event: any) => {

    // console.log(" i am in");
    this.minDate = new Date();
    this.notify.emit(this.searchInputDates);

    // console.log(this.searchInputDates, "checkdate");

  }
  changeDate = (event: any) => {
    // debugger;
    // console.log(event, "evetss");
    this.minDate = new Date();
    this.notify.emit(this.searchInputDates);
    var searchPhrase;
    var date = this.searchInputDates;
    var interest;
    var city = "unknown";
    this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
  }  // date change pass value to search comp
  dateChange = () => {

    this.flag = 0;
  }


  // date between weekends ...
  dateOfWeekends = () => {
    var startOfWeek = moment().startOf('week').toDate();
    var endOfWeek = moment().endOf('week').toDate();
    // empty array first if there is any then push new dates
    this.searchInputDates = [];
    // this.searchInputDates.push(startOfWeek);
    this.searchInputDates.push(endOfWeek);
    // console.log(this.searchInputDates,"weekend");
    this.notify.emit(this.searchInputDates);
    var searchPhrase;
    var date = this.searchInputDates;
    var interest;
    var city = "unkown";
    this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
  }
  selectTodayDate = () => {
    let today = moment(new Date()).toDate();
    this.searchInputDates = [];
    this.searchInputDates.push(today);
    // console.log(this.searchInputDates,"today");
    this.notify.emit(this.searchInputDates);
    var searchPhrase;
    var date = this.searchInputDates;
    var interest;
    var city = "unkown";
    this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
  }
  selectTomorrowDate = () => {

    let tomorrow = moment(new Date()).add(1, 'days').toDate();
    this.searchInputDates = [];
    this.searchInputDates.push(tomorrow);
    // console.log(this.searchInputDates,"kal");
    this.notify.emit(this.searchInputDates);
    var searchPhrase;
    var date = this.searchInputDates;
    var interest;
    var city = "unknown";
    this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
    //....let yesterday = moment(new Date()).add(-1, 'days');
  }

}
