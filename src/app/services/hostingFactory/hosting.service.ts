import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
import { IActivity } from 'src/app/models/activity';
import { NewsDetail } from 'src/app/models/news-details';
import { ImpressionResponse } from 'src/app/models/impression-response';
import { IJoinedResponse } from 'src/app/models/joined-response';

@Injectable({
  providedIn: 'root'
})
export class HostingService {

  constructor(private http: HttpClient, private srvApiEndpointService: ApiEndPointService) { }

  getallHostingactivitiesEndpoint = (userID, pageSize, offset) => {
    return this.http.get<IActivity>(
      this.srvApiEndpointService.apiEndPoints.HostingActivities.GetAllHostingActivitiesEndpointUrl + `${userID}&size=${pageSize}&offset=${offset}`)
  }

  getHostingActivitiesEndpoint = () => {
    return this.http.get<IActivity[]>(
      this.srvApiEndpointService.apiEndPoints.HostingActivities.GetHostingActivitiesEndpointUrl);
  }

  getHostingActivitiesDetailsEndpoint = (activityID) => {
    return this.http.get<IActivity[]>(
      this.srvApiEndpointService.apiEndPoints.HostingActivities.GetHostingActivityDetailEndpointUrl + activityID);
  }
  getHostingNewsDetailsEndpoint = (news_id) => {
    return this.http.get<NewsDetail[]>(
      this.srvApiEndpointService.apiEndPoints.News.NewsDetailEndPoint + '?' + 'news_id=' + news_id);
  }

  getSelectedActivitiesEndpoint = () => {
    return this.http.get(this.srvApiEndpointService.apiEndPoints.HostingActivities.GetSelectedActivitiesEndpointUrl);
  }

  AddImpressionHostingEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.HostingActivities.AddImpressionHostingEndpointUrl, data)
  }

  getImpressionHostingEndpoint = (data) => {
    return this.http.get<ImpressionResponse>(this.srvApiEndpointService.apiEndPoints.HostingActivities.GetImpressionHostingEndpointUrl + data);
  }

  createActivityEndpoint = (data, authorization) => {
    //   console.log(data, authorization, "view");

    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    return this.http.post(this.srvApiEndpointService.apiEndPoints.HostingActivities.CreateActivityEndpointUrl, data, httpAuthenticationHeader);
  }

  getsearchActivityEndpoint = (data) => {
    return this.http.get(this.srvApiEndpointService.apiEndPoints.HostingActivities.SearchActivityEndpointUrl);
  }

  updateActivityEndpoint = (data, authorization) => {
    // console.log(data, authorization, "view");
    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: authorization
      })
    };
    return this.http.post(this.srvApiEndpointService.apiEndPoints.HostingActivities.UpdateActivityEndpointUrl, data, httpAuthenticationHeader);
  }

  addJoinHostingEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.HostingActivities.AddJoinHostingEndpointUrl, data);
  }

  getActivityHostedDetails = (activityHostedId) => {
    return this.http.get<Response>(
      this.srvApiEndpointService.apiEndPoints.HostingActivities.GetActivityHostedDetailsEndpointUrl + activityHostedId);
  }

  getUserJoinedorLikedorNotHostingEndpoint = (data) => {
    return this.http.get<Response>(
      this.srvApiEndpointService.apiEndPoints.HostingActivities.GetUserJoinedorLikedorNotHostingEndpointUrl + data);
  }

  getJoinsHostingEndpoint = (data) => {
    return this.http.get<IJoinedResponse>(
      this.srvApiEndpointService.apiEndPoints.HostingActivities.GetJoinsHostingEndpointUrl + data);
  }

}
