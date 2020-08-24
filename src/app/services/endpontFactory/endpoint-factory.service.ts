import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, timer } from 'rxjs';
import { JwtHelper } from '../jwtHelper/jwt-helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IToken } from 'src/app/models/token';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
import { IRefreshTokenRequestModel } from 'src/app/models/refresh-token-request-model';
import { LocalStorageFactoryService } from '../localStorageFactory/local-storage-factory.service';
import { DBkeys } from '../dbkeys/db-keys';
import { IRefreshTokenResponseModel } from 'src/app/models/refresh-token-response-model';
import { map, share, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpLoginHeader = {
  headers: new HttpHeaders({
    "content-type": "application/x-www-form-urlencoded"
  })
};

@Injectable({
  providedIn: 'root'
})

export class EndpointFactoryService {

  public location: any;

  constructor(private http: HttpClient,
    private srvApiEndpointService: ApiEndPointService, private srvLocalStoragefactory: LocalStorageFactoryService,
    private router: Router) { }

  public isLoginSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn = () => {
    let islogin$ = this.isLoginSubject.asObservable().pipe(share());
    return islogin$;
  }

  getLoginEndpoint = (email) => {
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/x-www-form-urlencoded",
        Authorization: authorization
      })
    };
    // console.log(email);
    // console.log(this.srvApiEndpointService.apiEndPoints.EndpointFactory.LoginEndpointUrl);
    return this.http.post(this.srvApiEndpointService.apiEndPoints.EndpointFactory.LoginWithEmail, { email });

  }

  sendVerificationCode = (x, email) => {
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
      })
    };
    // console.log(email, x);
    let security_code = x;
    let location; let device_id; let device_type;
    location = localStorage.getItem("city");
    if (location == null) {
      location = "unknown";
    }
    device_id = localStorage.getItem("user_id");
    device_type = "WEBSITE";
    if (device_id == null) {
      device_id = " ";
    }
    // console.log(security_code);
    // console.log(this.srvApiEndpointService.apiEndPoints.EndpointFactory.LoginEndpointUrl);
    return this.http.post(this.srvApiEndpointService.apiEndPoints.EndpointFactory.VerificationCode, { security_code, email, device_type, device_id });

  }
  getLoginEndpoint1 = (device_id, location, device_type) => {
    // console.log(location);
    // console.log(location);
    // console.log(device_id);


    if (location == null) {
      location = "unkown";
    }
    let city = location;
    let country = location;
    return this.http.post<IToken>(this.srvApiEndpointService.apiEndPoints.EndpointFactory.LoginEndpointUrl, { device_id, device_type, city, country });

  }
  getlocationApi = () => {
    this.http.get("https://api.ipgeolocation.io/ipgeo?apiKey=db3763ef8f7c42b69a675557476299cc").subscribe((res: any) => {
      // console.log("1");
      // console.log(res);
      // console.log(res['ip']);
      // console.log(res['city']);
      // console.log(res['country_name']);
      this.location = res['city'];
      localStorage.setItem(DBkeys.IP, res['ip']);
      localStorage.setItem(DBkeys.CITY, res['city']);

      // this.city = res['city'];
      // console.log(response['sys'].country, "ini2");
      localStorage.setItem(DBkeys.COUNTRY, res['country_name']);



    });
  }
  getTokenRefreshEndpoint = () => {

    // var refreshTokenObj = new IRefreshTokenRequestModel();
    // refreshTokenObj.refresh_token = this.srvLocalStoragefactory.getfromLocalStorage(DBkeys.REFRESH_TOKEN);
    // refreshTokenObj.grant_type = DBkeys.GRANTE_TYPE;
    // refreshTokenObj.client_secret = DBkeys.CLIENT_SECRET;
    // refreshTokenObj.client_id = DBkeys.CLINET_ID;

    // return this.http.post<IRefreshTokenResponseModel>(this.srvApiEndpointService.apiEndPoints.EndpointFactory.RefreshTokenEndpointUrl, refreshTokenObj)
    //   .pipe(
    //     map(res => {
    //       if (res && res.access_token) {
    //         this.srvLocalStoragefactory.writeTokenToLocalStorage(res.access_token, res.refresh_token, res.expires_in);
    //       }
    //       return <IRefreshTokenResponseModel>res;
    //     })
    //   );
  }

  getSocialLoginEndpoint = (email) => {


    let location; let device_id; let device_type;
    location = localStorage.getItem("country");
    device_id = localStorage.getItem("user_id");
    var city = location;
    var country = location;


    if (location == null) {
      location = "unknown";
    }
    if (device_id == null) {
      device_id = "unknow";
    }
    device_type = "WEBSITE";

    return this.http.post(this.srvApiEndpointService.apiEndPoints.EndpointFactory.SocialLoginEndpointUrl, { email, country, city, device_id, device_type });
  }

  getRegisterLoginEndpoint = (data) => {
    return this.http.post<any>(this.srvApiEndpointService.apiEndPoints.EndpointFactory.RegisterEndpointUrl, data);
  }

  getForgetPasswordEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.EndpointFactory.ForgetPasswordEndpointUrl, data);
  }
}
