import { Component, OnInit, AfterViewInit, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { IActivityRequestBody } from 'src/app/models/api-request-model/acitvity-list';
import { INewsRequestBody } from 'src/app/models/news-search-list'
import * as moment from 'moment';
import { PopularActivity } from 'src/app/models/popular-activity';
import { empty, timer, from } from 'rxjs';
import { time } from 'console';
import { NewsList } from 'src/app/models/news-list';
@Component({
  selector: 'app-newssearchlisting',
  templateUrl: './newssearchlisting.component.html',
  styleUrls: ['./newssearchlisting.component.css']
})
export class NewssearchlistingComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (this.bottomReached()) {
      this.getMoreActivities();
    }
  }
  // ..props....
  public objNewsRequest: INewsRequestBody;
  public isNeedToInitializeAgain: boolean = true;// decison maker ,help weather to initialize objActivityRequestHold again or not
  // this prop objActivityRequestHold will hold request boy came from  any componet ,untill user is on search page ,it will help if user want 
  // to load more activities 
  public objNewsRequestHold: INewsRequestBody;
  public object: any;
  public loading: number = 0;
  public totalActivities: any;
  public check: any;
  public totalnumber: any;
  public previous: any;
  public activityList: PopularActivity[] = [];
  public listOfActivities: PopularActivity;
  public check1: any;
  constructor(private router: Router, private srvJwthelperService: JwtHelper,
    private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService,) {
    this.objNewsRequest = new INewsRequestBody();
    this.objNewsRequestHold = new INewsRequestBody();

  }

  ngOnInit() {

    if (this.objNewsRequest.cities === null) {
      this.check1 = 1;
      this.loading = 0;
    }

  }


  getNews = (title: any, cities: any, interests: any, date_from: any, size: any, offset: any) => {


    this.loading = 1;

    this.objNewsRequest.cities = [cities];

    this.objNewsRequest.title = title;
    this.objNewsRequest.records_per_page = size;
    this.objNewsRequest.page_no = offset;
    this.isNeedToInitializeAgain = true;
    // this is just for ,if we get route parameters ,get data on base of these pramaters next if want to load more ,so we
    // hold that object for little time ,to click more button get more and change some parameters like size and  offset
    // 
    if (this.isNeedToInitializeAgain) {
      this.initializeObj(this.objNewsRequest)
    }
    this.isNeedToInitializeAgain = false;
    // console.log(this.objActivityRequest, "check date");
    this.activities(this.objNewsRequest);
  }

  // load more activities 
  getMoreActivities = () => {
    this.objNewsRequest.page_no = this.objNewsRequest.page_no + 1;
    this.moreActivities(this.objNewsRequest);

  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
  // get more activities add with current
  moreActivities = (data: INewsRequestBody) => {

    var city = data.cities;
    var interest = "";
    var records_per_page = 20;

    var text = data.title;
    var page_no = data.page_no;
    this.srvActivityService.getNewsListing(records_per_page, text, city, page_no).subscribe(res => {
      // console.log(res);
      if (res['response'].data['no_of_records'] === 0) {
        // this.check = 1;
        this.loading = 0;
      }
      else {
        res['response'].data['news_data'].forEach(element => {
          this.activityList.push(element);

        });
      }
    });
  }

  // get activities 
  activities = (data: INewsRequestBody) => {

    this.loading = 1;
    this.check = 0;
    this.activityList = null;
    // console.log(data.cities);
    var city = data.cities;
    // console.log(city);
    var interest = "";
    var records_per_page = 20;
    var page_no = data.page_no;
    var text = data.title;
    this.srvActivityService.getNewsListing(records_per_page, text, city, page_no).subscribe(res => {


      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        this.activityList = null;
        this.loading = 0;
        this.check = 1;
        // console.log(" i am in");

      }
      else {
        this.activityList = res['response'].data['news_data'];

        this.loading = 0;
        // this.window['prerenderReady'] = true;
      }



    });


  }
  // fuc initialize object
  initializeObj = (data: INewsRequestBody) => {

    this.objNewsRequestHold.cities = data.cities;
    // data.date_from.forEach(element => {
    //   this.objActivityRequestHold.date_from.push(element);
    // });
    // this.objActivityRequestHold.date_from = data.date_from;
    // this.objActivityRequestHold.interests = data.interests;
    this.objNewsRequestHold.title = data.title;
    this.objNewsRequestHold.records_per_page = data.records_per_page;
    this.objNewsRequestHold.page_no = data.page_no;
  }
  ngAfterViewInit(): void {

  }

}
