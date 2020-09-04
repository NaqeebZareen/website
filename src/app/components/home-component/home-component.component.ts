import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { fnSuggestedInterest } from 'src/app/utilities/helper';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { Subject, from, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IEventLog } from 'src/app/models/event-log';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Constants } from 'src/app/models/Constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { PopularActivityListComponent } from 'src/app/shared/popular-activity-list/popular-activity-list.component';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { SEOService } from '../../services/SEOService/seo.service';
import { NewslistingComponent } from 'src/app/shared/newslisting/newslisting.component';
import { HomeSuggestedInterestComponent } from 'src/app/shared/home-suggested-interest/home-suggested-interest.component';
declare var $: any;
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})

/**
 * first component that load when user visit our website listing different activities, this page also include seach bar
 * 
 */
export class HomeComponent implements OnInit, OnDestroy {

  // props ....
  public listingView: boolean;
  public now: any;
  public searchInputText: string;
  public load: any;
  public minDate: any;
  public searchInputDates: Date[];
  public searchViewInputDates: Date[];
  public searchInputCity: string;
  public searchInputInterest: string[] = [];
  public searchInputInterestIndex: any[] = [];
  public suggestedInterest: any;
  public page: string;
  public controller: string;
  public suggestedCities: any;
  public objIEventLog: IEventLog;
  public interestList1;
  public pageTitle: any;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
  public obj;
  private list: string[] = [];
  public list1: any;

  // props for dateRange picker these all defualt props we got from their npm package page 
  initialDate = new Date();
  maxDate = new Date();
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(
    // private modalService: NgbModal,
    private seoService: SEOService, @Inject(DOCUMENT) private doc, private meta: Meta, private title: Title, public router: Router, private srvAccountService: AccountService, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();
    this.page = this.router.url;
    this.controller = "HomeComponent";
    // initialize daterange picker props all default configuration
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    // this.searchInputDates = [this.initialDate, this.maxDate];

    // for dissable previous dates
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    // for city dropdown
    this.load = 1;

  }


  @ViewChild(PopularActivityListComponent, { static: false })
  popularactivitylistcomponent: PopularActivityListComponent

  @ViewChild(NewslistingComponent, { static: false })
  newslistingcomponent: NewslistingComponent

  @ViewChild(HomeSuggestedInterestComponent, { static: false })
  homesugestedLatest: HomeSuggestedInterestComponent

  HomeSuggestedInterestComponent

  ngOnInit() {

    // console.log("why");
    this.setPageTitle('Home');
    this.createLinkForCanonicalURL();
    this.getPageTitle();

    this.load = 1;
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

    // for dateRange picker
    this.bsConfig = Object.assign({},
      {
        showWeekNumbers: false,
        containerClass: 'theme-green',
        rangeInputFormat: 'DD/MMM',


      });
    //......
    this.searchInputCity = "City";
    // if no interest we push default to show on view
    if (this.searchInputInterest.length == 0) {
      this.searchInputInterest.push("Interest");

    }


    this.getCities();
    this.listingView = false;
    this.srvActivityService.change.subscribe(title => {
      this.searchInputText = title;
      var city = null;
      if (title != null) {
        this.popularactivitylistcomponent.calTitleFromActivityService(title);
        this.newslistingcomponent.calTitleFromNewsService(title);

      }

    });

    this.srvActivityService.changeCity.subscribe(city => {

      this.searchInputCity = city
      var title = null;
      this.popularactivitylistcomponent.callCityFromActivityService(city);
      this.newslistingcomponent.callCityFromNewsService(city);
      this.homesugestedLatest.changeCityHeader(city);
    });



    this.list1 = ["All", "Music & Concerts", "Family & Kids", "Health & Fitness", "Sightseeing & Tourism", "Arts & Performance", "Shopping & Fashion", "Books & hobbies", "Tech & workshops", "Food & festival", "Outdoor Activities", "Charity and Volunteer work", "Socialization & Networking", "Sports", "Politics", "Others"];

  }

  submitUrl(interest: any) {
    // console.log(interest);
    interest = interest.split(' ').join('-');
    var res = interest.replace(/&/g, "and");
    // console.log(res);

    this.router.navigate(['/activities', res]);
  }
  setPageTitle(title: string) {
    this.seoService.setPageTitle(title);
  }
  getPageTitle() {
    this.pageTitle = this.seoService.getPageTitle();
  }
  createLinkForCanonicalURL() {
    this.seoService.createLinkForCanonicalURL();
  }
  async Interst() {
    this.srvAccountService.getInterestList().subscribe(res => {
      this.obj = res['response'].data;
      // console.log(this.obj[0]);
      for (let ob in this.obj) {
        this.interestList1 = this.obj[ob];
        break;
      }
      for (let es of this.interestList1) {
        this.list.push(es.interest_name);
      }
      this.suggestedInterest = this.list;
    });
  }


