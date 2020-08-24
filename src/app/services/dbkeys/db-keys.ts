import { Injectable } from '@angular/core';

@Injectable()
export class DBkeys {

  // parameters for refresh token
  public static readonly GRANTE_TYPE = "password";
  public static readonly CLINET_ID = "YoucanApp";
  public static readonly CLIENT_SECRET = "secret";
  public static readonly ACTIVITIES_OBJECT = "activities";
  public static readonly INTEREST_OBJECT = "interest";
  //......

  public static readonly IP = 'Ip';
  public static readonly COUNTRY = 'country';
  public static readonly CITY = 'city';
  public static readonly SESSION_ID = 'session_id';

  public static readonly CURRENT_USER = 'current_user';
  public static readonly USER_PERMISSIONS = 'user_permissions';
  public static readonly ACCESS_TOKEN = 'access_token';
  public static readonly REFRESH_TOKEN = 'refresh_token';
  public static readonly TOKEN_EXPIRES_IN = 'expires_in';
  public static readonly TOKEN_CREATED_TIME = 'created_time';
  // keys to write and get getUserProfileEndpoint response 
  public static readonly USER_FIRSTNAME = 'first_name';
  public static readonly USER_LASTNAME = 'last_name';
  public static readonly USER_PROFILE_PIC = 'profile_pic';
  public static readonly USER_ID = 'user_id';
  public static readonly EMAIL = 'email';
  public static readonly LATLNG = 'latlng';
  public static readonly HEADERCITY = 'headercity';
  public static readonly REMEMBER_ME = 'remember_me';
  public static readonly OBJECTS_ARRAY = 'objectsArray';
}

export class UkanAppRoutes {

  // navigation routes
  public static readonly PROFILE = '/profile';
  public static readonly WISHLIST = '/profile/wish-list';
  public static readonly HOSTED = '/profile/host-activities';
  public static readonly JOINED = '/profile/join-activities';
  public static readonly TERM_A_CONDITION = '/term-and-condition';
  public static readonly REGISTER = '/register';
  public static readonly REFUND_POLICY = '/refund-policy';
  public static readonly PRIVACY_POLICY = '/privacy-policy';
  public static readonly LOGIN = '/login';
  public static readonly FORGET_PASSWORD = '/forget-password';
  public static readonly CREATE_ACTIVITY = '/create-activity';
  public static readonly CONTENT_POLICY = '/content-policy';
  public static readonly ACTIVITY_DETAILS = '/activity-details';
  public static readonly SEARCH = '/search';
  public static readonly newwishlist = '/newwishlist';

}