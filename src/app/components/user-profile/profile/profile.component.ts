import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { IEventLog } from 'src/app/models/event-log';
import { Subject } from 'rxjs';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterContentChecked, OnDestroy {

  // ... props ....
  public page: string;
  public controller: string;
  public objIEventLog: IEventLog;
  public userProfilePic: any;
  public userId: string;
  public userEmail: string;
  public userName: string;
  // subject to unsubscibe from obserable
  public unsubscribe = new Subject<void>();

  constructor(private activatedroute: ActivatedRoute, private router: Router, private srvJwthelperService: JwtHelper,
    private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService, private _location: Location, ) {
    this.objIEventLog = new IEventLog();
  }

  ngOnInit() {
    var email = localStorage.getItem('email');
    if (email === null) {
      this.router.navigate(['/']);
    }
    this.controller = "Profile component"
    this.page = this.router.url;
    // get profile pic from localStorage 
    this.getUserProfilePic();
    // current user Id
    this.userId = this.getDataFromLocalStorage(DBkeys.USER_ID);
    // userEmail ...
    this.userEmail = this.getDataFromLocalStorage('email');
    // userName ....
    this.userName = this.getDataFromLocalStorage(DBkeys.USER_FIRSTNAME);
    //  + ' ' + this.getDataFromLocalStorage(DBkeys.USER_LASTNAME);

    var email = this.userEmail;
    var name = email.substring(0, email.lastIndexOf("@"));

    if (this.userName === 'null') {
      this.userName = name;
    }
  }
  // get image if not then return default..
  getUserProfilePic = () => {
    this.userProfilePic = this.getDataFromLocalStorage(DBkeys.USER_PROFILE_PIC);
    // console.log(this.userProfilePic, "321");
    if (this.userProfilePic && this.userProfilePic != 'null') {
      return this.userProfilePic;
    } else {
      return (this.userProfilePic =
        '../../../../assets/Default.jpg');
    }
  }

  // fuc to track user actions .
  addEventLog = (action) => {
    this.objIEventLog.user_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);
    this.objIEventLog.user_ip = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.IP);
    this.objIEventLog.action = action;
    this.objIEventLog.category = 'button click';
    this.objIEventLog.city = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.CITY);
    this.objIEventLog.country = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.COUNTRY);
    this.objIEventLog.controller = this.controller;
    this.objIEventLog.session_id = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.SESSION_ID);
    this.objIEventLog.page = this.page;

    this.srvLoggingService.Event_SaveLogs(this.objIEventLog).pipe(takeUntil(this.unsubscribe)).subscribe(res => {

    }, error => console.log(error));

  }
  // helper function ,instead of calling localStorage factory multiple time it will help to call once ,
  // means we trying to remove duplicate code ..
  getDataFromLocalStorage = (key) => {
    return this.srvLocalStorageFactory.getfromLocalStorage(key);
  }
  // you have to tell angular that you updated the content after ngAfterContentChecked you can
  // else we will get error ExpressionChangedAfterItHasBeenCheckedError: if we call fuc not in ngafterC
  ngAfterContentChecked(): void {
    this.userProfilePic = this.getUserProfilePic();
  }
  // navigate to update-profile page
  navigateToUpdateProfilePage = () => {
    this.router.navigate(['/update-profile']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
