import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterContentChecked
} from '@angular/core';
import { PopularActivity } from 'src/app/models/popular-activity';
import * as moment from 'moment';
import { IEventLog } from 'src/app/models/event-log';
import { Subject } from 'rxjs';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { Router } from '@angular/router';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { takeUntil } from 'rxjs/operators';
import { IAddToWishList } from 'src/app/models/api-request-model/add-to-wish-list';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { SocialService } from 'ngx-social-button';

@Component({
  selector: 'app-recmonded-card',
  templateUrl: './recmonded-card.component.html',
  styleUrls: ['./recmonded-card.component.css']
})
export class RecmondedCardComponent
  implements OnInit, OnDestroy, AfterContentChecked {

  public show: boolean;
  public activityStartTime: string;
  public activityTimePeriods: string;
  public page: string;
  public controller: string;
  public objIEventLog: IEventLog;
  public objAddToWishList: IAddToWishList;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
  public timeHours: any;
  public timePriod: any;
  public dayName: any;
  public monthName: any;
  public date: any;
  public urltitle: any;
  public urlCategory: any;
  public url1: any;
  public shareObj = {
    href: this.url1,
    hashtag: "#YOUCAN"
  };
  public url: any;
  constructor(private socialAuthService: SocialService, private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private router: Router, private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();
    this.objAddToWishList = new IAddToWishList();
  }

  @Input() activity: PopularActivity;

  ngOnInit() {
    // console.log(this.activity);
    if (this.activity.saved === undefined || this.activity.saved === null) {
      this.activity.saved = false;
    }
    if (this.activity.source_link === undefined) {
      this.activity.source_link = this.activity.source;
      // console.log(this.activity.source_link, "in");
    }
    var str = this.activity.picture;
    if (str != undefined) {
      var strFirstThree = str.substring(0, 3);
    }


    if (strFirstThree === "?v=") {
      this.activity.picture = null;
    }

    this.controller = "RecmoandedActivity"
    this.page = this.page = this.router.url;
    // call to IsPropertyExist to check whather to hide or show image
    this.IsPropertyExist();
    this.activityStartTime = moment(this.activity.start_time, 'HH:mm').format('h:mm');
    this.activityTimePeriods = moment(this.activity.start_time, 'HH:mm').format('A');

    this.activity.is_hosting;

    if (this.activity.is_hosting === undefined) {
      this.activity.is_hosting = false;
    }

    this.url1 = "https://www.youcan.tech/activity-details/" + this.activity.id;
    this.url = "https://www.youcan.tech/activity-details/" + this.activity.id;


    this.shareObj.href = this.url1;


    this.urltitle = this.activity.title.split(' ').slice(0, 4).join('-');
    this.urlCategory = this.activity.category.split(' ').join('-');
  }
  // add to wish list .. 




  public facebookSharing(shareObj: any) {
    // console.log(shareObj, "obj1");


    this.socialAuthService.facebookSharing(shareObj);
  }
  addToWishList = () => {

    const isLogin = this.srvJwthelperService.verifyToken();
    const email = localStorage.getItem('email');
    // console.log(isLogin, "token");
    if (isLogin) {
      this.objAddToWishList.activity_id = this.activity.id;
      this.objAddToWishList.is_wishlist = this.activity.is_wishlist;
      this.objAddToWishList.is_hosting = this.activity.is_hosting;


      // console.log(this.activity, "oh");
      // debugger;
      if (this.activity.saved) {
        // remove from wish list if wishlisted

        this.show = false;
        this.srvActivityService.addToWishlistEndpointDelete(this.activity.id).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {

            this.show = false;
            this.activity.saved = false;
          }, error => {
            this.activity.saved = true;
            this.show = false;
          });
      } else {
        // add to wish list 
        this.activity.saved = true;

        this.objAddToWishList.is_wishlist = true;
        this.srvActivityService.addToWishlistEndpoint(this.activity.id).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {

            this.show = true;
            this.activity.saved = true;

          }, error => {

            this.activity.saved = false;
            //console.log("error NQ");
            this.show = false;
          });
      }
      // track user 
      this.addEventLog('add to wishlist')
    } else {
      this.show = false;
      this.activity.is_wishlist = false;
      this.router.navigate(["/login"]);

    }



  }
  // get image if not then return default..
  getUserProfilePic = () => {
    if (this.activity.picture) {
      return this.activity.picture;
    } else {
      return (this.activity.picture =
        '../../../assets/default-placeholder-300x300.png');
    }
  }

  // fuc to track user actions .
  addEventLog = (action) => {
    this.objIEventLog.user_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);
    this.objIEventLog.user_ip = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.IP);
    this.objIEventLog.action = action;
    this.objIEventLog.category = 'button click';
    this.objIEventLog.city = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.CITY);
    this.objIEventLog.country = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.COUNTRY);
    this.objIEventLog.controller = this.controller;
    this.objIEventLog.session_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.SESSION_ID);
    this.objIEventLog.page = this.page;

    this.srvLoggingService.Event_SaveLogs(this.objIEventLog).pipe(takeUntil(this.unsubscribe)).subscribe(res => {

    }, error => console.log(error));

  }
  // if user not login we will get object without is_wishlist property so for that reason we check if not exist so that we
  // take descion whether to hide or show wishlist image
  IsPropertyExist = () => {
    if (this.activity.is_wishlist == undefined) {
      if (this.activity['is_wishlist']) {
        this.show = true;
      } else {
        this.show = false;
      }
    } else {
      this.show = false;
    }
  }
  // you have to tell angular that you updated the content after ngAfterContentChecked you can
  // else we will get error ExpressionChangedAfterItHasBeenCheckedError: if we call fuc not in ngafterC
  ngAfterContentChecked(): void {
    // this.activity.picture = this.getUserProfilePic();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  momentTimeformate = (start_time, start_date) => {

    this.timeHours = moment(start_time, "HH:mm").format("h:mm");
    this.timePriod = moment(start_time, "HH:mm").format("A");
    this.dayName = moment(start_date).format("EEEE");
    this.monthName = moment(start_date).format("MMMM");
    this.date = moment(start_date).format("DD");
  }


  mover = () => {
    var url = this.router.url.slice(0, 17);
    if (url === "/activity-details") {
      // console.log(this.router['navigationId'], "111");
      var send = 'https://www.youcan.tech/activity-details/' + this.urlCategory + '/' + this.urltitle + '/' + this.activity.id;
      // console.log(send);
      this.goToLink(send);
    }
    this.router.navigate(['/activity-details', this.urlCategory, this.urltitle, this.activity.id]);
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
