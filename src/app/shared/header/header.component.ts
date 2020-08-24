import { Component, OnInit, OnDestroy, AfterContentChecked, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { IUser } from 'src/app/models/user';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { DBkeys, UkanAppRoutes } from 'src/app/services/dbkeys/db-keys';
import { IEventLog } from 'src/app/models/event-log';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { EndpointFactoryService } from 'src/app/services/endpontFactory/endpoint-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { ILogin } from 'src/app/models/login';
import { IToken } from 'src/app/models/token';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterContentChecked {

  // class props
  public isLogin: boolean = true; // is for to hide some routes from unauthenticated user
  public isTokenExpire: boolean = false;
  public hideHeader: boolean = false;
  public controller: string;
  public page: string;
  public objUser: IUser;
  public objIEventLog: IEventLog;
  public searchText: string;
  public searchInputCity: string;
  public suggestedCities: any[];
  public sidenav: boolean = false;
  public searchdata: boolean = true;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();

  // 
  // Login component variable
  //
  show: boolean;
  userId: string;
  // controller: string;
  url: string;
  public objLogin: ILogin;
  public isLoginCheck: string;
  private access_token: any;
  public login1 = "";
  public login_responce: IToken;
  // subject to unsubscibe from obserable
  // public unsubscribe = new Subject<void>();
  check: any;
  public loading: any;
  public verfication: boolean;
  public val1: string;
  public val2: string;
  public val3: string;
  public val4: string;
  public data: string;
  public verfiy1: boolean = false;
  public isTrue: boolean;

  // end of login module elemets
  // 
  // 
  constructor(private srvJwthelperService: JwtHelper, private srvAccountService: AccountService, private router: Router,
    private srvLocalStorageFactory: LocalStorageFactoryService, private srvLoggingService: LoggingService,
    private srvEndpointFactory: EndpointFactoryService, private srvActivityService: ActivityService, private socialAuthService: AuthService,) {
    this.objUser = new IUser(); // we will get error if not initialize 
    this.objIEventLog = new IEventLog();
    if (this.objUser.picture === null) {
      this.objUser.picture = '../../../assets/default-placeholder-300x300.png';
    }

    this.objLogin = new ILogin();
    this.show = false;
    this.loading = 0;
    this.verfication = false;
  }

  @Output() public notify = new EventEmitter();
  @Input() public showSearchBar: boolean;
  @ViewChild('myModalLogin', { static: true }) myModalLogin: ElementRef;

  typedTitle = (city1: any) => {
    // debugger;
    this.srvActivityService.getResultByTitleHelper(this.searchText);
    // console.log(this.searchText);
    var searchPhrase = this.searchText;
    var date;
    let interest;
    var city = "unkown";

    this.srvLoggingService.Add_Filters(searchPhrase, date, interest, city).subscribe(res => { });
    // this.notify.emit(this.searchText);
  }

  selectedCity = () => {

  }
  goToHome() {

  }

  ngDoCheck() {
    // location.reload();
  }
  ngOnInit() {
    //    console.log(this.showSearchBar);

    this.isTokenExpire = this.srvJwthelperService.verifyToken();
    this.controller = "HeaderComponent";
    this.page = this.router.url;
    this.objUser.picture = this.getUserProfilePic();

    // console.log(this.objUser.picture);
    this.searchInputCity = localStorage.getItem("city");
    this.searchInputCity = localStorage.getItem("city");
    if (this.searchInputCity === 'Islamabad' || this.searchInputCity === 'Rawalpindi') {
      this.searchInputCity = "San Francisco";
      this.srvLocalStorageFactory.writecityofheader("San Francisco");
    }

    if (this.searchInputCity === null) {
      timer(2000).subscribe(x => {
        this.getLocation();
      });
    }
    this.page = this.router.url;
    this.getCities();
    // if()
    // {}
    this.srvEndpointFactory.isLoggedIn().subscribe(res => {
      let email = localStorage.getItem('email');
      if (email === null) {
        // console.log(email, "1");
        this.isLogin = false;

      }
      else {
        // debugger;
        // console.log(res, email);
        this.isLogin = res;
        // console.log(this.isLogin)
      }
      // console.log(this.isLogin);
      // let isLogin = res;
      // get user info if user is login  
      if (this.isLogin) {
        // console.log(this.isLogin, "tt");
        this.isLogin = false;
        // calling to backend api to get user related info
        let accesstoken = localStorage.getItem('access_token')
        this.srvAccountService.getUserProfileInfoEndpoint(accesstoken).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
          // console.log(res);
          this.objUser = res['response'].data;
          // call to fuc to store user info to local storage
          this.pushUserInfoToLocalStorage(this.objUser.first_name, this.objUser.last_name, this.objUser.picture,
            this.objUser.user_id);

        }, error => {
          //console.log('srvAccountService.getUserProfileInfoEndpoint:', error);
          this.isLogin = true;
        });
      } else {
        this.isLogin = false;

      }
    });

    if (this.objUser.picture === 'null') {
      this.objUser.picture = '../../../../assets/Default.jpg';
    }
    // console.log(this.objUser.picture);

  }

  getlogin() {

    this.objLogin.grant_type = DBkeys.GRANTE_TYPE;
    this.objLogin.client_id = DBkeys.CLINET_ID;
    this.objLogin.client_secret = DBkeys.CLIENT_SECRET;
    this.myModalLogin.nativeElement.click();
  }

  getLocation = () => {
    // this.searchInputCity = localStorage.getItem("city");
    // if (this.searchInputCity === 'Islamabad' || this.searchInputCity === 'Rawalpindi') {
    this.searchInputCity = "San Francisco";
    // }
  }

  updateUrl(event) {
    // console.log(event, this.activity.id, this.activity.title);
    this.objUser.picture = '../../../assets/default-placeholder-300x300.png';
  }
  // fuc to select city from dropDown
  selectSearchCity = (city: any) => {
    this.searchInputCity = city;
    this.srvLocalStorageFactory.writecityofheader(city);
    this.srvActivityService.getResultByCityHelper(this.searchInputCity);
    // console.log(this.searchInputCity);
    // this.addEventLog('city selected'); // these event paramters name will be change ,i don't about this ,temporaray
  }
  getCities = () => {
    this.srvAccountService.getUKanTargetedCities().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      var lis = res['response'].data['cities'];

      this.suggestedCities = [];
      lis.forEach(element => {
        // console.log(element.name);
        this.suggestedCities.push(element.name);
        // console.log(this.suggestedCities);
      });
      // console.log(this.suggestedCities);
      for (let city of this.suggestedCities) {
        // console.log(city);
      }
      // this.suggestedCities = res['response'].data['cities'];
    });
  }

  getOs = () => {
    var userAgent = navigator.userAgent || navigator.vendor;
    if (/windows phone/i.test(userAgent)) {
    }

    if (/android/i.test(userAgent)) {
      // window.location.href = 'https://youcan.app.link';
      window.open('https://play.google.com/store/apps/details?id=com.youcan.application');
    }


    if (/iPad|iPhone|iPod/.test(userAgent)) {
      // window.location.href = 'https://youcan.app.link';
      window.open('https://youcan.app.link')
    }

    return "unknown";
  }
  getWindowsMobileOperatingSystem() {

    window.open('https://play.google.com/store/apps/details?id=com.youcan.application', "_blank");

    // var userAgent = navigator.userAgent || navigator.vendor;
    // if (/windows phone/i.test(userAgent)) {
    // }

    // if (/android/i.test(userAgent)) {
    //   // window.location.href = 'https://youcan.app.link';
    //   window.open('https://play.google.com/store/apps/details?id=com.youcan.application');
    // }


    // if (/iPad|iPhone|iPod/.test(userAgent)) {
    //   // window.location.href = 'https://youcan.app.link';
    //   window.open('https://youcan.app.link')
    // }

    // return "unknown";
  }
  getMobileOperatingSystem = () => {
    window.open('https://youcan.app.link', "_blank");
  }
  // you have to tell angular that you updated the content after ngAfterContentChecked you can 
  // else we will get error ExpressionChangedAfterItHasBeenCheckedError: if we call fuc not in ngafterC
  ngAfterContentChecked(): void {
    let email = localStorage.getItem('email');
    this.srvEndpointFactory.isLoggedIn().subscribe(res => {
      if (email === null) {
        this.isLogin = false;
      }
      else {
        this.isLogin = res;
      }

    });
    this.objUser.picture = this.getUserProfilePic();
  }

  // fuc to write user info to localStorage
  pushUserInfoToLocalStorage = (firstName, lastName, profilePic, userId) => {
    let localDBObjectList = [];
    localDBObjectList.push({ [DBkeys.USER_FIRSTNAME]: firstName })
    localDBObjectList.push({ [DBkeys.USER_LASTNAME]: lastName })
    localDBObjectList.push({ [DBkeys.USER_PROFILE_PIC]: profilePic })
    localDBObjectList.push({ [DBkeys.USER_ID]: userId })
    this.srvLocalStorageFactory.writeEachTolocalStorage(localDBObjectList);
  }
  // get image if not then return default..
  getUserProfilePic = () => {

    // console.log(this.objUser.picture);
    if (this.objUser.picture) {
      return this.objUser.picture
    } else {
      let pic = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_PROFILE_PIC);
      if (pic) {
        return this.objUser.picture = pic;
      } else {

        return this.objUser.picture = '../../../assets/default-placeholder-300x300.png'
      }
    }

  }

  // fuc to logout user 
  logOutUser = () => {
    this.srvLocalStorageFactory.removeTokenFromLocalStorage();
  }

  // fuc to navigate user to user wishlisted activities page
  navigateToUserWishlistedActivities = () => {
    this.addEventLog('wishlist');


    this.router.navigate([UkanAppRoutes.WISHLIST]);
  }

  navigateToNewWishlistedActivities() {
    this.addEventLog('newwishlist');
    this.sidenave1();
    this.router.navigate([UkanAppRoutes.newwishlist]);
  }
  // fuc to navigate user to user hosted activities page
  navigateToUserHostedActivities = () => {
    this.addEventLog('hosted activities');
    this.router.navigate([UkanAppRoutes.HOSTED]);
  }

  // fuc to navigate user to user wishlisted activities page
  navigateToUserJoindActivities = () => {
    this.addEventLog('joind activities');
    this.router.navigate([UkanAppRoutes.JOINED]);
  }

  // fuc to navigate user to  main page if user is on another page
  navigateToMainPage = () => {
    this.addEventLog('home page');
    // location.reload();
    this.sidenave1();
    this.router.navigate(['/']);
  }
  // fuc to navigate user to login page if user is on another page
  navigateToLoginPage = () => {
    this.addEventLog('login');
    // location.reload();
    this.sidenave1();
    this.router.navigate([UkanAppRoutes.LOGIN]);
  }

  // fuc to navigate user to login page if user is on another page
  navigateToRegisterPage = () => {
    this.addEventLog('search');
    this.sidenave1();
    this.router.navigate([UkanAppRoutes.SEARCH]);
    // window.open('www.youcan.tech/search', "_blank");
    // this.sidenav = true;
  }

  sidenave = () => {
    this.sidenav = true;
  }
  sidenave1 = () => {
    this.sidenav = false;
  }
  // fuc to navigate user to register page 
  navigateToNewsPage = () => {
    this.addEventLog('news');
    // location.reload();
    this.sidenave1();
    this.router.navigate(['/news']);


  }

  // fuc to track user actions .
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


  headerOF = () => {
    this.searchdata = false;
  }

  headerON = () => {
    this.searchdata = true;
  }
  pivacyPolicy = () => {
    this.sidenave1();
    this.router.navigate(['privacy-policy']);
  }


  FacebookLink() {
    this.sidenave1();

    window.open("https://www.facebook.com/youcanllc/", "_blank");
  }
  // link
  TwitterLink() {
    this.sidenave1();
    window.open("https://twitter.com/YoucanUSA", "_blank");
  }
  LinkedinLink() {
    this.sidenave1();
    window.open("https://www.linkedin.com/company/youcanllc/", "_blank");
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // Login Funtions
  login = () => {
    // this.verfication = true;
    this.loading = 1;
    this.isTrue = true;
    // console.log(this.objLogin.username, "email");
    this.srvEndpointFactory.getLoginEndpoint(this.objLogin.username).subscribe(res => {
      // console.log(res, "simple res");

      this.check = res['response'].message;
      // console.log(this.check);
      if (this.check === "successfully send mail to the User") {
        this.verfication = true;

      }
      else {
        this.verfication = true;
      }

    });

  }
  verify = () => {
    this.loading = 1;
    this.data = this.val1;
    this.data = this.data + this.val2;
    this.data = this.data + this.val3;
    this.data = this.data + this.val4;
    // console.log(this.data, "code");
    let x: boolean = false;
    this.verfiy1 = false;
    // console.log("viewss");
    this.srvEndpointFactory.sendVerificationCode(this.data, this.objLogin.username).subscribe(res => {

      // console.log(res['response'].data['token']);
      this.check = res['response'].data['token'];
      x = true;
      this.verfiy1 = false;
      // console.log(this.check);
      if (this.check != null) {
        this.srvLocalStorageFactory.writeEmailtoLocal(this.objLogin.username);
        this.srvLocalStorageFactory.writetokenWithEmail(this.check);
        this.loginAnalytics("email_login");

        if (this.check === null) {
          this.loading = 0;
          // this.login = "The email you entered did not match our records. Please try again.";
          this.login1 = "You have entered an invalid email or password";
        } else {
          let var1;
          // console.log(this.check, "ist");
          this.srvAccountService.getUserProfileInfoEndpoint(this.check).subscribe(res => {
            // console.log(res, "1");
            var1 = res['response'].data;
            // console.log(var1, "2");
            this.srvLocalStorageFactory.writeWholeObjecttolocalStorage(var1);
            this.router.navigate(['/']);
            location.reload();
          },
            err => {
              let error_stack = JSON.stringify(err.error);
              let error_level = err.status.toString();
              let error_message = err.message;
            }

          );
          this.router.navigate(['/']);
          location.reload();

        }
      }
      else {
        this.verfication = false;
        this.loading = 0;
        this.isLoginCheck = "You have entered an invalid or Expire Token, Please enter your email again";
        // console.log('error login')
        this.srvLocalStorageFactory.removeTokenFromLocalStorage();
        this.srvEndpointFactory.isLoginSubject.next(false);
      }



    });

    if (x === false) {
      // console.log("viewa");
      this.verfication = true;
      // console.log(this.verfiy1);
      this.verfiy1 = true;
    }

  }

  back = () => {
    this.verfication = false;
    this.loading = 0;
  }
  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    // if (socialPlatform == "facebook") {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else 

    if (socialPlatform == "google") {
      // console.log("ssss");
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      // console.log(socialPlatformProvider);
    }

    // console.log("send call");
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {

      // this.access_token = this.srvLocalStoragefactory.getTokenFromLocalStorage();
      // console.log(socialPlatform + " sign in data : ", userData);
      this.loading = 1;
      let body = new HttpParams();
      body = body.set("method", socialPlatform);
      body = body.set("name", userData.name);
      body = body.set("picture", userData.photoUrl);
      body = body.set("method_id", userData.id);
      body = body.set("token", userData.idToken);
      body = body.set("email", userData.email);
      this.srvEndpointFactory.getSocialLoginEndpoint(userData.email).subscribe(res => {
        this.check = res['response'].data['token'];

        // console.log(this.check);
        // console.log(this.check.result.access_token);
        //  console.log(this.check.result.access_token);
        if (this.check !== null) {
          //  console.log("helo login");

          this.srvLocalStorageFactory.writeEmailtoLocal(userData.email);
          this.login1 = "get access token from backend but ssl require google login";
          this.srvLocalStorageFactory.writetokenWithEmail(this.check);
          this.login1 = "Successful";

          this.loginAnalytics("login_with_google_pressed");

          // added code for test
          if (this.check === null) {
            this.loading = 0;
            // this.login = "The email you entered did not match our records. Please try again.";
            this.login1 = "You have entered an invalid email or password";
          } else {
            let var1;
            this.srvAccountService.getUserProfileInfoEndpoint(this.check).subscribe(res => {
              // console.log(res, "111");
              var1 = res['response'].data;
              // console.log(var1, "2");
              this.srvLocalStorageFactory.writeWholeObjecttolocalStorage(var1);
              this.router.navigate(['/']);
              location.reload();


            },
              err => {
                let error_stack = JSON.stringify(err.error);
                let error_level = err.status.toString();
                let error_message = err.message;
              }

            );
            this.router.navigate(['/']);
            location.reload();
          }

        }
        else {
          // this.router.navigate(['/login']);
        }
      });
    });

  }
  keytab(event, maxLength) {
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element

    var target = event.target || event.srcElement;
    var id = target.id
    // console.log(id.maxlength); // prints undefined

    if (nextInput == null)  // check the maxLength from here
      return;
    else
      nextInput.focus();   // focus if not null
  }

  loginAnalytics(eventName) {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('access_token');
    let userid = localStorage.getItem('userid');
    let date: Date;
    // analytics.logEvent(eventName, {
    //   id: token,
    //   deviceId: userid,
    //   email: email,
    //   date: date
    // });
  }


}
