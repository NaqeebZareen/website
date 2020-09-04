import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndPointService {

  private RootUrl = 'https://api.youcan.tech';
  private PaymentRootUrl = "https://payment.youcan.tech";
  private root2 = 'https://api.youcan.tech';
  private root3 = 'https://api.youcan.tech';
  constructor() {


  }

  public apiEndPoints = {
    'Account': {
      'UserInterestEndpointUrl': this.root2 + '/api/v4/home-screen',
      'InterestEndpointUrl': this.root2 + '/api/v4.1/home',
      'UKanTargetedCitiesEndpointUrl': this.root2 + '/api/v4.1/home',
      'AddUserInterestsEndpointUrl': this.root2 + '/api/v4/user/interests/add',
      'getUserInterestsEndpointUrl': this.root2 + '/api/v4/user/interests',
      'AddUserInterestCitiesEndpointUrl': this.RootUrl + '/api/v1/user/addusercities',
      'UserIPEndpointUrl': 'https://api.ipify.org?format=json',
      'UserLocationEndpointUrl': 'https://ipapi.co/',
      'UserCountryCurrencyEndpointUrl': 'https://restcountries.eu/rest/v1/alpha/',
      'UserProfileInfoEndpointUrl': this.root2 + '/api/v4.1/user/profile',
      'UpdateUserProfileEndpointUrl': this.root2 + '/api/v4.1/user/profile/update',
      'GetLocalTimeZoneEndpointUrl': 'https://maps.googleapis.com/maps/api/timezone/json?',
      'GetCoordinateCitiesEndpointUrl': 'https://maps.googleapis.com/maps/api/geocode/json?&address=',
      'InterestIndexEndpointUrl': this.root2 + '/api/v4.1/activity/count'
    },
    'EndpointFactory': {
      'LoginEndpointUrl': this.root2 + '/api/v4.1/auth/user-token',//http://35.243.244.31:3000/api/v4/auth/token
      'LoginWithEmail': this.root2 + '/api/v4.1/auth/register',
      'RefreshTokenEndpointUrl': this.root2 + '/api/v4.1/auth/user-token',
      'RegisterEndpointUrl': this.RootUrl + '/api/v1/user/register',
      'SocialLoginEndpointUrl': this.root2 + '/api/v4.1/auth/login',
      'ForgetPasswordEndpointUrl': this.RootUrl + '/api/v1/user/forgetpassword',
      'VerificationCode': this.root2 + '/api/v4.1/auth/registration-token'
    },
    'LoggingFactory': {
      'SavelogEndpointUrl': this.root2 + '/api/v4/logging/log/route',
      'EventSaveLogEndpointUrl': this.root2 + '/api/v4/logging/log/event',
      'ApplicationSaveLogEndpointUrl': this.RootUrl + '/api/v1/logger/application/savelog',
      'GetSessionIdEndpointUrl': this.root2 + '/api/v4/auth/get-session-id',
      'AddActivityViewURL': this.root2 + '/api/v4/interaction/activity/viewed',
      'AddActivityVisitedURL': this.root2 + '/api/v4/interaction/activity/visited',
      'AddFilters': this.root2 + '/api/v4/user/search-filter/add-filter'
    },
    'PaymentApi': {
      'StripeTokenEndpointUrl': 'https://api.stripe.com/v1/tokens',
      'AddOrderEndpointUrl': this.PaymentRootUrl + '/api/orders/addorder',
      'MyOrderEndpointUrl': this.PaymentRootUrl + '/api/orders/myorders',
      'FindOrderByIdEndpointUrl': this.PaymentRootUrl + '/api/orders/findorderbyid?',
      'MakePaymentEndpointUrl': this.PaymentRootUrl + '/api/test/sales/makecardsale',
      'GenerateInvoiceEnpointUrl': this.PaymentRootUrl + '/api/orders/generateinvoice/',
      'IsActivityPaidEndpointUrl': this.PaymentRootUrl + '/api/orders/isactivitypaid?activityid='
    },
    'Activity': {
      'GetMetaData': this.root2 + '/api/v4.1/url/meta',
      'GetResultEndpointUrl': this.root2 + '/api/v4.1/activity/search',
      'GetActivityDetailEndpointUrl': this.RootUrl + '/api/v1/activity/activitydetail?id=',
      'GetActivityDetailUserEndpointUrl': this.root2 + '/api/v4.1/activity/detail',
      'GetSearchEndpointUrl': this.RootUrl + '/api/v2/activity/textsearchget?size=10&title=',
      'GetPopularActivitiesEndpointUrl': this.root2 + '/api/v4/activity/activities',
      'GetRecomendedActivitiesEndpointUrl': this.root2 + '/api/v4/activity/recommended-activities',
      'GetmyWishlistEndpointUrl': this.root2 + '/api/v4.1/user/bookmarks/activity/list',
      'GetImpressionEndpointUrl': this.RootUrl + '/api/v1/activity/GetImpression/?activity_id=',
      'AddImpressionEndpointUrl': this.RootUrl + '/api/v1/activity/AddImpression',
      'AddjoinEndpointUrl': this.RootUrl + '/api/v1/activity/AddJoin',
      'GetUserJoinedorLikedorNotUrl': this.RootUrl + '/api/v1/activity/activitydetailuser?id=',
      'GetjoinEndpointUrl': this.RootUrl + '/api/v1/activity/GetAttending/?activity_id=',
      'GetPopularActivities2EndpointUrl': this.RootUrl + '/api/v1/activity/getpopular?numberofcategories=6&numberofitems=6',
      'GetPopularActivities3EndpointUrl': this.RootUrl + '/api/v3/activity/getpopularuser?numberofcategories=6&numberofitems=6',
      'GetPopularActivitiesLogedInUrl': this.RootUrl + '/api/v3/activity/getpopularuser?numberofcategories=6&numberofitems=6&user_id=',
      'GetAllLoginPopularActivitiesUrl': this.root2 + '/api/v4/activity/popular-activities',
      'getNewlyAddedActivitiesURL': this.root2 + '/api/v4/activity/activities',
      'AddWishlistEndpointUrl': this.root2 + '/api/v4.1/user/bookmarks/activity/add',
      'DeleteWishlistEndPointUrl': this.root2 + '/api/v4.1/user/bookmarks/activity/remove',
      'GetActivitiesIn24HoursEndPoint': this.root2 + '/api/v4.1/activity/latest'
    },
    'News':
    {
      'NewsListingEndPoint': this.root3 + '/api/v4.1/news/listing',
      'NewsDetailEndPoint': this.root3 + '/api/v4.1/news/detail',
      'AddNewsToWishListEndPoint': this.root3 + '/api/v4.1/user/bookmarks/news/add',
      'DeleteNewsFromWishlistEndPoint': this.root3 + '/api/v4.1/user/bookmarks/news/remove',
      'GetNewsWishListEndPoint': this.root3 + '/api/v4.1/user/bookmarks/news/list',
      'AddVoteToNewsEndpoint': this.root3 + '/api/v4.1/news/vote/up',
      'DownVoteOfNewsEndPoint': this.root3 + '/api/v4.1/news/vote/down',
      'DeleteUpVoteEndPoint': this.root3 + '/api/v4.1/news/vote/remove/up',
      'AddNotSureVoteEndPoint': this.root3 + '/api/v4.1/news/vote/unsure',
      'DeleteNotSureVoteEndPoint': this.root3 + '/api/v4.1/news/vote/remove/unsure',
      'DeleteDownVoteEndPoint': this.root3 + '/api/v4.1/news/vote/remove/down'
    },
    'HostingActivities': {
      'GetAllHostingActivitiesEndpointUrl': this.RootUrl + '/api/v3/hosting/MyActivity?user_id=',
      'GetHostingActivitiesEndpointUrl': this.RootUrl + '/api/v1/hosting/getactivites',
      'GetHostingActivityDetailEndpointUrl': this.RootUrl + '/api/v3/hosting/activitydetail?id=',
      'GetSelectedActivitiesEndpointUrl': this.RootUrl + '/api/v1/hosting/selectedactivities',
      'AddImpressionHostingEndpointUrl': this.RootUrl + '/api/v1/hosting/AddImpression',
      'GetImpressionHostingEndpointUrl': this.RootUrl + '/api/v1/hosting/GetImpression/?activity_id=',
      'CreateActivityEndpointUrl': this.RootUrl + '/api/v1/hosting/AddActivity',
      'SearchActivityEndpointUrl': this.RootUrl + '/api/v1/hosting/SearchActivity',
      'UpdateActivityEndpointUrl': this.RootUrl + '/api/v3/hosting/UpdateActivity',
      'AddJoinHostingEndpointUrl': this.RootUrl + '/api/v1/hosting/AddJoin',
      'GetActivityHostedDetailsEndpointUrl': this.RootUrl + '/api/v1/hosting/activitydetailuser?id=',
      'GetUserJoinedorLikedorNotHostingEndpointUrl': this.RootUrl + '/api/v1/hosting/activitydetailuser?id=',
      'GetJoinsHostingEndpointUrl': this.RootUrl + '/api/v1/hosting/GetAttending/?activity_id='
    }

  }
}
