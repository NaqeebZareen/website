import { Component, OnInit, OnDestroy, HostListener, TemplateRef, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
// third party 
import * as moment from 'moment';
//....
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { ActivityDetail } from 'src/app/models/activity-detail';
import { IAddToWishList } from 'src/app/models/api-request-model/add-to-wish-list';
import { Subject, timer } from 'rxjs';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { takeUntil, timestamp, filter, pairwise } from 'rxjs/operators';
import { IEventLog } from 'src/app/models/event-log';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { BsModalRef } from 'ngx-bootstrap/modal';
import { PaymentService } from 'src/app/services/PaymentService/payment-service.service';
import { HostingService } from 'src/app/services/hostingFactory/hosting.service';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { Title, Meta } from '@angular/platform-browser';
import {
  SocialService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "ngx-social-button";
import { PopularList } from 'src/app/models/popular-list';
import { SEOService } from '../../services/SEOService/seo.service';
import { promise } from 'protractor';
import { async } from '@angular/core/testing';
// import * as firebase from 'firebase';
// const analytics = firebase.analytics();
// declare var prerenderReady: any;
// const prerenderReady = require("prerenderReady");
@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})

/**
 * this component is use for to show activity detail to user ,a user can also purchase taket from here ,on clicking get ticket 
 * button if user is authenticated user ,we making visible that button to user ,if activity is hosted from our website ,else 
 * navigation to their website
 */
export class ActivityDetailsComponent implements OnInit, OnDestroy {

