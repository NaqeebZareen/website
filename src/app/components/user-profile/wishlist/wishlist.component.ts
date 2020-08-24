import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';
import { IActivity } from 'src/app/models/activity';
import { PopularList } from 'src/app/models/popular-list';
import { element } from 'protractor';
import { timingSafeEqual } from 'crypto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  // props
  public userId: string;
  public activityList: any[] = [];
  public loading: number = 0;
  public userId1: any;
  popActivity: PopularList;
  public popularActivityList: PopularList[] = [];
  public listCheck: PopularList[] = [];
  public noActivity: boolean = false;
  //.....

  constructor(private srvLoggingService: LoggingService, private srvLocalStorageFactory: LocalStorageFactoryService,
    private srvActivityService: ActivityService, private router: Router) { }

  ngOnInit() {
    this.loading = 1;
    // get userId from localStorage ...
    this.userId = this.srvLocalStorageFactory.getfromLocalStorage(DBkeys.USER_ID);
    //console.log("activities");
    //call to func to get wishlist
    this.getWishListedActivities(this.userId);
  }

  // get user wish listed activities
  getWishListedActivities = (id: any) => {

    this.srvActivityService.getmyWishlistEndpoint(id).subscribe(res => {
      this.loading = 0;
      if (res === null) {
        this.noActivity = true;
      }
      // console.log('wish-list: ', res);
      this.activityList = res['response'].data;
      // console.log(xres);
      // let activitiesList: any;
      // let activitiesList1: any;
      // activitiesList = localStorage.getItem('activities');
      // // console.log(activitiesList, "fromlocalstorage");
      // activitiesList1 = JSON.parse(activitiesList);
      // console.log(activitiesList1);
      // this, activitiesList1.forEach(element => {
      //   console.log(element, "des");
      //   for (let cas of element['activities']) {
      //     console.log(cas);
      //     // this.popularActivityList.push(cas);
      //     for (let sac of cas) {
      //       console.log(sac, "3211");
      //       this.popularActivityList.push(sac);
      //     }
      //   }
      // });


      // xres.forEach(element => {
      //   // console.log(element.activity_ids);
      //   for (let x of element.activity_ids) {
      //     // console.log(x);

      //     for (let list of this.popularActivityList) {

      //       // console.log(this.popularActivityList['id']);
      //       if (list['id'] === x) {
      //         // this.activityList.push()
      //         console.log(list['id'], "equalent");
      //         list['']
      //         this.activityList.push(list);

      //       }
      //       else {
      //         console.log(list['id'], "Notequal");
      //       }
      //     }
      //   }
      // });

    });




    // console.log(this.popularActivityList, "32");


  }

  navigateToSearchPage = () => {
    this.router.navigate(['/search']);

  }
}
