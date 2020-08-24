import { Component, OnInit, OnDestroy, ViewChild, AfterContentChecked, AfterViewInit } from '@angular/core';
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
import { NewssearchlistingComponent } from 'src/app/shared/newssearchlisting/newssearchlisting.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DateComponent } from 'src/app/shared/date/date.component';
// import { Options } from 'ng5-slider';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { SEOService } from '../../services/SEOService/seo.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

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
  public pageTitle: any;
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
  @ViewChild(NewssearchlistingComponent, { static: true })
  newssearchlistingComponent: NewssearchlistingComponent
  @ViewChild(DateComponent, { static: true })
  dateComponent: DateComponent

  ngOnInit() {

    // console.log("news in");
    this.setPageTitle('searchlisting');
    this.createLinkForCanonicalURL();
    this.getPageTitle();



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
    this.suggestedInterest = fnSuggestedInterest(); // return list helper fuc
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
      this.newssearchlistingComponent.getNews(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
        this.searchInputDates, 20, 1);


    });
    // console.log(this.activityListComponent);


    this.deleteMsg("Interest");



    this.list = ["Music & Concerts", "Family & Kids", "Health & Fitness", "Sightseeing & Tourism", "Arts & Performance", "Shopping & Fashion", "Books & hobbies", "Tech & workshops", "Food & festival", "Outdoor Activities", "Charity and Volunteer work", "Socialization & Networking", "Sports", "Politics", "Others"];
    // console.log(this.suggestedInterest);
    // console.log(this.list);


  }
  public tabIndex = 0;
  onTabClick(index) {
    this.tabIndex = index;
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

  // fuc to select from suggested interest category 

  // user choice city fnc ....
  selectedCity = (city: any) => {
    this.searchInputCity = city;
    // console.log(city)
    // let cities = [];
    // cities.push(this.searchInputCity);
    this.newssearchlistingComponent.getNews(this.searchInputText, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1);
  }
  // typed text search
  selectedText = (text: any) => {
    // let cities = [];
    // cities.push(this.searchInputCity);
    this.newssearchlistingComponent.getNews(text, this.searchInputCity, this.searchInputInterestIndex,
      this.searchInputDates, 20, 1);
  }
  // select date 


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
  }

}
