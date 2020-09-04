import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// thired party packages
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgmCoreModule } from '@agm/core';
import { NgxQRCodeModule } from "ngx-qrcode2";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ClipboardModule } from 'ngx-clipboard';
import { ClarityModule } from '@clr/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import {
  NgxSocialButtonModule,
  SocialServiceConfig
} from "ngx-social-button";




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app/components/app.component';
import { AccountService } from './services/account/account.service';
import { ActivityService } from './services/activityFactory/activity.service';
import { ApiEndPointService } from './services/ApiEndPoints/api-end-point.service';
import { EndpointFactoryService } from './services/endpontFactory/endpoint-factory.service';
import { GoogleMapApiService } from './services/GoogleMapApi/google-map-api.service';
import { HostingService } from './services/hostingFactory/hosting.service';
import { LocalStorageFactoryService } from './services/localStorageFactory/local-storage-factory.service';
import { LoggingService } from './services/loggingFactory/logging-service.service';
import { PaymentService } from './services/PaymentService/payment-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/httpConfigInterceptor/http-config-interceptor.ts';
import { JwtHelper } from './services/jwtHelper/jwt-helper.service';
import { HomeComponent } from './components/home-component/home-component.component';
// import { P404Component } from './components/errors/p404/p404.component';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './shared/header/header-module/header.module';
import { PupolarListModule } from './shared/popular-activity-list/pupolar-list-module/pupolar-list.module';
import { NewslistingModule } from './shared/newslisting/newslisting-module/newslisting.module'
import { SideBarModule } from './shared/sider-bar/side-bar-module/side-bar.module'
import { PrivacyPolicyModule } from './components/privacy-policy/privacy-policy-module/privacy-policy.module';
import { AuthGuard } from './authGuard/auth.guard';
import { HomeSuggestedInterestModule } from './shared/home-suggested-interest/home-suggested-interest-module/home-suggested-interest.module';
import { DatePipe } from '@angular/common';
// import { HomesearchlistingModule } from './shared/homesearchlisting/home-search-listing-module/homesearchlisting.module';
import { from } from 'rxjs';

export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
    .addFacebook("2205506036409861")
    // .addGoogle("Your-Google-Client-Id")
    .addLinkedIn("Your-LinkedIn-Client-Id");
  return config;
}
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("506126453626-bnbkf41jh9n00mhe976pcjr9i4k8imue.apps.googleusercontent.com")
  },

  //506126453626-bnbkf41jh9n00mhe976pcjr9i4k8imue.apps.googleusercontent.com     new
  // 65280849425-0pes4apuntnmd2ihslvod7ci8n73cfav.apps.googleusercontent.com     old
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("327463864465334")
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [

    HomeComponent,
    AppComponent,
    // P404Component
  ],
  imports: [
    NgxSocialButtonModule,
    CommonModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB42qwPDDlq7bSbT4kJwXrJqVdI1evn1EA",
      libraries: ["places"]
    }),
    NgxQRCodeModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    SocialLoginModule,
    // shared module....
    HeaderModule,
    PupolarListModule,// pupolarActivityList
    NewslistingModule,
    SideBarModule,
    HomeSuggestedInterestModule,
    // HomesearchlistingModule,
    //................................
    // static page module...
    PrivacyPolicyModule,
    //......
    GooglePlaceModule,
    ClipboardModule,
    ClarityModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor, multi: true
    },
    JwtHelper, ActivityService, AccountService, ApiEndPointService, GoogleMapApiService, HostingService,
    LocalStorageFactoryService, LoggingService, PaymentService, EndpointFactoryService, AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DatePipe,
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
