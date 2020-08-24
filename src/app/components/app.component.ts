import { Component, OnDestroy, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { LoggingService } from '../services/loggingFactory/logging-service.service';
import { IDeviceIp } from '../models/device-ip';
import { ILocation } from '../models/location';
import { LocalStorageFactoryService } from '../services/localStorageFactory/local-storage-factory.service';
import { Router, NavigationEnd } from '@angular/router';
import { ISavlog } from '../models/savlog';
import { Subject, from, timer } from 'rxjs';
import { takeUntil, subscribeOn, filter } from 'rxjs/operators';
import { DBkeys } from '../services/dbkeys/db-keys';
import { EndpointFactoryService } from '../services/endpontFactory/endpoint-factory.service';
import { ILogin } from '../models/login';
import { SearchComponent } from './search/search.component';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Geocoder } from 'googlemaps';
import * as uuid from "uuid";
import { IpServiceService } from '../services/ipservice/ip-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';
// import { _Left } from '@angular/cdk/scrolling';
declare var gtag;
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDGYqy-W_qQTyrppD51-BF6rk0RtWozZho",
  authDomain: "youcan-265010.firebaseapp.com",
  databaseURL: "https://youcan-265010.firebaseio.com",
  projectId: "youcan-265010",
  storageBucket: "youcan-265010.appspot.com",
  messagingSenderId: "506126453626",
  appId: "1:506126453626:web:9d9948a26263a6f16164c3",
  measurementId: "G-FX351K4RER"


};
// import 'firebase/analytics';
// import 'firebase/auth'
// // console.log(firebase, "aaaaa1");
// firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();


