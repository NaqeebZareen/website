import { Component, OnInit, OnDestroy, ViewChild, AfterContentChecked, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventLog } from 'src/app/models/event-log';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { fnSuggestedInterest } from 'src/app/utilities/helper';
import { AccountService } from 'src/app/services/account/account.service';
import { takeUntil } from 'rxjs/operators';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { ActivityListComponent } from 'src/app/shared/activity-list/activity-list.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DateComponent } from 'src/app/shared/date/date.component';
// import { Options } from 'ng5-slider';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { SEOService } from '../../services/SEOService/seo.service';
// declare var $val: any;
declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
/**
 * search compoennt is used to search activities ....
 */
export class SearchComponent implements OnInit, OnDestroy {
  interestList1: any;
  obj: any;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  // props ....
  public searchInputText: string;
  public load: any;
  public searchInputDates: any;
  public searchInputDate: any;
  public searchInputCity: any = [];
  public searchInputInterest: any[] = [];
  public searchInputInterestIndex: any[] = [];
  public suggestedInterest: any;
  public page: string;
  public controller: string;
  public suggestedCities: any;
  public objIEventLog: IEventLog;
  public list: any;
  public list1: any;
  public pageTitle: any;
  public innerWidth: any;
  public result: any;
  public finlist: any = [];
  public checkr: any;
  public cityColorFlag: boolean; // pass as a input to suggestedCities component to take decision and change color
  // subject to unsubscibe from obserable

  public unsubscribe = new Subject<void>();
  // all props for ng5Slider
  value: number = 40;
  highValue: number = 60;
  // options: Options = {
  //   floor: 0,
  //   ceil: 100
  // };
  // .... ng5 silder  

  constructor(private seoService: SEOService, private meta: Meta, private title: Title, public datepipe: DatePipe, private activatedroute: ActivatedRoute, public router: Router, private srvAccountService: AccountService,
    private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService,) {
    this.objIEventLog = new IEventLog();
    this.load = 2;
  }
  // to acess child component prop,methods
  @ViewChild(ActivityListComponent, { static: true })
  activityListComponent: ActivityListComponent
  @ViewChild(DateComponent, { static: true })
  dateComponent: DateComponent