  eventHandler = () => {

  }
  getFormatedDate = () => {
  }


  selectRange = (event) => {

  }


  // fuc to select city from dropDown
  selectSearchCity = (city: any) => {
    this.searchInputCity = city;
    this.addEventLog('city selected'); // these event paramters name will be change ,i don't about this ,temporaray
  }

  // fuc to select from suggested interest category 
  selectSearchInterest = (event) => {
    // console.log(this.suggestedInterest);
    for (var i = 0; i < this.suggestedInterest.length; i++) {
      if (this.suggestedInterest[i] === event) {
        // console.log(event);
        // console.log(i);
        this.searchInputInterestIndex.push(i);
      }
    }
    // console.log(event);
    this.searchInputInterest.push(event);
    this.addEventLog('interest selected');
  }

  // fuc get cities from backend
  getCities = () => {
    this.srvAccountService.getUKanTargetedCities().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.suggestedCities = res['response'].data['cities'];
    });
  }
  // navigate to search component to search desired contents of user
  search = () => {
    // this.searchInputDate = moment(this.searchInputDate).format("YYYY-MM-DD");

    if (this.searchInputCity === "City") {
      this.searchInputCity = "";
    }
    if (this.searchInputDates == null) {
      this.searchInputDates = [this.initialDate, this.maxDate];
    }

    this.router.navigate(["/search"], {
      queryParams: {
        interestIndex: this.searchInputInterestIndex,
        interest: this.searchInputInterest,
        date: this.searchInputDates,

        city: this.searchInputCity,
        title: this.searchInputText
      },
      queryParamsHandling: "merge"
    });
    this.deleteMsg("Interest");
    var searchPhrase = this.searchInputText;
    var date = this.searchInputDates;
    var interest = this.searchInputInterest;

    var city = this.searchInputCity;
    this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
  }

  deleteMsg(removeElement: string) {
    const index: number = this.searchInputInterest.indexOf(removeElement);
    if (index !== -1) {
      this.searchInputInterest.splice(index, 1);
    }
  }
  // fuc to track user actions 
  addEventLog = (action) => {
    this.objIEventLog.user_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);
    this.objIEventLog.user_ip = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.IP);
    this.objIEventLog.action = action;
    this.objIEventLog.category = 'click select';
    this.objIEventLog.city = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.CITY);
    this.objIEventLog.country = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.COUNTRY);
    this.objIEventLog.controller = this.controller;
    this.objIEventLog.session_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.SESSION_ID);
    this.objIEventLog.page = this.page + 'home';

    this.srvLoggingService.Event_SaveLogs(this.objIEventLog).pipe(takeUntil(this.unsubscribe)).subscribe(res => {

    }, error => console.log(error));

  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  navigateToSearchPage = () => {


    this.router.navigate(['/search']);

  }
  navigateToNewsPage = () => {


    this.router.navigate(['/news']);

  }

  ngAfterViewInit() {



    $('.start li button.active').removeClass('active');

    // $("ul li button:eq(1)").addClass("active");

    $('.start').on('click', '.nav-item', function () {

      $('.start li button.active').removeClass('active');
      $(this).addClass('active');
    });


    $(".cata-sub-nav").on('scroll', function () {
      const $val = $(this).scrollLeft();

      if ($(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth) {
        $(".nav-next").hide();
      } else {
        $(".nav-next").show();
      }

      if ($val == 0) {
        $(".nav-prev").hide();
      } else {
        $(".nav-prev").show();
      }
    });
    // console.log('init-scroll: ' + $(".nav-next").scrollLeft());
    $(".nav-next").on("click", function () {
      $(".cata-sub-nav").animate({ scrollLeft: '+=120' }, 200);

    });
    $(".nav-prev").on("click", function () {
      $(".cata-sub-nav").animate({ scrollLeft: '-=120' }, 200);
    });



    // var url = this.doc.URL;
    var url = "https://www.youcan.tech/";
    // console.log(url);
    this.seoService.getMetaData(url).subscribe(res => {
      // console.log(res);
      // console.log(res['response'].data['meta'][0].meta_description);
      this.title.setTitle(res['response'].data['meta'][0].meta_title);
      this.meta.updateTag({ name: 'description', content: res['response'].data['meta'][0].meta_description });
      this.meta.updateTag({ name: 'content_box', content: res['response'].data['meta'][0].content_box });
    });
  }
}
