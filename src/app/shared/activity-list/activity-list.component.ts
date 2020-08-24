import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { IActivityRequestBody } from 'src/app/models/api-request-model/acitvity-list';
import * as moment from 'moment';
import { PopularActivity } from 'src/app/models/popular-activity';
import { empty, timer, Subject } from 'rxjs';
import { time } from 'console';
import { takeUntil } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
/**
 * this component is currently used in search compnent to show search result 
 */
export class ActivityListComponent implements OnInit, AfterViewInit {

  @HostListener('window:scroll', ['$MouseEvent'])
  onWindowScroll($MouseEvent) {
    // event.preventDefault();
    // event.stopPropagation();
    // console.log(this.bottomReached());
    if (this.bottomReached()) {
      this.getMoreActivities();

    }
  }
  // ..props....
  public objActivityRequest: IActivityRequestBody;
  public isNeedToInitializeAgain: boolean = true;// decison maker ,help weather to initialize objActivityRequestHold again or not
  // this prop objActivityRequestHold will hold request boy came from  any componet ,untill user is on search page ,it will help if user want 
  // to load more activities 
  public objActivityRequestHold: IActivityRequestBody;
  public object: any;
  public loading: number = 0;
  public totalActivities: any;
  public check: any;
  public totalnumber: any;
  public previous: any;
  public activityList: PopularActivity[] = [];
  public listOfActivities: PopularActivity;
  public check1: any;
  public unsubscribe = new Subject<void>();
  constructor(private router: Router, private srvJwthelperService: JwtHelper,
    private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService,) {
    this.objActivityRequest = new IActivityRequestBody();
    this.objActivityRequestHold = new IActivityRequestBody();

  }

  ngOnInit() {
    // console.log(this.objActivityRequest.cities);
    if (this.objActivityRequest.city === null) {
      this.check1 = 1;
      this.loading = 0;
    }

    // timer(1000).subscribe(x => {
    //   console.log(this.activityList);
    // });
    // window.addEventListener('scroll', this.scroll, true);
  }
  scroll = (): void => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // console.log("run");
      // this.getMoreActivities();
    }
  }


  getActivities = (title: any, city: any, categories: any, date_range: any, size: any, offset: any) => {

    // console.log(title, "1");

    this.loading = 1;
    this.objActivityRequest.date_range = [];// if we not empty array it will push date on every call ,that will increse size
    this.objActivityRequest.city = [city];
    if (date_range === null || date_range === []) {
      // console.log("i am in")
      // delete this.objActivityRequest.date_from;
    }
    else {
      this.objActivityRequest.date_range = date_range;
    }

    this.objActivityRequest.categories = categories; // array of interest
    this.objActivityRequest.title = title;
    this.objActivityRequest.records_per_page = size;
    this.objActivityRequest.page_no = offset;
    this.isNeedToInitializeAgain = true;
    // this is just for ,if we get route parameters ,get data on base of these pramaters next if want to load more ,so we
    // hold that object for little time ,to click more button get more and change some parameters like size and  offset
    // 
    if (this.isNeedToInitializeAgain) {
      this.initializeObj(this.objActivityRequest)
    }
    this.isNeedToInitializeAgain = false;
    // console.log(this.objActivityRequest, "check date");
    this.activities(this.objActivityRequest);
  }

  // load more activities 
  getMoreActivities = () => {
    // console.log("what happen");
    // if (this.objActivityRequest.records_per_page == null) {
    //   this.objActivityRequest.records_per_page = 20;
    // }
    // else {
    //   this.objActivityRequest.records_per_page = this.objActivityRequest.records_per_page + 20;
    // }
    this.objActivityRequest.page_no = this.objActivityRequest.page_no + 1;
    // if (this.objActivityRequest.date_range === null || this.objActivityRequest.date_range === [] || this.objActivityRequest.date_range === undefined ) {
    //   console.log(this.objActivityRequest);

    // }
    // else {
    //   this.objActivityRequest.date_range = this.objActivityRequest.date_range;
    // }

    this.moreActivities(this.objActivityRequest);

  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  bottomReached() {
    // console.log(document.body.offsetHeight);
    // console.log(window.innerHeight + window.scrollY);
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
  // get more activities add with current
  moreActivities = (data: IActivityRequestBody) => {

    // debugger;
    // event.stopPropagation();
    // console.log(event);
    this.srvActivityService.getResultEndpoint(data).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      // console.log("null2")

      res['response'].data['activities'].forEach(element => {
        this.activityList.push(element);
      });

    }), error => {
      // console.log(error);
    };
  }

  // get activities 
  activities = (data: IActivityRequestBody) => {
    // console.log(data.cities);
    // debugger;
    this.check = 0;
    // data.is_new_api = true;

    this.srvActivityService.getResultEndpoint(data).subscribe(res => {
      this.activityList = null;
      // console.log(data);
      // console.log(res['response'].data)
      this.check = 0;
      this.loading = 0;
      this.totalnumber = 10;
      // console.log(res);
      // if(res === null && this.activityList.length <= 20)
      // {
      //   this.check=0;
      // }
      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        // console.log(this.activityList.length);
        // this.activityList.length

        this.check = 1;
      }
      else {
        this.totalActivities = res['response'].data['activities'];
        this.activityList = this.totalActivities;

        // console.log(this.activityList);

      }


    });



  }
  // fuc initialize object
  initializeObj = (data: IActivityRequestBody) => {

    this.objActivityRequestHold.city = data.city;
    // data.date_from.forEach(element => {
    //   this.objActivityRequestHold.date_from.push(element);
    // });
    this.objActivityRequestHold.date_range = data.date_range;
    this.objActivityRequestHold.categories = data.categories;
    this.objActivityRequestHold.title = data.title;
    this.objActivityRequestHold.records_per_page = data.records_per_page;
    this.objActivityRequestHold.page_no = data.page_no;
  }
  ngAfterViewInit(): void {
    // $(window).scroll(() => {
    //   if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    //     console.log("reeeee");

    //   }
    // });

  }

}