  ngOnInit() {

    this.setPageTitle('searchlisting');
    this.createLinkForCanonicalURL();
    this.getPageTitle();


    this.innerWidth = window.innerWidth;
    // console.log(innerWidth);
    if (this.innerWidth >= 700) {
      // console.log("i am in");
      this.itemsPerSlide = 5;
    }
    else if (this.innerWidth <= 699) {
      this.itemsPerSlide = 2;

    }


    this.load = 2;
    // here we communicating through services getting title text from header component search
    this.srvActivityService.change.subscribe(title => {
      this.searchInputText = title;
      this.selectedText(title);
    });
    this.srvActivityService.changeCity.subscribe(city => {
      this.searchInputCity = city;
      this.selectedCity(city);
    });
    // if no interest we push default to show on view
    if (this.searchInputInterest.length == 0) {
      // this.searchInputInterest.push("Interest");
      //  this.searchInputInterest.push("other");// default interest
    }
    this.cityColorFlag = true;
    // this.suggestedInterest = fnSuggestedInterest(); // return list helper fuc
    if (this.suggestedInterest === null) {
      // this.Interst();
    }
    // call to getCities fuc to get cities
    this.getCities();
    // receving data from home component
    this.searchInputInterestIndex = [];
    this.searchInputInterest = [];
    this.activatedroute.queryParams.subscribe(params => {

      if (params.date != null) {
        var result = Object.values(params.date); // date is an object, we want to extract values form object 
        this.searchInputDates = result;
      } else {
        this.searchInputDates = null;
      }
      if (params.city == "" || params.city == undefined) {
        this.searchInputCity = "";
      } else {
        this.searchInputCity = params.city;
      }

      // console.log(params.interest, "res");
      if (params.interestIndex != null && params.interest != "Interest") {
        this.searchInputInterestIndex = Object.values(params.interestIndex);
        this.searchInputInterest = Object.values(params.interest);
        // console.log(this.searchInputInterestIndex, "11");
      } else {
        this.searchInputInterest = Object.values(this.searchInputInterest);
        this.searchInputInterestIndex = Object.values(this.searchInputInterestIndex);
        // console.log(this.searchInputInterestIndex, "111");
      }
      this.searchInputText = params.title;

      // if not date then select current date
      if (this.searchInputDates != null) {
        this.dateFormateHelper();
      }
      this.searchInputInterest = this.searchInputInterest.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      // call to getActivities in activityListCompoennt
      // console.log(this.searchInputInterestIndex, "1");
      this.activityListComponent.getActivities(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
        this.searchInputDates, 20, 1);


    });
    // console.log(this.activityListComponent);


    this.deleteMsg("Interest");



    this.list1 = ["All", "Music & Concerts", "Family & Kids", "Health & Fitness", "Sightseeing & Tourism", "Arts & Performance", "Shopping & Fashion", "Books & hobbies", "Tech & workshops", "Food & festival", "Outdoor Activities", "Charity and Volunteer work", "Socialization & Networking", "Sports", "Politics", "Others"];
    // console.log(this.suggestedInterest);
    // console.log(this.list);

    var data = {
      "All": "1218",
      "others": "2",
      "Shopping & Fashion": "79",
      "Family & Kids": "27",
      "Socialization & Networking": "161",
      "Politics": "11",
      "music": "1",
      "Food & festival": "32",
      "Arts & Performance": "59",
      "Others": "515",
      "Sightseeing & Tourism": "15",
      "Outdoor Activities": "29",
      "Sports": "13",
      "Music & Concerts": "175",
      "Books & hobbies": "7",
      "Tech & workshops": "74",
      "Health & Fitness": "18"
    };
    // this.result = Object.entries(data);


    // for (let lis of this.result) {
    //   {
    //     console.log(lis[0], lis[1]);
    //   }

    // }
    this.getInterestIndexListing();
    // this.result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];


  }

  public selectedIndex: number = 0;
  // public index2 = 0;
  select(index: number) {
    this.selectedIndex = index;
  }

