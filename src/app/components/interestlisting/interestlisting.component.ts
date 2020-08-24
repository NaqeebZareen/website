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
  show = true;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
  public head: any;
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
    @Inject(DOCUMENT) private doc, private meta: Meta, private title: Title, private seoService: SEOService, private activatedroute: ActivatedRoute, private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, private router: Router,
    private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();


    this.popActivity = new PopularList;
  }
  ngOnInit() {

    this.setPageTitle('InterestListing');
    this.createLinkForCanonicalURL();
    this.getPageTitle();
    // timer(3000).subscribe(x => {
    //   this.homesugested();
    // });
    this.activatedroute.params.subscribe(params => {
      this.urltitle = params["urltitle"];

      // we get string we need to convert to boolean
      // console.log(this.activityId);
      // if (String(params["ishosting"]).toLowerCase() === 'true') {
      //   this.isHosting = true;
      // } else {
      //   this.isHosting = false;
      // }

    });
    // console.log(this.urltitle);

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
  async homesugested(title: any) {
    if (title === "San Francisco" || title === 'London' || title === 'Austin' || title === 'New York' || title === 'Pittsburgh' || title === 'San Jose' || title === 'Silicon Valley' || title === 'Washington DC' || title === 'Chicago') {
      this.city = title;
      this.interest = null;
      var searchPhrase;
      var date;
      var interest = 'unknown';
      var city = this.city;
      this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
    }
    else {
      this.interest = title;
      var searchPhrase;
      var date;
      interest = this.interest;
      city = "unknown";
      this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
    }
    var access_token = localStorage.getItem('access_token');
    // var city = localStorage.getItem('city');

    this.srvActivityService.getActivitiesListing(this.city, this.interest).then(res => {
      // console.log(res);
      this.newlyAddedList = res['response'].data;
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

  ngAfterViewInit() {
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
