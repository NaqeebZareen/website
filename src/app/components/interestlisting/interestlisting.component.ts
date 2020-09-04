import { Component, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
// import { DOCUMENT } from '@angular/common';

import { ActivityListComponent } from 'src/app/shared/activity-list/activity-list.component';
import { AccountService } from 'src/app/services/account/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointFactoryService } from 'src/app/services/endpontFactory/endpoint-factory.service';
import { PopularList } from 'src/app/models/popular-list';
import { IEventLog } from 'src/app/models/event-log';
import { Subject, timer } from 'rxjs';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { takeUntil } from 'rxjs/operators';
import { SEOService } from '../../services/SEOService/seo.service';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-interestlisting',
  templateUrl: './interestlisting.component.html',
  styleUrls: ['./interestlisting.component.css']
})
export class InterestlistingComponent implements OnInit {

  public newlyAddedList: PopularList[] = [];
  public page: string;
  public popActivity: PopularList;
  public controller: string;
  public loadingFlag: boolean;
  public objIEventLog: IEventLog;
  public urltitle: any;
  public city: any;
  public interest: any;
  public pageTitle: any;
  public check: any;
  show = true;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
  public head: any;
  public suggestedCities: any[];
  public activitiesName = {
    sports: 'Sports',
    music: 'Music and Concerts',
    adventure: 'Outdoor Activities',
    family: 'Family and Kids',
    health: 'Health and Fitness',
    business: 'Socialization and Networking',
    tourism: 'Sightseeing and Tourism',
    autos: 'Books and Hobbies',
    gaming: 'Books and Hobbies ',
    arts: 'Arts and Performance',
    fashion: 'Shopping and Fashion',
    tech: 'Tech and Workshops',
    food: 'Food and Festival',
    politics: 'Politics',
    charity: 'Charity and Volunteer work'
  };
  constructor(
    @Inject(DOCUMENT) private doc, private srvAccountService: AccountService, private meta: Meta, private title: Title, private seoService: SEOService, private activatedroute: ActivatedRoute, private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, private router: Router,
    private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();


    this.popActivity = new PopularList;
    this.check = 0;
  }
  ngOnInit() {
    this.getCities();
    this.setPageTitle('InterestListing');
    this.createLinkForCanonicalURL();
    this.getPageTitle();
    // timer(3000).subscribe(x => {
    //   this.homesugested();
    // });
    // console.log(this.router.url);
    var str = this.router.url;
    str = str.slice(str.lastIndexOf('/') + 1);
    // console.log(str);
    str = str.replace(/-|\s/g, " ");
    str = str.replace(/and/g, "&");
    // console.log(str);
    this.urltitle = str;

    this.homesugested(this.urltitle);
    this.head = this.urltitle;
    this.head = this.head.split('-').join(' ');




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
  async homesugested(category: any) {

    var access_token = localStorage.getItem('access_token');

    var city;
    var records_per_page = 40;
    var page_no = 1;
    city = localStorage.getItem("headercity");

    if (city === null || city === undefined) {
      city = "San Francisco";
    }
    var categories = [];
    categories.push(category);
    this.srvActivityService.getResultEndPointSecond(categories, city, records_per_page, page_no).subscribe(res => {
      // console.log(res);
      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        // console.log(this.activityList.length);
        // this.activityList.length

        this.check = 1;
      }
      else {
        this.newlyAddedList = res['response'].data['activities'];
      }

      // for (let z of this.newlyAddedList) {
      //   console.log(z);
      // }
      // console.log(this.newlyAddedList);
    });
  }
  // fuc to track user actions .
  navigateToSearchPage = () => {
    this.router.navigate(['/search']);

  }

  moveToCityListing = (city: any) => {
    // Pittsburgh
    city = city.split(' ').join('-');
    this.router.navigate([this.router.url, city]);
  }
  addEventLog = (action) => {
    this.objIEventLog.user_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);
    this.objIEventLog.user_ip = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.IP);
    this.objIEventLog.action = action;
    this.objIEventLog.category = 'Button click';
    this.objIEventLog.city = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.CITY);
    this.objIEventLog.country = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.COUNTRY);
    this.objIEventLog.controller = this.controller;
    this.objIEventLog.session_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.SESSION_ID);
    this.objIEventLog.page = this.page;

    this.srvLoggingService.Event_SaveLogs(this.objIEventLog).pipe(takeUntil(this.unsubscribe)).subscribe(res => {

    }, error => console.log(error));

  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getCities = () => {
    this.srvAccountService.getUKanTargetedCities().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      var lis = res['response'].data['cities'];

      this.suggestedCities = [];
      lis.forEach(element => {
        // console.log(element.name);
        this.suggestedCities.push(element.name);
        // console.log(this.suggestedCities);
      });

    });
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



    var url = this.doc.URL;
    // var url = "https://www.youcan.tech/activities/Food-&-festival";
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
