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
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-newscardwithoutimg',
  templateUrl: './newscardwithoutimg.component.html',
  styleUrls: ['./newscardwithoutimg.component.css']
})
export class NewscardwithoutimgComponent implements OnInit {


  public realFakeCheaker: string;
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
  public newstotalhours: any;
  public urlCategory: any;
  public vote_percentage_positive: any;
  public vote_percentage_negative: any;
  constructor(private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private router: Router, private srvActivityService: ActivityService) {
    this.objIEventLog = new IEventLog();
    this.objAddToWishList = new IAddToWishList();
  }

  @Input() news: News;

  ngOnInit() {
    // console.log(this.news);
    if (this.news.positive_votes >= this.news.negative_votes && this.news.positive_votes >= this.news.unsure_votes) {
      this.realFakeCheaker = "real";
    }
    else if (this.news.negative_votes >= this.news.positive_votes && this.news.negative_votes >= this.news.unsure_votes) {
      this.realFakeCheaker = "fake";
    }
    else if (this.news.unsure_votes > this.news.positive_votes && this.news.unsure_votes >= this.news.negative_votes) {
      this.realFakeCheaker = "notsure";

    }
    // this.realFakeCheaker = "fake";
    var str = this.news.picture;
    if (str != undefined) {
      var strFirstThree = str.substring(0, 3);
    }
    if (strFirstThree === "?v=") {
      this.news.picture = null;
    }

    this.controller = "NewsLisitng"
    this.page = this.page = this.router.url;
    // call to IsPropertyExist to check whather to hide or show image
    this.IsPropertyExist();
    this.activityStartTime = moment(this.news.publication_date, 'HH:mm').format('h:mm');
    this.activityTimePeriods = moment(this.news.publication_date, 'HH:mm').format('A');

    var now = moment(new Date()); //todays date
    var end = moment(this.news.publication_date); // another date
    this.newstotalhours = now.diff(end, 'hours');
    // this.newstotalhours = this.newstotalhours.asDays();
    this.urltitle = this.news.title.split(' ').slice(0, 4).join('-');

  }


  addVoteToNews = () => {

    if (this.news.positive_voted === true) {

      this.srvActivityService.deleteUpVoteEndPoint(this.news.id).subscribe(res => {


        this.news.negative_percentage = res['response'].data[0].negative_percentage;
        this.news.negative_votes = res['response'].data[0].negative_votes;
        this.news.positive_percentage = res['response'].data[0].positive_percentage;
        this.news.positive_votes = res['response'].data[0].positive_votes;
        this.news.unsure_percentage = res['response'].data[0].unsure_percentage;
        this.news.unsure_votes = res['response'].data[0].unsure_votes;
      });
      return;
    }
    else if (this.news.positive_voted === null || this.news.positive_voted === false) {
      this.srvActivityService.addVoteToNewsEndPoint(this.news.id).subscribe(res => {
        this.news.negative_percentage = res['response'].data[0].negative_percentage;
        this.news.negative_votes = res['response'].data[0].negative_votes;
        this.news.positive_percentage = res['response'].data[0].positive_percentage;
        this.news.positive_votes = res['response'].data[0].positive_votes;
        this.news.unsure_percentage = res['response'].data[0].unsure_percentage;
        this.news.unsure_votes = res['response'].data[0].unsure_votes;
      });

    }



  }

  notSureVoteToNews = () => {

    if (this.news.unsure === true) {

      this.srvActivityService.deleteNotSureVoteEndPoint(this.news.id).subscribe(res => {
        this.news.unsure_percentage = res['response'].data[0].unsure_percentage;
        this.news.unsure_votes = res['response'].data[0].unsure_votes;
        this.news.negative_percentage = res['response'].data[0].negative_percentage;
        this.news.negative_votes = res['response'].data[0].negative_votes;
        this.news.positive_percentage = res['response'].data[0].positive_percentage;
        this.news.positive_votes = res['response'].data[0].positive_votes;
      });
      return;
    }
    else if (this.news.unsure === null || this.news.unsure === false) {
      this.srvActivityService.addNotSureVoteEndPoint(this.news.id).subscribe(res => {
        this.news.unsure_percentage = res['response'].data[0].unsure_percentage;
        this.news.unsure_votes = res['response'].data[0].unsure_votes;;
        this.news.negative_percentage = res['response'].data[0].negative_percentage;
        this.news.negative_votes = res['response'].data[0].negative_votes;
        this.news.positive_percentage = res['response'].data[0].positive_percentage;
        this.news.positive_votes = res['response'].data[0].positive_votes;
      });

    }
  }

  downVoteFromNews = () => {
    if (this.news.negative_voted === true) {
      this.srvActivityService.deleteDownVoteEndPoint(this.news.id).subscribe(res => {
        this.news.negative_percentage = res['response'].data[0].negative_percentage;
        this.news.negative_votes = res['response'].data[0].negative_votes;
        this.news.positive_percentage = res['response'].data[0].positive_percentage;
        this.news.positive_votes = res['response'].data[0].positive_votes;
        this.news.unsure_percentage = res['response'].data[0].unsure_percentage;
        this.news.unsure_votes = res['response'].data[0].unsure_votes;
      });
      return;
    }
    else if (this.news.negative_voted === null || this.news.negative_voted === false) {
      this.srvActivityService.downVoteOfNewsEndPoint(this.news.id).subscribe(res => {

        this.news.negative_percentage = res['response'].data[0].negative_percentage;
        this.news.negative_votes = res['response'].data[0].negative_votes;
        this.news.positive_percentage = res['response'].data[0].positive_percentage;
        this.news.positive_votes = res['response'].data[0].positive_votes;
        this.news.unsure_percentage = res['response'].data[0].unsure_percentage;
        this.news.unsure_votes = res['response'].data[0].unsure_votes;
      });
    }
  }

  // get image if not then return default..
  getUserProfilePic = () => {
    if (this.news.picture) {
      return this.news.picture;
    } else {
      return (this.news.picture =
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
    if (this.news.is_bookmarked == undefined) {
      if (this.news['is_wishlist']) {
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
    // console.log("in");
    var url = this.router.url.slice(0, 13);
    if (url === "/news-details") {
      // console.log(this.router['navigationId'], "111");
      var send = 'https://www.youcan.tech/news-details/' + this.urltitle + '/' + this.news.id;
      // console.log(send);
      this.goToLink(send);
    }
    this.router.navigate(['/news-details', this.urltitle, this.news.id]);
  }

  goToLink(url: string) {
    window.open(url);
  }
}
