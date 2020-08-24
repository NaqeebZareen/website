import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { IActivity } from 'src/app/models/activity'
import { Router } from '@angular/router';

@Component({
  selector: 'app-newwishlist',
  templateUrl: './newwishlist.component.html',
  styleUrls: ['./newwishlist.component.css']
})
export class NewwishlistComponent implements OnInit {

  public userId: string;
  public activityList: IActivity[];
  public newsList: [];
  public loading: number = 0;
  public userId1: any;
  public noActivity: boolean = false;
  public noNews: boolean = false;
  //.....

  constructor(private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService, private router: Router) { }

  ngOnInit() {
    this.loading = 1;
    // get userId from localStorage ...
    this.userId = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);
    // console.log(this.userId);
    //call to func to get wishlist

  }

  ngAfterViewInit() {
    this.getWishListedActivities(this.userId);
    this.getWishlistedNews();
  }
  // get user wish listed activities
  getWishListedActivities = (id: any) => {


    this.srvActivityService.getmyWishlistEndpoint(id).subscribe(res => {
      this.loading = 0;
      // console.log(res);
      if (res === null || res['response'].data['activity_bookmarks'].length === 0) {
        this.noActivity = true;
      }
      // console.log('wish-list: ', res);
      this.activityList = res['response'].data['activity_bookmarks'];
      // console.log(this.activityList);
    });
  }

  getWishlistedNews = () => {
    this.srvActivityService.getWishlistNewsEndPoint().subscribe(res => {
      if (res === null || res['response'].data['news_bookmarks'].length === 0) {
        this.noNews = true;
      }
      // console.log(res);
      // console.log(res['response'].data['user_bookmarks']);
      this.newsList = res['response'].data['news_bookmarks'];
    });
  }


  navigateToSearchPage = () => {
    this.router.navigate(['/search']);

  }
}