  // props
  public showImage: boolean;
  public page: string;
  public controller: string;
  public activityId: string; // recived datez from other componen
  public isHosting: boolean; // from other components
  public objActivityDetail: ActivityDetail;
  public objAddToWishList: IAddToWishList;
  public objIEventLog: IEventLog;
  public LoadingFlag = 1;
  public lat: any;
  public lng: any;
  public userId: any;
  public timeHours: any;
  public timePriod: any;
  public dayName: any;
  public monthName: any;
  public date: any;
  public loading: boolean;
  // activity buy ticket props
  public activityBuyTicketProcessStep: number;
  public activityBuyTicketProcesClose: number;
  public is_hosting: string;
  public activityNumberTickets: number;
  public activitySingleTicketPrice: number;
  public user_id: string;
  public ativityBuyTicketResult: any;
  public stripCardHolderName: string;
  public stripCardHolderNumber: string;
  public stripCardExpYear: string;
  public stripCardExpMonth: string;
  public stripCardExpCVV: string;
  public elementType: "url" | "canvas" | "img" = "url";
  public cardHolderName: string;
  public delayTOmoveNext: number;
  public show: boolean;
  // .... end ....
  // .... class props
  public registerActivityForm: FormGroup;
  public submitted = false;
  public url1: any;
  // .... props end
  // modalRef: BsModalRef;
  // ..... end ...................
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
  public showSocialBtn: boolean;
  @Input() public showSearchBar: boolean;
  public text1: string;
  public isCopied1: boolean;
  public startTime: any;
  public endTime: any;
  public totaltime: any;
  public url: any;
  public myTitle: any;
  public newlyAddedList: PopularList[] = [];
  // public show: boolean;
  public shareObj = {
    href: this.url1,
    hashtag: "#YOUCAN"
  };
  public previousName: any;
  public previousURL: any;
  public currentName: any;
  public currentURL: any;
  public routExist: boolean;
  public pageTitle: any;
  @Input()
  get foo() {
    // Dynamic generation of the text to put in the clipboard:
    return this.text1
  }
  constructor(@Inject(DOCUMENT) private doc, private seoService: SEOService, private meta: Meta, private title: Title, private socialAuthService: SocialService, private _clipboardService: ClipboardService,

    private activatedroute: ActivatedRoute, private router: Router, private srvJwthelperService: JwtHelper,
    private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService, private _location: Location, private formBuilder: FormBuilder,
    private srvPaymentService: PaymentService, private srvHostingService: HostingService) {
    this.objActivityDetail = new ActivityDetail();
    this.objIEventLog = new IEventLog();
    this.objAddToWishList = new IAddToWishList();
    this.showSearchBar = false;
    this.startTime = performance.now();
    this.loading = true;
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
  public facebookSharing(shareObj: any) {
    // console.log(shareObj, "obj1");


    this.socialAuthService.facebookSharing(shareObj);
  }
  public twitterSharing(shareObj: any) {
    // console.log(shareObj, "obj1");

    this.socialAuthService.facebookSharing(shareObj);
  }
  open(content) {
    // this.modalService.open(content);
  }
  ngOnInit() {


    this.setPageTitle('ActivityDetail');
    this.createLinkForCanonicalURL();
    this.getPageTitle();

    this.loginAnalytics("activity_opened");

    this._clipboardService.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
        alert('copy success!');
      }
    });
    this.showSearchBar = false;
    this.showImage = false;
    this.loading = true;

    this.activatedroute.params.subscribe(params => {
      this.activityId = params["activityId"];
      // we get string we need to convert to boolean
      // console.log(this.activityId);
      if (String(params["ishosting"]).toLowerCase() === 'true') {
        this.isHosting = true;
      } else {
        this.isHosting = false;
      }

    });

    var token = localStorage.getItem("access_token");
    if (token === null || token === undefined) {
      timer(5000).subscribe(res => {

        this.srvActivityService.getActivityDetailUserEndpoint(this.activityId).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            this.loading = false;
            // console.log(res);
            // console.log('ssss1', res['response'].data[0]);


            // console.log(this.loading);
            this.objActivityDetail = res['response'].data['activity_detail'];
            this.newlyAddedList = res['response'].data['similar_activities'];
            this.myTitle = this.objActivityDetail.title;
            this.meta.addTag({ name: 'Discovery', content: this.myTitle });

            this.LoadingFlag = 0;
            if (this.objActivityDetail.is_wishlist === undefined || this.objActivityDetail.is_wishlist === null) {
              this.objActivityDetail.is_wishlist = false;
            }


            if (this.objActivityDetail.is_wishlist) {
              this.showImage = true;
            } else { this.showImage = false }

            this.lat = parseFloat(this.objActivityDetail.latitude);
            this.lng = parseFloat(this.objActivityDetail.longitude);
            if (!this.objActivityDetail.price) {
              this.objActivityDetail.price = "Free";
            }
            // call to fnc to formate date/time
            this.momentTimeformate(this.objActivityDetail.start_time, this.objActivityDetail.start_date);
            // add default pics 
            // this.addDefaultPic();

            // this.window['prerenderReady'] = true;
          });

      });
    }
    else {

      this.srvActivityService.getActivityDetailUserEndpoint(this.activityId).pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {
          this.loading = false;
          // console.log(res);
          // console.log('ssss1', res['response'].data[0]);


          // console.log(this.loading);
          this.objActivityDetail = res['response'].data['activity_detail'];
          this.newlyAddedList = res['response'].data['similar_activities'];
          this.myTitle = this.objActivityDetail.title;
          this.meta.addTag({ name: 'Discovery', content: this.myTitle });

          this.LoadingFlag = 0;
          if (this.objActivityDetail.is_wishlist === undefined || this.objActivityDetail.is_wishlist === null) {
            this.objActivityDetail.is_wishlist = false;
          }


          if (this.objActivityDetail.is_wishlist) {
            this.showImage = true;
          } else { this.showImage = false }

          this.lat = parseFloat(this.objActivityDetail.latitude);
          this.lng = parseFloat(this.objActivityDetail.longitude);
          if (!this.objActivityDetail.price) {
            this.objActivityDetail.price = "Free";
          }
          // call to fnc to formate date/time
          this.momentTimeformate(this.objActivityDetail.start_time, this.objActivityDetail.start_date);
          // add default pics 
          // this.addDefaultPic();
          // this.window['prerenderReady'] = true;

        });
    }



    this.registerActivityForm = this.formBuilder.group(
      {
        carholderName: ["", Validators.required],
        cardholderCardNumber: [
          "",
          [
            Validators.required,
            this.isNumericValidator,
            Validators.maxLength(16)
          ]
        ],
        cardHolderExpMonth: [
          "",
          [
            Validators.required,
            this.isNumericValidator,
            Validators.maxLength(2),
            Validators.minLength(2)
          ]
        ],
        cardHolderExpYear: [
          "",
          [
            Validators.required,
            this.isNumericValidator,
            Validators.maxLength(2),
            Validators.minLength(2)
          ]
        ],
        cardHolderCVV: ["", [Validators.required, this.isNumericValidator]]
      },
      {
        // validator: this.MustMatch("password", "confirmPassword")
      }
    );
    // get routes parameters .....

    // hide ticket purchase window 
    this.show = false

    this.controller = "activityDetail"
    this.page = this.page = this.router.url;
    //  activity defualt number of tickets
    this.activityNumberTickets = 1;
    this.delayTOmoveNext = 0;

    this.showSocialBtn = true;
    this.userId = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);





    this.url1 = "https://www.youcan.tech/" + this.page;
    this.url = "https://www.youcan.tech/" + this.page;


    this.shareObj.href = this.url1;

  }

  breadcrumb = () => {
    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {
        // console.log(e[0].urlAfterRedirects); // previous url
        if (e[0].urlAfterRedirects === '/search') {
          this.routExist = true;
          this.previousName = "Search";
          this.previousURL = 'https://www.youcan.tech/search';
          this.currentName = "Activity Detail"
        }
        else if (e[0].urlAfterRedirects === '/') {
          // console.log("in");
          this.routExist = true;
          this.previousName = "Home";
          this.previousURL = 'https://www.youcan.tech/';
          this.currentName = " Activity Detail";
        }

      });
  }

  updateUrl(event) {

    this.objActivityDetail.cover = '../../../assets/detail_img.png';
  }
  callServiceToCopy() {
    this._clipboardService.copyFromContent('This is copy thru service copyFromContent directly');
  }

  onCopyFailure() {
    alert('copy fail!');
  }
  // show/hide left side social icons
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number > 900) {
      this.showSocialBtn = false;
      // console.log("You are 500px from the top to bottom", number);
    } else {
      this.showSocialBtn = true;
      //console.log("less height", number);
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
    this.objIEventLog.totaltime = this.totaltime;
    this.srvLoggingService.Event_SaveLogs(this.objIEventLog).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      // console.log('popularListComponent ::', res);
    }, error => console.log(error));

  }

  ngOnDestroy(): void {
    this.userPersonalization();
    // this.endTime = performance.now();
    // // var diff = moment(this.endTime).unix() - moment(this.startTime).unix();
    // this.totaltime = this.endTime - this.startTime;
    // var seconds = (this.totaltime / 1000).toFixed(1);
    // this.totaltime = seconds;
    // this.loginAnalytics("activity_view_time");
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
  }
  // fnc to formate date / time helper function . helping this.srvActivityService.getActivityDetailUserEndpoint
  // response ..
  momentTimeformate = (start_time, start_date) => {

    this.timeHours = moment(start_time, "HH:mm").format("h:mm");
    this.timePriod = moment(start_time, "HH:mm").format("A");
    this.dayName = moment(start_date).format("ddd");
    this.monthName = moment(start_date).format("MMM");
    this.date = moment(start_date).format("DD");
  }

  // fnc help to add various default picture base on condition ,helping this.srvActivityService.getActivityDetailUserEndpoint
  // addDefaultPic = () => {
  //   if (!this.objActivityDetail.owner_picture) {
  //     if (this.objActivityDetail.source === "sfstation.com") {
  //       this.objActivityDetail.owner_picture =
  //         "../../../assets/sfstationlogo.png";
  //     }
  //     if (this.objActivityDetail.source === "yelp") {
  //       this.objActivityDetail.owner_picture = "../../../assets/img/yelplogo.png";
  //     }
  //     if (this.objActivityDetail.source === "Eventbrite") {
  //       this.objActivityDetail.owner_picture =
  //         "../../../assets/eventbritelogo.png";
  //     }
  //     if (this.objActivityDetail.source === "choosechicago") {
  //       this.objActivityDetail.owner_picture =
  //         "../../../assets/choosechicagologo.jpg";
  //     }
  //   }
  // }
  // if activity not hosted from our site ,let them vist to their website
  visitLink = () => {
    this.addEventLog('visit activity link');
    this.srvLoggingService.Add_Activity_Visited(this.activityId).subscribe(res => {
      // console.log(res);
    });
    // console.log(this.objIEventLog);
    window.open(this.objActivityDetail.link, "_blank");
  }

  // go to previous state
  gobackPage = () => {
    this._location.back();
  }
  // add to wish list .. 
  // here is problem in this api call 
  addToWishList = () => {

    const isLogin = this.srvJwthelperService.verifyToken();
    if (isLogin) {
      this.objAddToWishList.activity_id = this.objActivityDetail.id;
      this.objAddToWishList.is_wishlist = this.objActivityDetail.is_wishlist;
      this.objAddToWishList.is_hosting = this.isHosting;

      if (this.objActivityDetail.is_wishlist) {
        // remove from wish list if wishlisted
        this.show = false;
        this.srvActivityService.addToWishlistEndpointDelete(this.objAddToWishList.activity_id).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            //   console.log('not added to wishlist ', res);
            this.showImage = false;
            this.objActivityDetail.is_wishlist = false;
          }, error => {
            this.objActivityDetail.is_wishlist = true;
            this.showImage = false;
          });
      } else {
        // add to wish list 
        this.showImage = true;
        this.objAddToWishList.is_wishlist = true;
        // console.log(this.objAddToWishList, "checker");
        this.srvActivityService.addToWishlistEndpoint(this.objAddToWishList.activity_id).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            // console.log('added to wishlist ', res);
            this.showImage = true;
            this.objAddToWishList.is_wishlist = true;
          }, error => {
            this.objAddToWishList.is_wishlist = false;
            this.showImage = false;
          });
      }
      // track user 
      this.addEventLog('add to wishlist')
    } else {
      this.router.navigate(['/login']);
    }

  }
  // ... is numeric validator to check value is numeric or not
  isNumericValidator = (control: AbstractControl) => {
    const val = control.value;

    if (val === null || val === "") return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  };
  // convenience getter for easy access to form fields
  get f() {
    return this.registerActivityForm.controls;
  }
  // ... all about ticket payment ............................
  activityNextProcessFuc(event: any) {
    this.activityBuyTicketProcessStep += 1;

    // this.modalRef = this.modalService.show(template, {
    //   class: "modal-lg modal-dialog-centered color",
    //   animated: true,
    //   backdrop: "static"
    // });
  }
  activityBuyTicketClose() {

    this.activityBuyTicketProcessStep = 0;

    let element1 = document.getElementsByClassName("modal-backdrop");
    element1[0].remove();
  }
  goBack() {
    this.activityBuyTicketProcessStep -= 1;
    let element1 = document.getElementsByClassName("modal-backdrop");
    element1[0].remove();
  }
  closefirstPopup() {

    if (this.delayTOmoveNext === 0) {
      this.activityBuyTicketProcessStep = 0;
    }
  }
  // ... buy tickets
  buyMoreActivityTickets() {
    this.activityNumberTickets += 1;
    if (this.activityNumberTickets > 1) {
      let totalPrice = parseInt(this.objActivityDetail.price);
      totalPrice += this.activitySingleTicketPrice;
      this.objActivityDetail.price = totalPrice.toString();
    }
  }
  // .... remove extra tickets
  removeExtraActivityTickets() {
    if (this.activityNumberTickets != 1) {
      this.activityNumberTickets -= 1;
      let totalPrice = parseInt(this.objActivityDetail.price);
      totalPrice -= this.activitySingleTicketPrice;
      this.objActivityDetail.price = totalPrice.toString();
    }
  }
  // .... add order  step1
  fnAddOrderPayTicketStep1(template: TemplateRef<any>) {
    this.loading = true;
    this.srvPaymentService
      .AddOrderEndpoint(
        `activityId=${this.objActivityDetail.id}&quantity=${this.activityNumberTickets}`)
      .subscribe(
        res => {
          this.loading = false;
          this.ativityBuyTicketResult = res["result"];
          this.delayTOmoveNext = 1;

          let element: HTMLElement = document.getElementById(
            "close"
          ) as HTMLElement;
          element.click();
          let element1: HTMLElement = document.getElementById(
            "btn1"
          ) as HTMLElement;
          element1.click();
          this.delayTOmoveNext = 1;
          // this.modalRef = this.modalService.show(template, {
          //   animated: true,
          //   backdrop: "static"
          // });

          // console.log(res);
        },
        error => {
          this.loading = false;
        }
      );
  }


  // ... end ......
  // get image if not then return default..

  // you have to tell angular that you updated the content after ngAfterContentChecked you can
  // else we will get error ExpressionChangedAfterItHasBeenCheckedError: if we call fuc not in ngafterC
  ngAfterContentChecked(): void {
    // this.objActivityDetail.cover = this.getUserCoverPic();
  }

  // facebook link
  FacebookLink() {

    window.open("https://www.facebook.com/youcanllc/", "_blank");
  }
  // link
  TwitterLink() {

    window.open("https://twitter.com/YoucanUSA", "_blank");
  }
  LinkedinLink() {

    window.open("https://www.linkedin.com/company/youcanllc/", "_blank");
  }
  InstagramLink() {

    window.open("https://www.instagram.com/youcanusa/", "_blank");
  }


  loginAnalytics(eventName) {
    // console.log(this.startTime, this.endTime, "time");
    // console.log(this.totaltime);
    let token = localStorage.getItem('access_token');
    let userid = localStorage.getItem('userid');
    let date: Date;
    // analytics.logEvent(eventName, {
    //   id: token,
    //   deviceId: userid,
    //   activity_id: this.objActivityDetail.id,
    //   activity_name: this.objActivityDetail.title,
    //   date: date,
    //   viewedTime: this.totaltime
    // });
  }
  userPersonalization = () => {
    this.endTime = performance.now();
    // console.log("i am called");
    // var diff = moment(this.endTime).unix() - moment(this.startTime).unix();
    this.totaltime = this.endTime - this.startTime;
    var seconds = (this.totaltime / 1000).toFixed(1);
    this.totaltime = seconds;
    this.srvLoggingService.Add_Activity_View(this.totaltime, this.activityId).subscribe(res => {
      // console.log(res);
    });



  }


  ngAfterViewInit() {
    // console.log(this.router);

    // window.prerenderReady = true;
    this.breadcrumb();

    var url = this.doc.URL;
    // console.log(url);
    this.seoService.getMetaData(url).subscribe(res => {

      this.title.setTitle(res['response'].data['meta'][0].meta_title);
      this.meta.updateTag({ name: 'description', content: res['response'].data['meta'][0].meta_description });
      this.meta.updateTag({ name: 'content_box', content: res['response'].data['meta'][0].content_box });
    });
  }

  slides = [
    { img: "https://cdn.mos.cms.futurecdn.net/39cDAaw2RBsSMsmEw8R3s6-320-80.jpg", city: 'chicago' },
    { img: "https://cdn.mos.cms.futurecdn.net/39cDAaw2RBsSMsmEw8R3s6-320-80.jpg", city: 'Pitsburgh' },
    { img: "https://cdn.mos.cms.futurecdn.net/39cDAaw2RBsSMsmEw8R3s6-320-80.jpg", city: 'Los Angeles' },
    { img: "https://cdn.mos.cms.futurecdn.net/39cDAaw2RBsSMsmEw8R3s6-320-80.jpg", city: 'San Francisco' },

  ];

  slideConfig = { "slidesToShow": 4, "slidesToScroll": 2, 'autoplay': false, 'dots': false, 'infinite': false, 'arrows': true, 'responsive': [{ 'breakpoint': 1600, 'settings': { 'slidesToShow': 4, 'slidesToScroll': 2, } }, { 'breakpoint': 1000, 'settings': { 'slidesToShow': 2, 'slidesToScroll': 1, } }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }] };
  // navigate to search component to search desired contents of user
  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }
  onClick() {
    // console.log("i am khan");
  }
}