  getInterestIndexListing = () => {

    let city = localStorage.getItem("headercity");
    this.srvAccountService.getInterestIndexList(city).subscribe(res => {
      // console.log(res);
      this.checkr = "active";
      var fin = res['response'].data;
      this.result = Object.entries(fin);
      // console.log(this.result);
      // for (let ress of this.list1) {
      //   for (let res2 of this.result) {
      //     if (ress.substring(0, 3) === res2[0].substring(0, 3)) {
      //       // console.log(res2[1]);
      //       this.finlist.push(ress + '(' + res2[1] + ')');

      //     }

      //   }
      // }

    });

  }
  public tabIndex = 0;
  public index1 = 0;
  onTabClick(index) {
    // console.log(index);
    this.tabIndex = index;
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
      // this.suggestedInterest = this.list;
    });
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


  deleteMsg(removeElement: string) {
    const index: number = this.searchInputInterest.indexOf(removeElement);
    if (index !== -1) {
      this.searchInputInterest.splice(index, 1);
    }
  }
  // fuc get cities from backend
  getCities = () => {
    this.srvAccountService.getUKanTargetedCities().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.suggestedCities = res['response'].data['cities'];
    });
  }
  selectSearchWithoutInterest = () => {
    this.searchInputInterest.pop();
    this.searchInputInterestIndex.pop();
    this.activityListComponent.getActivities(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1)
  }
  // fuc to select from suggested interest category 
  selectSearchInterest = (event) => {


    this.searchInputInterestIndex = [];
    if (event === "All") {
      // event="others";
      this.searchInputInterestIndex = [];
    }
    else {
      this.searchInputInterestIndex.push(event);
    }



    this.activityListComponent.getActivities(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1);
  }
  // user choice city fnc ....
  selectedCity = (city: any) => {
    this.searchInputCity = city;
    // console.log(city)
    // let cities = [];
    // cities.push(this.searchInputCity);
    this.getInterestIndexListing();
    this.activityListComponent.getActivities(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1);
  }
  // typed text search
  selectedText = (text: any) => {
    // let cities = [];
    // cities.push(this.searchInputCity);
    this.activityListComponent.getActivities(text, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1);
  }
  // select date 
  selectSearchDate = (date: any) => {
    // console.log(date, "32");
    // date = this.datepipe.transform(date, 'yyyy-MM-dd');

    var searchInputDates = [];
    date.forEach(element => {
      date = this.datepipe.transform(element, 'yyyy-MM-dd');
      searchInputDates.push(date);
    });
    // console.log(searchInputDates.length);

    if (searchInputDates.length === 2) {
      this.searchInputDates = searchInputDates;
    }
    else {
      this.searchInputDates = searchInputDates;
    }
    // this.searchInputDates.push(date);
    // console.log(this.searchInputDates, "23");
    // debugger;
    // console.log(date, "i am date");


    // console.log(this.searchInputDates, "433");

    this.activityListComponent.getActivities(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
    this.objIEventLog.page = this.page + 'search';


    this.srvLoggingService.Event_SaveLogs(this.objIEventLog).pipe(takeUntil(this.unsubscribe)).subscribe(res => {

    }, error => console.log(error));

  }
  // date formate helper
  dateFormateHelper = () => {
    if (this.searchInputDates.length != 0) {

      // this.searchInputDate = moment(this.searchInputDate).format("DD MMM");
      this.searchInputDates.forEach(element => {
        this.searchInputDates.push(moment(element).format("YYYY-MM-DD"));
      });
      this.searchInputDates.shift();
      this.searchInputDates.shift();
    } else {
      // this.searchInputDate = moment(new Date()).format("DD MMM");
    }

  }




  // aaaaaa
  public itemsPerSlide: any;
  public singleSlideOffset = true;
  public noWrap = true;

  public slidesChangeMessage = '';

  public slides = [
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/3.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/5.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/6.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/7.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/8.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg' },
    { image: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg' }
  ];

  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

  // ngAfterViewInit() {
  //   $('#carouselExampleCaptions').carousel()
  // }
  function() {

    // $(".cata-sub-nav").on('scroll', function () {
    //   const $val = $(this).scrollLeft();

    //   if ($(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth) {
    //     $(".nav-next").hide();
    //   } else {
    //     $(".nav-next").show();
    //   }

    //   if ($val == 0) {
    //     $(".nav-prev").hide();
    //   } else {
    //     $(".nav-prev").show();
    //   }
    // });
    // console.log('init-scroll: ' + $(".nav-next").scrollLeft());
    // $(".nav-next").on("click", function () {
    //   $(".cata-sub-nav").animate({ scrollLeft: '+=460' }, 200);

    // });
    // $(".nav-prev").on("click", function () {
    //   $(".cata-sub-nav").animate({ scrollLeft: '-=460' }, 200);
    // });



  };



  ngDoCheck() {

    // if (this.checkr === 'active') {
    //   $('.start li button.active').removeClass('active');

    //   $("ul li button:eq(1)").addClass("active");

    //   this.checkr = "notactive";
    // }

  }
  ngAfterViewInit() {
    // var url = this.doc.URL;
    var url = "https://www.youcan.tech/search";
    // console.log(url);
    this.seoService.getMetaData(url).subscribe(res => {
      // console.log(res);
      // console.log(res['response'].data['meta'][0].meta_description);
      this.title.setTitle(res['response'].data['meta'][0].meta_title);
      this.meta.updateTag({ name: 'description', content: res['response'].data['meta'][0].meta_description });
      this.meta.updateTag({ name: 'content_box', content: res['response'].data['meta'][0].content_box });
    });

    // 
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

    // $('.start li button.active').removeClass('active');

    // $("ul li button:eq(1)").addClass("active");

  }
}
