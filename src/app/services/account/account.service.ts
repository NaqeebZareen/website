import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelper } from '../jwtHelper/jwt-helper.service';
import { HttpClient, HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
import { IInterest } from 'src/app/models/interest';
import { ICity } from '../../models/city';
import { IUser } from '../../models/user';
import { ILocation } from 'src/app/models/location';
import { IDeviceIp } from 'src/app/models/device-ip';
import { lstatSync } from 'fs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  someDataObservable: Observable<any>;
  someDataCitiesObservable: Observable<any>;
  constructor(private srvJwtHelperService: JwtHelper, private http: HttpClient, private srvApiEndpointService: ApiEndPointService,
    private handler: HttpBackend, private httpClient: HttpClient) {
    this.httpClient = new HttpClient(handler);
  }

  getUserInterestsEndpoint = () => {
    return this.http.get<IInterest[]>(this.srvApiEndpointService.apiEndPoints.Account.UserInterestEndpointUrl);
  }

  // getUKanTargetedCities = () => {

  //   return this.http.get<ICity[]>(this.srvApiEndpointService.apiEndPoints.Account.UKanTargetedCitiesEndpointUrl);
  // }

  getUKanTargetedCities(): Observable<any> {

    if (this.someDataCitiesObservable) {
      // console.log("2nd");
      // console.log(this.someDataCitiesObservable, "11");
      return this.someDataCitiesObservable;
    } else {
      // console.log("first");

      this.someDataCitiesObservable = this.http.get<ICity[]>(this.srvApiEndpointService.apiEndPoints.Account.UKanTargetedCitiesEndpointUrl).pipe(share());
      // console.log(this.someDataCitiesObservable, "12");
      return this.someDataCitiesObservable;
    }
  }

  addUserInterestEndpoint = (user_interests, authorization) => {
    authorization = "Bearer " + authorization;
    let is_new_api: Boolean;
    // console.log(authorization);
    is_new_api = true;
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })


    };
    // console.log(user_interests);
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Account.AddUserInterestsEndpointUrl, {
      user_interests, is_new_api, httpAuthenticationHeader
    });
  }
  getUserInterestEndpoint = (authorization) => {
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    // console.log(user_interests);
    return this.http.get(this.srvApiEndpointService.apiEndPoints.Account.getUserInterestsEndpointUrl, httpAuthenticationHeader);
  }

  addUserVisitedCittiesEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Account.AddUserInterestCitiesEndpointUrl, data.toString());
  }

  getUserIpEndpoint = () => {
    return this.http.get<IDeviceIp>(this.srvApiEndpointService.apiEndPoints.Account.UserIPEndpointUrl);
  }
  getUserLocationEndpoint = (Ip) => {
    return this.httpClient.get<ILocation>(this.srvApiEndpointService.apiEndPoints.Account.UserLocationEndpointUrl + Ip + "/json");
  }

  getCurrencyEndpoint = (data) => {
    return this.http.get(this.srvApiEndpointService.apiEndPoints.Account.UserCountryCurrencyEndpointUrl + data);
  }

  getUserProfileInfoEndpoint = (authorization) => {

    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    return this.http.get(this.srvApiEndpointService.apiEndPoints.Account.UserProfileInfoEndpointUrl, httpAuthenticationHeader);
  }

  updateUserProfileEndpoint = (first_name, last_name, picture, authorization) => {
    // console.log(first_name, last_name, picture);
    let httpParams = new HttpParams().set('first_name', first_name);
    httpParams.set('last_name', last_name);
    httpParams.set('picture', picture);
    let options = { params: httpParams };
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/x-www-form-urlencoded",
        Authorization: authorization
      }),
      first_name: first_name,
      last_name: last_name,
      picture: picture

    };
    return this.http.put(this.srvApiEndpointService.apiEndPoints.Account.UpdateUserProfileEndpointUrl, httpAuthenticationHeader);
  }

  getLocalTimeZoneEndpoint = (data) => {
    return this.http.get("https://maps.googleapis.com/maps/api/timezone/json?" + data);
  }

  getCoordinate_CityEndpoint = (data) => {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?&address=" + data)
  }

  getInterestList(): Observable<any> {
    if (this.someDataObservable) {
      // console.log("2nd");
      return this.someDataObservable;
    } else {
      // console.log("first");
      this.someDataObservable = this.http.get(this.srvApiEndpointService.apiEndPoints.Account.InterestEndpointUrl).pipe(share());
      return this.someDataObservable;
    }
  }

  getInterestIndexList = (city) => {
    if (city === null || city === undefined) {
      city = "San Francisco";
    }
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Account.InterestIndexEndpointUrl, { city });
  }
}
