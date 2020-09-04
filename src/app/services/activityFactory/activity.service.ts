import { Injectable, Output, EventEmitter, Directive } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
import { IActivity } from 'src/app/models/activity';
import { IResponse } from 'src/app/models/response';
import { IJoinedResponse } from 'src/app/models/joined-response';
import { formatDate } from '@angular/common';
// OBSERVABLES
// const httpOptions = {
//   headers: new HttpHeaders({ "content-type": "application/json" })
// };
@Directive()
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private resObj;

  constructor(private http: HttpClient, private srvApiEndpointService: ApiEndPointService) { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() changeCity: EventEmitter<boolean> = new EventEmitter();

  // these 2 methods is used to communicate date between header and search componenet
  getResultByTitleHelper = (title) => {
    this.change.emit(title);
    // console.log(title);
  }

  getResultByCityHelper = (city) => {
    this.changeCity.emit(city);
  }


  getResultEndPointSecond = (categories, city, records_per_page, page_no) => {
    let body;
    body = {
      categories: categories,
      city: city,

      records_per_page: records_per_page,
      page_no: page_no,

    };

    return this.http.post<any>(this.srvApiEndpointService.apiEndPoints.Activity.GetResultEndpointUrl, body);
  }
  getResultEndpoint = (data) => {


    // debugger;
    // console.log(data);

    var city = localStorage.getItem("headercity");
    // console.log(city);
    // console.log(data);
    if (city === null || city === undefined) {
      city = "San Francisco";
    }
    if (data['categories'].length === 0) {
      if (data.city.length === 1 && data.date_range === null) {
        // console.log(data.cities);
        data.city = "San Francisco";
      }
      if (city != null) {
        data.city = city;
      }
      // console.log(data);
      let body;

      // debugger;
      // console.log(data.date_range);
      if (data['date_range'].length === 1) {
        body = {
          date: data['date_range'][0],
          city: data['city'],
          text: data['title'],
          records_per_page: data['records_per_page'],
          page_no: data['page_no'],

        };
      }
      else if (data['date_range'].length === 2) {
        body = {
          date_range: data['date_range'],
          city: data['city'],
          text: data['title'],
          records_per_page: data['records_per_page'],
          page_no: data['page_no'],

        };
      }
      else if (data['date_range'].length === 0) {
        body = {
          // date_range: data['date_from'],
          city: data['city'],
          text: data['title'],
          records_per_page: data['records_per_page'],
          page_no: data['page_no'],

        };
      }



      // if (data['date_range'].length === 0) {


      //   delete data['date_range'];
      // }
      data = JSON.parse(JSON.stringify(data), (key, value) => {
        if (value == null || value == '' || value == [] || value == {})
          return undefined;
        return value;
      })


      return this.http.post<any>(this.srvApiEndpointService.apiEndPoints.Activity.GetResultEndpointUrl, body);
    }
    else {
      if (city != null) {
        data.city = city;
      }
      else {
        data.city = "San Francisco";
      }
      // console.log(data['date_range'].length);


      // this.rem(data);
      data = JSON.parse(JSON.stringify(data), (key, value) => {
        if (value == null || value == '' || value == [] || value == {})
          return undefined;
        return value;
      })

      return this.http.post<any>(this.srvApiEndpointService.apiEndPoints.Activity.GetResultEndpointUrl, data);
    }


  }

  rem = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') this.rem(obj[key]);
      else if (obj[key] === undefined) delete obj[key];
      else if (obj[key] === []) delete obj[key];
    });
    return obj;
  };

  removeEmptyStringsFrom(obj) {

    Object.entries(obj).forEach(([key, val]) => val === '' && delete obj[key]);
    return obj;
  }

  getActivityDetailEndpoint = (activityID) => {
    return this.http.get<IActivity>(this.srvApiEndpointService.apiEndPoints.Activity.GetActivityDetailEndpointUrl + activityID);
  }

  getActivityDetailUserEndpoint = (activityID) => {
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(activityID);
    // let httpAuthenticationHeader = {
    //   headers: new HttpHeaders({
    //     "content-type": "application/json",
    //     Authorization: authorization
    //   })
    // };
    return this.http.get<IActivity>(this.srvApiEndpointService.apiEndPoints.Activity.GetActivityDetailUserEndpointUrl + '?' + 'activity_id=' + activityID);
  }

  getTextSearchEndpoint = (data) => {
    return this.http.get<IActivity>(this.srvApiEndpointService.apiEndPoints.Activity.GetSearchEndpointUrl + data);
  }

  getPopularActivitiesEndpoint = () => {
    return this.http.get<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetPopularActivitiesEndpointUrl);
  }

  getActivitiesHappeningIn24Hours = (city, text) => {


    return this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.GetActivitiesIn24HoursEndPoint, { city, text });
  }
  getRecomendedActivitiesEndpoint = async (authorization) => {
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    let is_new_api;
    is_new_api = true;
    let cities: string[] = [];
    let city = localStorage.getItem('city');
    // console.log(city);
    if (city === "San Francisco" || city === 'London') {
      cities.push(city);
    }
    else {
      cities.push("San Francisco");
    }
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    let response = await this.http.post<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetRecomendedActivitiesEndpointUrl, { cities, is_new_api, httpAuthenticationHeader });
    this.resObj = response;
    return response;
  }
  getWishlistNewsEndPoint = () => {

    return this.http.get(this.srvApiEndpointService.apiEndPoints.News.GetNewsWishListEndPoint);
  }
  getmyWishlistEndpoint = (authorization) => {
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    return this.http.get<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetmyWishlistEndpointUrl);
  }

  getImpressionEndpoint = (data) => {
    return this.http.get<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetImpressionEndpointUrl + data);
  }

  addImpressionEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.AddImpressionEndpointUrl, data);
  }

  addJionEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.AddjoinEndpointUrl, data);
  }

  getUserJoinedorLikedorNotEndpoint = (data) => {
    return this.http.get<IResponse>(this.srvApiEndpointService.apiEndPoints.Activity.GetUserJoinedorLikedorNotUrl + data)
  }

  getJoinsEndpoint = (data) => {
    return this.http.get<IJoinedResponse>(this.srvApiEndpointService.apiEndPoints.Activity.GetjoinEndpointUrl + data)
  }

  getPopularActivities2Endpoint = () => {
    return this.http.get<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetPopularActivities2EndpointUrl);
  }

  getPopularActivities3Endpoint = () => {
    return this.http.get<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetPopularActivities3EndpointUrl);
  }

  getPopularActivitiesLogedInEndpoint = (userId) => {
    return this.http.get<IActivity[]>(this.srvApiEndpointService.apiEndPoints.Activity.GetPopularActivitiesLogedInUrl + userId);
  }

  getNewlyAddedActivities = async () => {

    let is_new_api;
    is_new_api = true;
    let page_no = 1;
    // console.log("new");
    let cities: string[] = [];
    let city = localStorage.getItem('city');
    if (city === "San Francisco" || city === 'London') {
      cities.push(city);
    }
    else {
      cities.push("San Francisco");
    }

    let httpAuthenticationHeader = {

      headers: new HttpHeaders({
        "content-type": "application/json",
      })
    };
    let response = await this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.getNewlyAddedActivitiesURL, { page_no, cities, is_new_api, httpAuthenticationHeader }).toPromise();

    return response;
    // }

  }
  //  var city = localStorage.getItem("headercity");
  // if (data['categories'].length === 0) {
  //   if (data.city.length === 1 && data.date_range === null) {
  //     // console.log(data.cities);
  //     data.city = "San Francisco";
  //   }
  //   if (city != null) {
  //     data.city = city;
  //   }


  getNewsListing = (records_per_page, text, city1, page_no) => {

    let city = localStorage.getItem("headercity");
    // console.log(city);
    // console.log(city1);
    if (city === null || city === undefined) {
      city = "San Francisco";
    }



    var publication_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let response = this.http.post(this.srvApiEndpointService.apiEndPoints.News.NewsListingEndPoint, { page_no, city, records_per_page, text });

    return response;

  }
  getActivitiesListing = async (city1, interest) => {

    // console.log(city1, interest);
    let is_new_api;
    is_new_api = true;
    let page_no = 1;
    // console.log("new");
    let cities: string[] = [];
    let city = city1;
    if (city === "San Francisco" || city === 'London') {
      cities.push(city);
    }
    else {
      cities.push("San Francisco");
    }

    let httpAuthenticationHeader = {

      headers: new HttpHeaders({
        "content-type": "application/json",
      })
    };
    let response = await this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.getNewlyAddedActivitiesURL, { page_no, cities, interest, is_new_api, httpAuthenticationHeader }).toPromise();

    return response;
    // }

  }
  getAllLoginPopularActivitiesEndpoint = () => {

    let is_new_api;
    is_new_api = true;
    // console.log("new");
    let cities: string[] = [];
    let city = localStorage.getItem('city');
    if (city === "San Francisco" || city === 'London') {
      cities.push(city);
    }
    else {
      cities.push("San Francisco");
    }
    let httpAuthenticationHeader = {

      headers: new HttpHeaders({
        "content-type": "application/json",
      })
    };
    let response = this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.GetAllLoginPopularActivitiesUrl, { cities, is_new_api, httpAuthenticationHeader }).toPromise();

    return response;
    // }



  }

  addToWishlistEndpoint = (data) => {
    let activityId = data;
    // console.log("in wishlist");
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.AddWishlistEndpointUrl, { activityId });
  }

  addToWishlistEndpointDelete = (data) => {
    let activityId = data;
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(data);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization,
        "activityId": activityId
      }),
      body: {
        activityId: activityId
      },
    };

    let body;
    let httpParams = new HttpParams().set('activityId', activityId);


    let options = { params: httpParams };


    return this.http.delete(this.srvApiEndpointService.apiEndPoints.Activity.DeleteWishlistEndPointUrl, httpAuthenticationHeader);
  }
  addNewsToWishlistEndpoint = (data) => {
    let news_id = data;
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    return this.http.post(this.srvApiEndpointService.apiEndPoints.News.AddNewsToWishListEndPoint, { news_id, httpAuthenticationHeader });
  }

  addVoteToNewsEndPoint = (news_id) => {
    news_id = parseInt(news_id);
    let authorization = localStorage.getItem('access_token');
    // authorization = "Bearer " + authorization;
    // var headers = new Headers();
    // headers.append("Authorization", "Bearer " + authorization);
    return this.http.patch(this.srvApiEndpointService.apiEndPoints.News.AddVoteToNewsEndpoint, { news_id });
  }

  deleteUpVoteEndPoint = (news_id) => {
    news_id = parseInt(news_id);
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(data);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization,
        "news_id": news_id
      }),
      body: {
        news_id: news_id
      },
    };
    return this.http.delete(this.srvApiEndpointService.apiEndPoints.News.DeleteUpVoteEndPoint, httpAuthenticationHeader);
  }
  addNotSureVoteEndPoint = (news_id) => {
    news_id = parseInt(news_id);
    return this.http.patch(this.srvApiEndpointService.apiEndPoints.News.AddNotSureVoteEndPoint, { news_id });
  }
  deleteNotSureVoteEndPoint = (news_id) => {
    news_id = parseInt(news_id);
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(data);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization,
        "news_id": news_id
      }),
      body: {
        news_id: news_id
      },
    };
    return this.http.delete(this.srvApiEndpointService.apiEndPoints.News.DeleteNotSureVoteEndPoint, httpAuthenticationHeader);

  }
  deleteDownVoteEndPoint = (news_id) => {
    news_id = parseInt(news_id);
    // console.log("delete call", news_id);
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(data);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization,
        "news_id": news_id
      }),
      body: {
        news_id: news_id
      },
    };
    return this.http.delete(this.srvApiEndpointService.apiEndPoints.News.DeleteDownVoteEndPoint, httpAuthenticationHeader);
  }

  downVoteOfNewsEndPoint = (news_id) => {
    news_id = parseInt(news_id);
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(authorization);
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + authorization);
    return this.http.patch(this.srvApiEndpointService.apiEndPoints.News.DownVoteOfNewsEndPoint, { news_id });
  }
  newsToWishlistEndpointDelete = (data) => {
    let news_id = data;
    let authorization = localStorage.getItem('access_token');
    authorization = "Bearer " + authorization;
    // console.log(data);
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization,
        "news_id": news_id
      }),
      body: {
        news_id: news_id
      },
    };

    // let body;
    // let httpParams = new HttpParams().set('news_id', news_id);


    // let options = { params: httpParams };


    return this.http.delete(this.srvApiEndpointService.apiEndPoints.News.DeleteNewsFromWishlistEndPoint, httpAuthenticationHeader);
  }

  interestCheck = () => {


    this.getAllLoginPopularActivitiesEndpoint();

  }
}
