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
import { NewsList } from 'src/app/models/news-list';
import { IEventLog } from 'src/app/models/event-log';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { element } from 'protractor';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-newslisting',
  templateUrl: './newslisting.component.html',
  styleUrls: ['./newslisting.component.css']
})
export class NewslistingComponent implements OnInit {

  // public popularActivityList: PopularList[] = [];
  public popularNewsList: NewsList[] = [];
  public page: string;
  public popActivity: PopularList;
  public controller: string;
  public loadingFlag: boolean;
  public objIEventLog: IEventLog;

  show = true;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();


  constructor(private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, private router: Router,
    private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();

    this.popActivity = new PopularList;
  }


  ngOnInit() {


    // console.log("i am alive");
    this.controller = 'NewsListing';
    this.page = this.router.url;
    const isLogin = this.srvJwthelperService.verifyToken();

    var city = "San Francisco";
    var interest = "";
    var records_per_page = 8;

    var text;
    var page_no = 1;
    var token = localStorage.getItem("access_token");


    if (token === null || token === undefined) {
      timer(5000).subscribe(res => {
        this.srvActivityService.getNewsListing(records_per_page, text, city, page_no).subscribe(res => {
          // console.log(res, "i am res");
          if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
            this.popularNewsList = null;
            this.show = false;
            // console.log(" i am in");

          }
          else {
            this.popularNewsList = res['response'].data['news_data'];
            // this.window['prerenderReady'] = true;
            this.show = false;
          }

        });
      });
    }
    else {
      this.srvActivityService.getNewsListing(records_per_page, text, city, page_no).subscribe(res => {
        // console.log(res, "i am res");
        if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
          this.popularNewsList = null;
          this.show = false;
          // console.log(" i am in");

        }
        else {
          this.popularNewsList = res['response'].data['news_data'];
          this.show = false;
          // this.window['prerenderReady'] = true;
        }

      });
    }


    // if (this.show == true && this.popularNewsList == undefined) {


    //   this.show = false;

    // }




  }
  // fuc to track user actions .

  calTitleFromNewsService = (title) => {



    var city = localStorage.getItem('city');
    if (city === "Islamabad" || city === "Rawalpindi") {
      city = "San Francisco";
    }

    var interest = "";
    var records_per_page = 8;

    var text = title;
    var page_no = 1;
    this.show = true;
    this.popularNewsList = null;
    // this.checkResponce = true;
    this.srvActivityService.getNewsListing(records_per_page, text, city, page_no).subscribe(res => {



      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        this.popularNewsList = null;
        this.show = false;
        // console.log(" i am in");

      }
      else {
        this.popularNewsList = res['response'].data['news_data'];
        this.show = false;
      }
      // this.show = false;

    });

  }
  callCityFromNewsService = (city) => {

    var interest = "";
    var records_per_page = 8;

    var text;
    var page_no = 1;
    this.show = true;
    this.popularNewsList = null;
    this.srvActivityService.getNewsListing(records_per_page, text, city, page_no).subscribe(res => {

      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        this.popularNewsList = null;
        this.show = false;
        // console.log(" i am in");

      }
      else {
        this.popularNewsList = res['response'].data['news_data'];
        this.show = false;
      }

    });
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
    for (var i = 0; i < res.length; i++) {
      if (res[i] === val) {

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


  }

}
