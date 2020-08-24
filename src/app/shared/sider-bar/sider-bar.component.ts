import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DBkeys, UkanAppRoutes } from 'src/app/services/dbkeys/db-keys';
import { DOCUMENT } from '@angular/common';
import { collapse } from '@clr/angular';
@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent implements OnInit {

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    // console.log('button');
    var url = this.doc.URL;
    // console.log(url);
    if (url === "http://localhost:4200/") {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
  }
  public imgsrc1: any;
  public imgsrc2: any;
  public imgsrc3: any;
  public imgsrc4: any;
  constructor(private router: Router, @Inject(DOCUMENT) private doc) {


  }


  toggle = true;
  toggle1;
  toggle2;
  toggle3;
  status = 'Enable';

  ngDoCheck() {
    // console.log("3");
    var url = this.doc.URL;
    // console.log(url);
    // console.log(this.toggle);
    if (url === "https://www.youcan.tech/" || url === "http://www.youcan.tech/" || url === "http://localhost:4200/") {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
    if (url === "https://www.youcan.tech/search" || url === "http://www.youcan.tech/search" || url === "http://localhost:4200/search") {
      // console.log("toglle1");
      this.toggle1 = true;
      this.toggle = false;
    }
    if (url === "https://www.youcan.tech/news" || url === "http://www.youcan.tech/news" || url === "http://localhost:4200/news") {
      // console.log("toglle1");
      this.toggle2 = true;
      this.toggle = false;
      this.toggle1 = false;
    }
    if (url === "https://www.youcan.tech/newwishlist" || url === "http://www.youcan.tech/newwishlist" || url === "http://localhost:4200/newwishlist") {
      // console.log("toglle1");
      this.toggle3 = true;
      this.toggle2 = false;
      this.toggle = false;
      this.toggle1 = false;
    }
  }
  ngOnInit(): void {
    // console.log("2");
    // console.log("run");

    // console.log(this.imgsrc1, "21");
    var url = this.doc.URL;
    // console.log(url);
    if (url === "https://www.youcan.tech/" || url === "http://www.youcan.tech/" || url === "http://localhost:4200/") {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
    if (url === "https://www.youcan.tech/search" || url === "http://www.youcan.tech/search" || url === "http://localhost:4200/search") {
      // console.log(url);
      this.imgsrc3 = "../../../assets/Website_Icons/events_selected.svg";
      this.imgsrc2 = "../../../assets/Website_Icons/newsunselected.png";
      this.imgsrc1 = "../../../assets/Website_Icons/home_unselected.svg";
      this.imgsrc4 = "../../../assets/Website_Icons/star.png";
    }
    if (url === "https://www.youcan.tech/news" || url === "http://www.youcan.tech/news" || url === "http://localhost:4200/news") {
      // console.log(url);
      this.imgsrc3 = "../../../assets/Website_Icons/eventunselected.png";
      this.imgsrc2 = "../../../assets/Website_Icons/news.svg";
      this.imgsrc1 = "../../../assets/Website_Icons/home_unselected.svg";
      this.imgsrc4 = "../../../assets/Website_Icons/star.png";
    }
    if (url === "https://www.youcan.tech/newwishlist" || url === "http://www.youcan.tech/newwishlist" || url === "http://localhost:4200/newwishlist") {
      // console.log(url);
      this.imgsrc3 = "../../../assets/Website_Icons/eventunselected.png";
      this.imgsrc2 = "../../../assets/Website_Icons/newsunselected.png";
      this.imgsrc1 = "../../../assets/Website_Icons/home_unselected.svg";
      this.imgsrc4 = "../../../assets/Website_Icons/star_purple.png";
    }
    if (this.imgsrc1 === undefined) {
      // console.log(this.imgsrc1, "21");
      // console.log();
      this.imgsrc3 = "../../../assets/Website_Icons/eventunselected.png";
      this.imgsrc2 = "../../../assets/Website_Icons/newsunselected.png";
      this.imgsrc1 = "../../../assets/Website_Icons/home.svg";
      this.imgsrc4 = "../../../assets/Website_Icons/star.png";
    }
    // this.imgsrc1 = "../../../assets/Website_Icons/home.png";
    // this.imgsrc2 = "../../../assets/Website_Icons/news.png";
    // this.imgsrc3 = "../../../assets/Website_Icons/events_selected.png";
    // this.imgsrc4 = "../../../assets/Website_Icons/star_purple.png";
  }

  navigateToSearchPage() {
    // this.addEventLog('search');

    // this.imgsrc1 = "../../../assets/date.svg";
    this.router.navigate([UkanAppRoutes.SEARCH]);
  }
  navigateToHomePage = () => {
    // this.click1();
    this.router.navigate(['/']);
  }
  navigateToNewsPage = () => {
    // this.click1();

    this.router.navigate(['/news']);
  }
  click1() {

    this.imgsrc3 = "../../../assets/Website_Icons/eventunselected.png";
    this.imgsrc2 = "../../../assets/Website_Icons/newsunselected.png";
    this.imgsrc1 = "../../../assets/Website_Icons/home.svg";
    this.imgsrc4 = "../../../assets/Website_Icons/star.png";

    this.navigateToHomePage();
    // location.reload();
  }
  click2() {
    this.imgsrc3 = "../../../assets/Website_Icons/eventunselected.png";
    this.imgsrc2 = "../../../assets/Website_Icons/news.svg";
    this.imgsrc1 = "../../../assets/Website_Icons/home_unselected.svg";
    this.imgsrc4 = "../../../assets/Website_Icons/star.png";
    this.navigateToNewsPage();
  }
  click3() {

    this.imgsrc3 = "../../../assets/Website_Icons/events_selected.svg";
    this.imgsrc2 = "../../../assets/Website_Icons/newsunselected.png";
    this.imgsrc1 = "../../../assets/Website_Icons/home_unselected.svg";
    this.imgsrc4 = "../../../assets/Website_Icons/star.png";
    this.navigateToSearchPage();
  }
  click4() {
    this.imgsrc4 = "../../../assets/Website_Icons/star_purple.png";
    this.imgsrc3 = "../../../assets/Website_Icons/eventunselected.png";
    this.imgsrc2 = "../../../assets/Website_Icons/newsunselected.png";
    this.imgsrc1 = "../../../assets/Website_Icons/home_unselected.svg";


    this.router.navigate(['newwishlist']);
  }
  pivacyPolicy = () => {
    this.router.navigate(['privacy-policy']);
  }


  FacebookLink() {

    window.open("https://www.facebook.com/youcanllc/", "_blank");
  }
  // link
  TwitterLink() {

    window.open("https://twitter.com/YoucanUSA", "_blank");
  }
  LinkedinLink() {

    window.open("https://www.linkedin.com/company/youcanllc/", "_blank");
  }

}