// const analytics = firebase.analytics();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy, AfterContentChecked {



  public title = 'ukanWebApp';
  public objUserDeviceIP: IDeviceIp;
  public objUserLocation: ILocation;
  public UserSession: any;
  public checkValue: boolean = true;
  public sessionId: any;
  public objSaveLog: ISavlog;
  public hideShowFooterHeader: boolean = true;
  public showSearchBar: boolean = false;
  public hostActivity: boolean;
  public objLogin: ILogin;
  public sugestInterest: any;
  public suggestList: string[] = [];
  public show: boolean = false;
  public UserInterestList: Array<Object> = [{ interest: "", subCatergory: [] }];
  // public mySentences: Array<Object> = [
  //   { interest: "Music", checked: true },
  //   { interest: "Adventure", checked: false },
  //   { interest: "Arts", checked: false },
  //   { interest: "Others", checked: false },
  // ];

  public user_interest: object = {};

  userId: string;
  controller: string;
  url: string;
  public id: string;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();
  check: any;
  public ipAddress: any;
  public addres: any;
  public geocoder: any;
  public city: any;
  public ip1: any;


  constructor(
    // private modalService: NgbModal, 
    private http: HttpClient, private ip: IpServiceService, private srvAccountService: AccountService, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, public router: Router,
    private srvEndpointFactory: EndpointFactoryService) {
    // this.getlocationApi();
    this.objUserDeviceIP = new IDeviceIp();
    this.objUserLocation = new ILocation();
    this.objSaveLog = new ISavlog();
    this.id = localStorage.getItem("user_id");
    this.url = this.router.url;
    this.controller = "AppComponent";
    // this.getIP();
    // this.city = localStorage.getItem("city");
    // console.log(this.city, "res");

    // let a = this.checkResponse();
    let token;
    this.city = localStorage.getItem("city");

    let country1 = localStorage.getItem("country");
    this.ip1 = localStorage.getItem("Ip");
    // console.log(this.city, this.ip1, "sa");
    var userid;
    userid = localStorage.getItem("user_id");
    token = localStorage.getItem("access_token");
    if (this.city === null || this.city === "unknown" || this.city === 'null') {
      this.getlocationApi();
    }


    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }


  }
  async fire() {
    const analytics = firebase.analytics();
    let token;
    this.city = localStorage.getItem("city");
    let country1 = localStorage.getItem("country");
    this.ip1 = localStorage.getItem("Ip");
    // console.log(this.city, this.ip1, "sa");
    var userid;
    userid = localStorage.getItem("user_id");
    token = localStorage.getItem("access_token");
    // firebase.analytics().setUserProperties({ id: token, deviceId: userid, country: country1, type: "website", city: this.city, userIp: this.ip1 })
    analytics.setUserProperties({ id: token, deviceId: userid, country: country1, type: "website", city: this.city, userIp: this.ip1 });
    // console.log(analytics);
  }
  // reference to search component to search by title  remove this code 
  @ViewChild(SearchComponent, { static: true })
  searchComponent: SearchComponent

  searchByTitle = (title) => {
    // her we check if title undefined we don't want to hit backend ,because it first key down on header component search
    // we getting undefined ,so if we don't want to do anything ....
    if (title !== undefined) {
      this.searchComponent.selectedText(title);
    }
  }
  public modals: any[] = [];

  @ViewChild('cont', { static: true }) cont;
  @ViewChild('conte', { static: true }) conte;
  // @Output() public suggestList1: string[];
  @ViewChild('myModal', { static: true }) myModal: ElementRef;

  ngAfterViewInit() {

    this.home();
    setTimeout(() => {
      this.myModal.nativeElement.click();
    }, 1000)

    // timer(500).subscribe(x => {

    // });
    // console.log(this.city, "resin");
    // let apiKey = "c22b2907cf01be91d3f1ad69a61418a4d92a349520a28f9e61430470";
    // var ew = localStorage.getItem('Ip');
    // // ' + ew + '?api-key=' + apiKey
    // //  https://api.ipdata.co/' + ew + '?api-key=' + apiKey
    // this.http.get('https://api.ipdata.co/' + ew + '?api-key=' + apiKey).subscribe(res => {
    //   console.log(res, "resde");
    // });

    var userid;
    userid = localStorage.getItem("user_id");
    if (userid === null) {
      this.openModal();
    }
    // this.openModal();
    // this.open('custom-modal-1');
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
  async home() {
    //  var x;
    // console.log("acb");
    await this.checkUser();
    // console.log("cc");
    this.fire();
  }
  openModal() {
    // this.modalService.open(this.cont, { centered: true, windowClass: "myCustomModalClass1" });
  }

  openModel2() {
    // console.log(this.suggestList);
    // this.suggestList1 = this.suggestList;
    // this.modalService.dismissAll(this.cont);
    // this.UserInterestList = null;
    this.UserInterestList.pop();

    this.suggestList.forEach(element1 => {
      // this.finalInterest.forEach(element => {
      //   // console.log(element['interest'], "1");
      //   if (element1 == element['interest']) {

      //     this.UserInterestList.push(element);
      //   }
      // });
    });
    // console.log(this.UserInterestList, "2");
    // this.modalService.open(this.conte, { centered: true, windowClass: "myCustomModalClass" });
  }

  open(id: string) {
    // open modal specified by id
    // console.log(id, "raes");
    let modal: any = this.modals.filter(x => x.id === id)[0] = id;
    // console.log(this.modals[0], "12");
    // console.log(modal, "raes");
    modal.open();
  }
  ngAfterContentChecked(): void {
    if (this.router.url == '/login' || this.router.url == '/register') {
      this.hideShowFooterHeader = false;
    } else {
      this.hideShowFooterHeader = true;
    }
    let res = this.router.url.substr(0, 7);
    let res2 = this.router.url.substr(0, 17);
    if (res == '/search' || this.router.url == '/profile/wish-list' || this.router.url == '/profile/wish-list'
      || this.router.url == '/profile/host-activities' || this.router.url == '/profile/join-activities' || this.router.url == '/' || this.router.url == '/news') {
      this.showSearchBar = true;
    } else {
      this.showSearchBar = false;
    }
    if (this.router.url !== '/search') {
      this.hostActivity = true;
    } else {
      this.hostActivity = false;
    }


    // this.getIP();

  }

  checkTrue(userVal: string) {


    // console.log(userVal, "check1");
    this.suggestList.forEach(element => {
      if (element === userVal) {
        // console.log("true");
        return true;
      }

    });

    // console.log("false");
    return false;


  }
  UserSugestedInterest(userVal: string) {
    // console.log(userVal, "jkl");
    // console.log(this.mySentences);
    // console.log();



    // this.mySentences.forEach(element => {

    //   if (element['interest'] === userVal) {
    //     element['checked'] = false;
    //   }
    // });

    this.suggestList.push(userVal);
    this.suggestList = this.suggestList.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.checkValue = false;

  }

  getlocationApi() {
    this.http.get("https://api.ipgeolocation.io/ipgeo?apiKey=db3763ef8f7c42b69a675557476299cc").subscribe((res: any) => {
      // console.log("1");
      // console.log(res);
      // console.log(res['ip']);
      // console.log(res['city']);
      // console.log(res['country_name']);
      localStorage.setItem(DBkeys.IP, res['ip']);
      localStorage.setItem(DBkeys.CITY, res['city'])
      this.city = res['city'];
      // console.log(response['sys'].country, "ini2");
      localStorage.setItem(DBkeys.COUNTRY, res['country_name']);



    });




    // 
    //   this.http.get("https://api.ipgeolocation.io/ipgeo?apiKey=efd24167bd734759ad0312c4e783ee92").subscribe((res: any) => {

    return true;

  }
  checkUser() {
    var accesstoken;
    accesstoken = localStorage.getItem("access_token");

    var location;
    location = localStorage.getItem("city");
    var device_type = "WEBSITE";
    if (accesstoken === null) {
      this.id = uuid.v1();
      this.srvEndpointFactory.getLoginEndpoint1(this.id, location, device_type).subscribe(res => {

        var accesstoken = res['response'].data['token'];
        // console.log(res['response'].data['token'], "fer");
        this.check = res;
        this.srvLocalStorageFactory.writeToken(accesstoken, this.id);
        // this.getSessionId(this.id);
      }, error => {

      });
    }
    else {

      // console.log(accesstoken, "2122");
      // console.log(this.id);
      // this.getSessionId(this.id);



    }
  }

  // func user session id 
  getSessionId = (id) => {
    // console.log(id, "exist");
    let session = localStorage.getItem("session_id");
    if (session === null) {
      this.srvLoggingService.GetSessionId1(id).subscribe(res => {
        this.UserSession = res['response'].data['session_id'];
        // console.log(this.UserSession);
        this.sessionId = this.UserSession;
        // writing session_id to local storage
        this.srvLocalStorageFactory.writeToLocalStorage(DBkeys.SESSION_ID, this.UserSession);

        if (this.sessionId) {
          this.userId = localStorage.getItem("user_id");

          if (!this.userId) {
            this.userId = "";
          }
          // call to getSavelogObject func to creat savelog object
          this.objSaveLog = this.getSavelogObject(this.userId, this.objUserDeviceIP.ip, this.url, this.objUserLocation.country,
            this.objUserLocation.city, this.controller, this.sessionId);
          // call to save log api
          if (this.objSaveLog) {
            // console.log(this.objSaveLog);
            this.getSavelog(this.objSaveLog);
          }
        }
      })
    }
    // else {
    //   this.objSaveLog = this.getSavelogObject(this.userId, this.objUserDeviceIP.ip, this.url, this.objUserLocation.country,
    //     this.objUserLocation.city, this.controller, this.sessionId);
    //   if (this.objSaveLog) {
    //     // console.log(this.objSaveLog);
    //     this.getSavelog(this.objSaveLog);
    //   }
    // }

  }

  // func to get location
  getDeviceLocation = (IP) => {
    this.srvAccountService.getUserLocationEndpoint(IP).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.objUserLocation = res;
      // write to localStorage
      this.srvLocalStorageFactory.writeUserLocationInfoTolcoalStorage(this.objUserLocation.ip,
        this.objUserLocation.country, this.objUserLocation.city);
      // call to func getSessionId
      // this.getSessionId();
    })
  }
  // func to make savelog object
  getSavelogObject = (userId, deviceIp, url, country, city, controller, sessionId) => {
    let obj = new ISavlog();
    obj.user_id = userId;
    obj.user_ip = this.ip1;
    obj.page = url + 'home';
    obj.country = this.city;
    obj.city = this.city;
    obj.controller = controller;
    obj.session_id = sessionId;
    return obj;
  }

  // func savelog to save
  getSavelog = (obj) => {
    // save device $ its location related info to db
    this.srvLoggingService.Route_SaveLogs(obj).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        });


      },
        err => {
          reject(err);
          // console.log(reject, "ii");
        });
    });


  }
  getIP() {

    // this.http.get("https://80ceb5md39.execute-api.us-east-1.amazonaws.com/test/helloworld").subscribe(res => {
    //   console.log(res);
    // });
    // const publicIp = require('public-ip');
    let publicIp;
    var x;
    (async () => {

      //=> '46.5.21.123'
      // x = await publicIp.v4();
      localStorage.setItem(DBkeys.IP, x);
      if (x === null) {
        // x = await publicIp.v6();
        localStorage.setItem(DBkeys.IP, x);
        // console.log(x, "x2");
      }

      //=> 'fe80::200:f8ff:fe21:67cf'
    })();



  }

  // fbLibrary() {

  //   (window as any).fbAsyncInit = function () {
  //     window['FB'].init({
  //       appId: '2205506036409861',
  //       cookie: true,
  //       xfbml: true,
  //       version: 'v3.1'
  //     });
  //     window['FB'].AppEvents.logPageView();
  //   };

  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));

  // }
  checkResponse() {

    // let xv = this.getPosition();
    // console.log(xv);
    // navigator.geolocation.watchPosition(res => {
    //   console.log(res['coords'].longitude);
    //   console.log(res['coords'].latitude);

    // });


    // this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDGYqy-W_qQTyrppD51-BF6rk0RtWozZho", { observe: 'response' })
    //   .subscribe(response => {
    //     this.addres = response;
    //     let latlng1 = this.addres['location'].lat + ',';
    //     latlng1 += this.addres['location'].lng;
    //     localStorage.setItem(DBkeys.LATLNG, latlng1);
    //     let key1 = "AIzaSyDGYqy-W_qQTyrppD51-BF6rk0RtWozZho";
    //     let data = new URLSearchParams();
    //     data.append('latlng', latlng1);
    //     data.append('key', key1);
    //     // console.log(latlng1);
    //     const params = {
    //       latlng: latlng1,
    //       key: key1
    //     }

    //     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //     const options = {};
    //     this.http.get("https://maps.googleapis.com/maps/api/geocode/json", { params: params, headers: headers }).subscribe(response => {
    //       let c = response['plus_code'].compound_code;
    //       // console.log(c);
    //       localStorage.setItem(DBkeys.COUNTRY, c);
    //       localStorage.setItem(DBkeys.CITY, c);
    //       // console.log(response, "finl");
    //     });


    //   });

    // this.http.get("https://geocode.xyz/33.6863232,73.0284032?json=1").subscribe(res => {
    //   console.log(res, "resde");
    // });

    // console.log("in");
    let checkAdd = localStorage.getItem('city');
    // if (checkAdd === null) {
    let latitude: number;
    let longitude: number;
    // console.log(navigator.geolocation.getCurrentPosition);
    // navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000})
    // navigator.geolocation.watchPosition(res => {
    //   // console.log(res, "resd");
    //   longitude = res['coords'].longitude;
    //   latitude = res['coords'].latitude;
    //   // console.log(latitude, longitude, "resd");
    //   this.http.get('https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude).subscribe
    //     (response => {
    //       // https://geocode.xyz/33.6863232,73.0284032?geoit=json
    //       if (response['name'] === 'Shuzenji' && response['sys'].country === 'JP') {
    //         // console.log("oh issue");
    //         localStorage.setItem(DBkeys.CITY, null)
    //         localStorage.setItem(DBkeys.COUNTRY, null);
    //       }
    //       else {

    //         // console.log(response, "ini");
    //         // console.log(response['name'], "ini1");
    //         localStorage.setItem(DBkeys.CITY, response['name'])
    //         // console.log(response['sys'].country, "ini2");
    //         localStorage.setItem(DBkeys.COUNTRY, response['sys'].country);
    //       }

    //     });
    // });

    // let apiKey="c22b2907cf01be91d3f1ad69a61418a4d92a349520a28f9e61430470";

    // this.http.get('https://api.ipdata.co?api-key='+ apiKey).subscribe(res=>{
    // console.log(res,"resde");
    // });


  }

  selectUserInterest(userInterest: string, interest: string) {


    if (this.user_interest[interest]) {
      if (this.user_interest[interest].includes(userInterest)) {
        var filteredAry = this.user_interest[interest].filter(e => e !== userInterest);
        this.user_interest[interest] = filteredAry;
      } else {
        this.user_interest[interest].push(userInterest);

      }
    }
    else {
      this.user_interest[interest] = [];
      this.user_interest[interest].push(userInterest);
    }



  }

  finalFunction() {
    let final;
    // let is_new_api: true;
    let objes: any[] = [];
    // this.modalService.dismissAll(this.conte);

    let res = localStorage.getItem('interest');
    res = JSON.parse(res);
    for (let i = 0; i < res.length; i++) {
      for (let l = 0; l < this.suggestList.length; l++) {
        if (res[i] === this.suggestList[l]) {
          // console.log(this.suggestList[i]);
          // console.log(i);
          objes.push(i);

        }
      }
    }
    // let objes = this.user_interest; 

    // console.log(this.user_interest, objes);
    // var jsonString = JSON.stringify(objes);
    // console.log(objes, "1");
    // console.log(jsonString, "2");
    final = objes;
    let access_token = this.srvLocalStorageFactory.getTokenFromLocalStorage();
    // console.log(access_token);
    this.srvAccountService.addUserInterestEndpoint(final, access_token).subscribe(res => {
      // console.log(res);
    })

  }




  // 2: "Outdoor Activities"
  // 3: "Family & Kids"
  // 4: "Health and Fitness"
  // 5: "Socialization and Networking"
  // 6: "Sightseeing & Tourism"
  // 7: "Arts and Performance"
  // 8: "Shopping & Fashion"
  // 9: "Tech and workshops"
  // 10: "Food and festival"
  // 11: "Politics"
  // 12: "Charity and Volunteer work"
  // 13: "Books and hobbies"
  // 14: "Others"

}
