import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/SEOService/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelper } from 'src/app/services/jwtHelper/jwt-helper.service';
import { LoggingService } from 'src/app/services/loggingFactory/logging-service.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { ActivityService } from 'src/app/services/activityFactory/activity.service';
import { PopularList } from 'src/app/models/popular-list';

@Component({
  selector: 'app-citylisting',
  templateUrl: './citylisting.component.html',
  styleUrls: ['./citylisting.component.css']
})
export class CitylistingComponent implements OnInit {

  public city: any;
  public head: any;
  public newlyAddedList: PopularList[] = [];
  public check: any;

  constructor(private srvAccountService: AccountService, private meta: Meta, private title: Title, private seoService: SEOService, private activatedroute: ActivatedRoute, private srvJwthelperService: JwtHelper, private srvLoggingService: LoggingService,
    private srvLocalStorageFactory: LocalStorageFactoryService, private router: Router,
    private srvActivityService: ActivityService) {
    this.check = 0;
  }

  ngOnInit(): void {

    var city = this.router.url;
    city = city.slice(city.lastIndexOf('/') + 1);
    this.city = city.replace(/-|\s/g, " ");
    this.head = this.city;
    // this.head = this.head.split('-').join(' ');
    var category = this.router.url;
    // console.log(category);
    var category = category.split('/activities/').pop().split('/')[0];
    category = category.replace(/-|\s/g, " ");
    category = category.replace(/and/g, "&");
    // console.log(this.city);

    // console.log(category);
    this.homesugested(category, this.city);
  }

  async homesugested(category: any, city: any) {


    var records_per_page = 40;
    var page_no = 1;

    // city = localStorage.getItem("headercity");
    // console.log(city);
    // console.log(data);
    // if (city === null || city === undefined) {
    //   city = "San Francisco";
    // }
    var categories = [];
    categories.push(category);
    this.srvActivityService.getResultEndPointSecond(categories, city, records_per_page, page_no).subscribe(res => {
      // console.log(res);
      if (res['response'].data['no_of_records'] === 0 && res['response'].data['page_no'] === 1) {
        // console.log(this.activityList.length);
        // this.activityList.length

        this.check = 1;
      }
      else {
        this.newlyAddedList = res['response'].data['activities'];
      }
    });
  }

}
