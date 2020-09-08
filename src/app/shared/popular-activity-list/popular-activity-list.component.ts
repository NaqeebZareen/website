import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopularList } from 'src/app/models/popular-list';
import { IEventLog } from 'src/app/models/event-log';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { element } from 'protractor';
import { IActivityRequestBody } from 'src/app/models/api-request-model/acitvity-list';
import 'rxjs/add/operator/retry';
import { title } from 'process';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-popular-activity-list',
  templateUrl: './popular-activity-list.component.html',
  styleUrls: ['./popular-activity-list.component.css']
})
/**
 * component is used in homeComponent to show suggested random ,and suggested activities
 */
export class PopularActivityListComponent implements OnInit, OnDestroy {

  public objActivityRequest: IActivityRequestBody;
  public popularActivityList: PopularList[] = [];
  public page: string;
  public popActivity: PopularList;
  public controller: string;
  public loadingFlag: boolean;
  public objIEventLog: IEventLog;
  public checkResponce: boolean;

  public went_wrong: boolean;


  show = true;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();

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
  constructor(private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, private router: Router,
    private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();
    this.objActivityRequest = new IActivityRequestBody();
    this.popActivity = new PopularList;
    this.checkResponce = false;
    this.went_wrong = false;
  }


  ngOnInit() {
    // console.log("inji");
    // console.log(this.checkResponce, "111");
    // if (this.checkResponce === undefined) {
    //   this.checkResponce = false;
    // }
    this.controller = 'PopularListComponent';
    this.page = this.router.url;
    const isLogin = this.srvJwthelperService.verifyToken();



    // let data: IActivityRequestBody;


    // this.
    // this.objActivityRequest.title = "";
    this.objActivityRequest.page_no = 1;
    this.objActivityRequest.records_per_page = 8;
    this.objActivityRequest.is_new_api = true;
    this.objActivityRequest.city = [];
    // this.objActivityRequest.date_range.push(formatDate(new Date(), 'yyyy-MM-dd', 'en'));

    var token = localStorage.getItem("access_token");
    if (token === null || token === undefined) {
      timer(5000).subscribe(res => {
        this.srvActivityService.getResultEndpoint(this.objActivityRequest).subscribe(res => {
          // console.log(res['response'].data['activities']);
          if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
            this.popularActivityList = null;
            this.show = false;
            // console.log(" i am in");

          }
          else {
            this.popularActivityList = res['response'].data['activities'];
            this.show = false;
            // this.window['prerenderReady'] = true;
          }
        });
      });

    }
    else {
      this.srvActivityService.getResultEndpoint(this.objActivityRequest).subscribe(res => {
        // console.log(res['response'].data['activities']);
        // debugger;
        if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
          this.popularActivityList = null;
          this.show = false;
          // console.log(" i am in", res);

        }
        else {
          this.popularActivityList = res['response'].data['activities'];
          this.show = false;
          // this.window['prerenderReady'] = true;
          // console.log(" i am in", res);

        }
      }, err => {
        // console.log(err['status']);
        if (err['status'] === 404 || err['status'] === 503) {
          // console.log("something went wrong");
          this.show = false;
          this.went_wrong = true;
        }
      },

      );
    }


    // if (this.show == true && this.popularActivityList == undefined) {


    //   this.show = false;

    // }

    // console.log(this.popularActivityList);
  }

  // fuc to track user actions .

  callCityFromActivityService = (city) => {

    this.show = true;
    this.popularActivityList = null;
    this.checkResponce = true;

    // console.log(this.show);
    this.objActivityRequest.city = [city];


    this.srvActivityService.getResultEndpoint(this.objActivityRequest).subscribe(res => {

      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        this.popularActivityList = null;
        this.show = false;
        // console.log(" i am in");

      }
      else {
        this.popularActivityList = res['response'].data['activities'];
        this.show = false;
      }



    });

    // if (this.show == true && this.popularActivityList == undefined) {

    //   this.show = false;

    // }
  }
  calTitleFromActivityService = (title) => {

    this.show = true;
    this.popularActivityList = null;
    this.checkResponce = true;
    this.objActivityRequest.title = title;
    // debugger;
    // this.objActivityRequest.date_range.push(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.srvActivityService.getResultEndpoint(this.objActivityRequest).subscribe(res => {
      // console.log(res.headers['status'], "01");

      // console.log(res);
      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        this.popularActivityList = null;
        this.show = false;
        // console.log(" i am in");

      }
      else {
        this.popularActivityList = res['response'].data['activities'];
        this.show = false;
      }
      // this.show = false;

    });

    // if (this.show == true && this.popularActivityList == undefined) {


    //   this.show = false;

    // }

  }
  ngDoCheck() {

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

  navigateToSearchPage = (val: string) => {
    let searchInputInterest: string[] = [];
    let searchInputInterestIndex: any[] = [];
    let res = localStorage.getItem('interest');
    res = JSON.parse(res);
    // console.log(res);
    // let word = val.split(' ')[0];
    for (var i = 0; i < res.length; i++) {
      if (res[i] === val) {
        // console.log(event);
        // console.log(i);
        searchInputInterestIndex.push(i);
      }
    }
    searchInputInterest.push(val);

    this.router.navigate(['/search'], {
      queryParams: {
        interest: searchInputInterest,
        interestIndex: searchInputInterestIndex
      },
      queryParamsHandling: "merge"
    });
    // console.log(searchInputInterestIndex, "2");

  }

  ngAfterViewInit() {
    // console.log
  }
}
