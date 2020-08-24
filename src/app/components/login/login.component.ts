import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ILogin } from 'src/app/models/login';
import { Router } from '@angular/router';
import { EndpointFactoryService } from 'src/app/services/endpontFactory/endpoint-factory.service';
import { DBkeys, UkanAppRoutes } from 'src/app/services/dbkeys/db-keys';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { HttpParams } from '@angular/common/http';
import { IToken } from 'src/app/models/token';
import { AccountService } from 'src/app/services/account/account.service';
import { IpServiceService } from '../../services/ipservice/ip-service.service';
import { FormsModule } from '@angular/forms';
// import * as firebase from 'firebase';
// var firebaseConfig = {
//   apiKey: "AIzaSyDGYqy-W_qQTyrppD51-BF6rk0RtWozZho",
//   authDomain: "youcan-265010.firebaseapp.com",
//   databaseURL: "https://youcan-265010.firebaseio.com",
//   projectId: "youcan-265010",
//   storageBucket: "youcan-265010.appspot.com",
//   messagingSenderId: "506126453626",
//   appId: "1:506126453626:web:9d9948a26263a6f16164c3",
//   measurementId: "G-FX351K4RER"
// };
// import * as firebase from 'firebase';
// console.log(firebase)
// firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
// const analytics = firebase.analytics();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // props .....
  show: boolean;
  userId: string;
  controller: string;
  url: string;
  public objLogin: ILogin;
  public isLoginCheck: string;
  private access_token: any;
  public login1 = "";
  public login_responce: IToken;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
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
  @ViewChild('myInput', { static: true }) myInput: ElementRef;
  constructor(private ip: IpServiceService, public router: Router,
    private srvEndpointFactory: EndpointFactoryService, private srvLocalStoragefactory: LocalStorageFactoryService, private socialAuthService: AuthService, private accountService: AccountService) {
    this.objLogin = new ILogin();
    this.show = false;
    this.loading = 0;
    this.verfication = false;

  }
  ipAddress: string;
  ngOnInit() {

    this.objLogin.grant_type = DBkeys.GRANTE_TYPE;
    this.objLogin.client_id = DBkeys.CLINET_ID;
    this.objLogin.client_secret = DBkeys.CLIENT_SECRET;

    // console.log(this.getIP());



  }

  // getPosition(): Promise<any> {
  //   return new Promise((resolve, reject) => {

  //     navigator.geolocation.getCurrentPosition(resp => {

  //       resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });

  //       // console.log(resolve);
  //     },
  //       err => {
  //         reject(err);
  //         // console.log(resolve);
  //       });
  //   });


  // }
  // getIP() {
  //   this.ip.getIPAddress().subscribe((res: any) => {
  //     console.log(res);
  //     this.ipAddress = res.ip;
  //     console.log(this.ipAddress);
  //     // var geoip = require('geoip-lite');
  //     // var geo = geoip.lookup(this.ipAddress);
  //     // console.log(geo);
  //   });

  // }

  login = () => {
    this.loading = 1;
    this.isTrue = true;
    // console.log(this.objLogin.username, "email");
    this.srvEndpointFactory.getLoginEndpoint(this.objLogin.username).subscribe(res => {
      // console.log(res, "simple res");

      this.check = res['response'].message;
      // console.log(this.check);
      if (this.check === "Email sent to user succesfully") {
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
    // console.log("viewss");
    this.srvEndpointFactory.sendVerificationCode(this.data, this.objLogin.username).subscribe(res => {

      this.check = res['response'].data['token'];
      x = true;
      // console.log(this.check);
      if (this.check != null) {
        this.srvLocalStoragefactory.writeEmailtoLocal(this.objLogin.username);
        this.srvLocalStoragefactory.writetokenWithEmail(this.check);
        this.loginAnalytics("email_login");

        if (this.check === null) {
          this.loading = 0;
          // this.login = "The email you entered did not match our records. Please try again.";
          this.login1 = "You have entered an invalid email or password";
        } else {
          let var1;
          // console.log(this.check, "ist");
          this.accountService.getUserProfileInfoEndpoint(this.check).subscribe(res => {
            // console.log(res, "1");
            var1 = res['response'].data;
            // console.log(var1, "2");
            this.srvLocalStoragefactory.writeWholeObjecttolocalStorage(var1);

          },
            err => {
              let error_stack = JSON.stringify(err.error);
              let error_level = err.status.toString();
              let error_message = err.message;
            }

          );
          this.router.navigate(['/']);

        }
      }
      else {
        this.verfication = false;
        this.loading = 0;
        this.isLoginCheck = "You have entered an invalid or Expire Token, Please enter your email again";
        // console.log('error login')
        this.srvLocalStoragefactory.removeTokenFromLocalStorage();
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
  // go back to home page
  goBack = () => {
    this.router.navigate(['/']);
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
        if (this.check !== "null") {
          //  console.log("helo login");

          this.srvLocalStoragefactory.writeEmailtoLocal(userData.email);
          this.login1 = "get access token from backend but ssl require google login";
          this.srvLocalStoragefactory.writetokenWithEmail(this.check);
          this.login1 = "Successful";

          this.loginAnalytics("login_with_google_pressed");

          // added code for test
          if (this.check === null) {
            this.loading = 0;
            // this.login = "The email you entered did not match our records. Please try again.";
            this.login1 = "You have entered an invalid email or password";
          } else {
            let var1;
            this.accountService.getUserProfileInfoEndpoint(this.check).subscribe(res => {
              // console.log(res, "111");
              var1 = res['response'].data;
              // console.log(var1, "2");
              this.srvLocalStoragefactory.writeWholeObjecttolocalStorage(var1);

            },
              err => {
                let error_stack = JSON.stringify(err.error);
                let error_level = err.status.toString();
                let error_message = err.message;
              }

            );
            this.router.navigate(['/']);
          }

        }
        else {
          this.router.navigate(['/login']);
        }
      });
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // fuc to navigate user to login page if user is on another page
  navigateToRegisterPage = () => {
    this.router.navigate([UkanAppRoutes.REGISTER]);
  }
  // show and hidden password
  showHidePassword1() {
    this.show = !this.show;
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
