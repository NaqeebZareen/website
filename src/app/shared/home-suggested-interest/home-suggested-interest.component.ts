import { Component, OnInit, Output, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { EndpointFactoryService } from 'src/app/services/endpontFactory/endpoint-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { PopularList } from 'src/app/models/popular-list';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/retry';
import { timer } from 'rxjs';
import { PopularActivity } from 'src/app/models/popular-activity';
import { IAddToWishList } from 'src/app/models/api-request-model/add-to-wish-list';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { SocialService } from 'ngx-social-button';
declare const $: any;
@Component({
  selector: 'app-home-suggested-interest',
  templateUrl: './home-suggested-interest.component.html',
  styleUrls: ['./home-suggested-interest.component.css']
})
export class HomeSuggestedInterestComponent implements OnInit {

  public searchInputText: string;
  public searchInputDates: Date[];
  public searchInputCity: string;
  public searchInputInterest: string[] = [];
  public suggestedInterest: any;
  public list: string[] = [];
  public recmandedList: PopularList[] = [];
  public unsubscribe = new Subject<void>();
  public activity: PopularActivity;
  public objAddToWishList: IAddToWishList;
  public url1: any;
  public shareObj = {
    href: this.url1,
    hashtag: "#YOUCAN"
  };
  public url: any;
  innerWidth: number;
  constructor(private socialAuthService: SocialService, private srvAccountService: AccountService, private router: Router, private srvJwthelperService: JwtHelper,
    private srvEndpointFactory: EndpointFactoryService, private srvActivityService: ActivityService) {
    this.objAddToWishList = new IAddToWishList();
  }
  public facebookSharing(shareObj: any) {
    this.socialAuthService.facebookSharing(shareObj);
  }

  ngOnInit() {


    // timer(2000).subscribe(x => {
    //   this.homesugested();
    // });
    //   if (this.activity.saved === undefined || this.activity.saved === null) {
    //   this.activity.saved = false;
    // }

    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 800) {
      var city = "San Francisco";
      var text;

      var token = localStorage.getItem("access_token");
      if (token === null || token === undefined) {
        timer(5000).subscribe(res => {
          this.srvActivityService.getActivitiesHappeningIn24Hours(city, text).subscribe(res => {
            this.recmandedList = res['response'].data;
            // console.log(this.recmandedList);
          });
        });
      }
      else {
        this.srvActivityService.getActivitiesHappeningIn24Hours(city, text).subscribe(res => {
          this.recmandedList = res['response'].data;
          // console.log(this.recmandedList);
        });
      }

    }


    this.url1 = "https://www.youcan.tech/activity-details/" + this.activity.id;
    this.url = "https://www.youcan.tech/activity-details/" + this.activity.id;
    // console.log(this.page);
    // this.myTitle = "/activity-details/851965/false";
    // console.log(this.url);

    this.shareObj.href = this.url1;

  }
  async homesugested() {
    var access_token = localStorage.getItem('access_token');
    // var city = localStorage.getItem('city');
    (await this.srvActivityService.getRecomendedActivitiesEndpoint(access_token)).retry(4).subscribe(res => {
      this.recmandedList = res['response'].data;
      // console.log(this.recmandedList);
    });
  }

  changeCityHeader = (city) => {
    // console.log(city, "slected");

    var text;
    this.srvActivityService.getActivitiesHappeningIn24Hours(city, text).subscribe(res => {
      this.recmandedList = res['response'].data;
      // console.log(this.recmandedList);
    });
  }
  addToWishList = () => {

    const isLogin = this.srvJwthelperService.verifyToken();
    const email = localStorage.getItem('email');
    if (isLogin) {
      this.objAddToWishList.activity_id = this.activity.id;
      this.objAddToWishList.is_wishlist = this.activity.is_wishlist;
      this.objAddToWishList.is_hosting = this.activity.is_hosting;



      if (this.activity.is_wishlist) {
        // remove from wish list if wishlisted


        this.srvActivityService.addToWishlistEndpointDelete(this.activity.id).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {


            this.activity.is_wishlist = false;
          }, error => {
            this.activity.is_wishlist = true;

          });
      } else {
        // add to wish list 

        this.objAddToWishList.is_wishlist = true;
        this.srvActivityService.addToWishlistEndpoint(this.activity.id).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {


            this.activity.is_wishlist = true;

          }, error => {

            this.activity.is_wishlist = false;
            // console.log("error NQ");

          });
      }
      // track user 
      // this.addEventLog('add to wishlist')
    } else {
      // this.show = false;
      this.router.navigate(["/login"]);

    }



  }
  // navigate to search component to search desired contents of user


  navigateToSearchPage = () => {


    this.router.navigate(['/search']);

  }
  items = [
    {
      title: "1 slide label",
      summery: "1 slide label summery",
      url: "https://via.placeholder.com/200?text=first"
    },
    {
      title: "2 slide label",
      summery: "2 slide label summery",
      url: "https://via.placeholder.com/200?text=second"
    },
    {
      title: "3 slide label",
      summery: "3 slide label summery",
      url: "https://via.placeholder.com/200?text=third"
    },
    {
      title: "4 slide label",
      summery: "4 slide label summery",
      url: "https://via.placeholder.com/200?text=third"
    },
    {
      title: "5 slide label",
      summery: "5 slide label summery",
      url: "https://via.placeholder.com/200?text=third"
    }
  ];


  ngAfterViewInit() {
    $('#carouselExampleCaptions').carousel()
  }
}
