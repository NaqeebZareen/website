import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
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
// // console.log(firebase)
// firebase.initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http: HttpClient, private srvApiEndpointService: ApiEndPointService) {

    // const analytics = firebase.analytics();
  }

  Route_SaveLogs = (data) => {


    // console.log(data, "route");
    // console.log(data['user_ip'], "in rout");

    let page; let controller; let sessionId; let deviceType; let userIp; let city;
    let country;
    // console.log(data['page']);
    // userIp = data['user_ip'];
    userIp = '192.168.1.7'
    page = data['page'] || "landing page";
    controller = data['controller'] || "unknown";
    sessionId = data['session_id'] || localStorage.getItem("session_id");
    deviceType = "website";
    city = data['city'] || "islamabad";
    country = data['country'] || "pak";
    let userid = localStorage.getItem("user_id");
    let token = localStorage.getItem("access_token");
    // const analytics = firebase.analytics();
    // 'id': token, 'deviceId': userid, 'country': country1, 'type': "website"  'city': this.city1, 'userIp': this.ip1
    // analytics.setUserProperties({id: token, deviceId: userid, userIp: userIp, city: city, country:country, page: page, controller: controller, sessionId: sessionId, type: deviceType });
    // firebase.analytics().logEvent('Home_Screen_open', {
    //   id: token,
    //   deviceId: userid,
    //   city: city, country: country, page: page, controller: controller, sessionId: sessionId, type: deviceType
    // });

    var authorization = localStorage.getItem("access_token");

    authorization = 'Bearer ' + authorization;
    // localStorage.clear();
    // authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.N2QzNzFmYzAtMjBkYy0xMWVhLTk4OWQtYzliYmFiMzhiNzYz.g2GThtju0vmF3KT79f9ho697dRa6CZD8RUEBIARfKTo";
    // console.log(authorization, "2nd1");
    // const httpLoginHeader = {
    //   headers: new HttpHeaders({
    //     "Content-ype": "application/json",
    //     Authorization: authorization
    //   })
    // };
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.SavelogEndpointUrl, { userIp, page, controller, sessionId, deviceType, city, country });

  }

  Event_SaveLogs = (data) => {
    let page; let controller; let sessionId; let deviceType; let userIp; let city;
    let country; let action; let category; let totaltime;

    userIp = data['user_ip'];
    action = data['action'];
    category = data['category'];
    page = data['page'];
    controller = data['controller'];
    sessionId = data['session_id'];
    deviceType = "web";
    city = data['city'];
    country = data['country'];
    userIp = data['user_ip'];
    page = data['page'];
    controller = data['controller'];
    sessionId = data['session_id'];
    deviceType = "web";
    city = data['city'];
    country = data['country'];
    totaltime = data['totaltime'];
    let userid = localStorage.getItem("user_id");
    let token = localStorage.getItem("access_token");
    // 'id': token, 'deviceId': userid, 'userIp': userIp, 'city': city, 'country':country, page: 'page', controller: 'controller', sessionId: 'sessionId', type: 'deviceType'
    // const analytics = firebase.analytics();
    // analytics.setUserProperties({ id: token, deviceId: userid, userIp: userIp, country:country, city: city, page: page, controller: controller, sessionId: sessionId, deviceType: deviceType, action: action, category: category, timeStamp: totaltime });
    // firebase.analytics().logEvent('Click_Events', {
    //   id: token,
    //   deviceId: userid,
    //   userIp: userIp, country: country, city: city, page: page, controller: controller, sessionId: sessionId, deviceType: deviceType, action: action, category: category, timeStamp: totaltime
    // });
    var authorization = localStorage.getItem("access_token");
    authorization = 'Bearer ' + authorization;
    // console.log(authorization, "2nd1");
    const httpLoginHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };

    // console.log(data, "evet1");
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.EventSaveLogEndpointUrl, { action, category, userIp, page, controller, sessionId, deviceType, city, country, httpLoginHeader });
  }


  Add_Activity_View = (totaltime, activityId) => {
    // console.log(totaltime, activityId);
    var sessionId = localStorage.getItem("session_id");;
    var authorization = localStorage.getItem("access_token");
    let timesViewed = totaltime;
    let timeSpent = totaltime;
    let deviceType = "website";
    authorization = 'Bearer ' + authorization;
    // console.log(authorization, "2nd1");
    const httpLoginHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };

    // console.log("evet1", sessionId, authorization);
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.AddActivityViewURL, { timesViewed, timeSpent, sessionId, deviceType, activityId });
  }
  Add_Activity_Visited = (activityId) => {
    // console.log(activityId);
    var sessionId = localStorage.getItem("session_id");;
    var authorization = localStorage.getItem("access_token");
    // let timesViewed = totaltime;
    // let timeSpent = totaltime;
    var isVisited = "true";
    let deviceType = "website";
    authorization = 'Bearer ' + authorization;
    // console.log(authorization, "2nd1");
    const httpLoginHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };

    // console.log("evet1", sessionId, authorization);
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.AddActivityVisitedURL, { isVisited, sessionId, deviceType, activityId });
  }

  Add_Filters = (searchPhrase, date, interest, city) => {

    var sessionId = localStorage.getItem("session_id");;
    var authorization = localStorage.getItem("access_token");
    // let timesViewed = totaltime;
    // let timeSpent = totaltime;
    let dates = [];

    let interests = [];
    var city1 = localStorage.getItem("city");
    // console.log(city1);
    // debugger;
    if (city === "" || city === undefined || city === null) {
      city = city1;
    }
    dates.push(date);
    interests.push(interest);
    var isVisited = "true";
    let deviceType = "website";
    authorization = 'Bearer ' + authorization;

    // console.log(authorization, "2nd1");
    const httpLoginHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };

    // console.log("evet1", dates, interests);
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.AddFilters, { searchPhrase, sessionId, deviceType, dates, interests, city });
  }
  Application_SaveLogs = (data) => {
    // console.log(data, "app");
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.ApplicationSaveLogEndpointUrl, data);

  }
  GetSessionId() {
    return this.http.get(this.srvApiEndpointService.apiEndPoints.LoggingFactory.GetSessionIdEndpointUrl);
  }
  GetSessionId1 = (device_id) => {
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
      })
    };
    // console.log(deviceID, "i function");
    return this.http.post(this.srvApiEndpointService.apiEndPoints.LoggingFactory.GetSessionIdEndpointUrl, { device_id, httpAuthenticationHeader });
  }
}
