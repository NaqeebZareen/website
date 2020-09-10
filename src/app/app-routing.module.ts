import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { P404Component } from './components/errors/p404/p404.component';
import { HomeComponent } from './components/home-component/home-component.component';
import { AuthGuard } from './authGuard/auth.guard';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';
import { from } from 'rxjs';
//  Pittsburgh
//  San-Francisco
const routes: Routes = [

  // { path: '', redirectTo: 'home', pathMatch: 'full' }, // we commited cz it frist load ,ddon't want /anyroute 
  { path: '', component: HomeComponent },

  {
    path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./components/user-profile/user-profile-module/user-profile.module')
      .then(m => m.UserProfileModule)
  },
  {
    path: 'privacy-policy', loadChildren: () => import('./components/privacy-policy/privacy-policy-module/privacy-policy.module')
      .then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'login', loadChildren: () => import('./components/login/login-module/login.module').then(m => m.LoginModule)
  },
  {
    path: 'activity-details/:category/:urltitle/:activityId',

    loadChildren: () => import('./components/activity-details/activity-details-module/activity-details.module')
      .then(m => m.ActivityDetailsModule)
  },
  // {
  //   path: 'search/activity-details/:category/:urltitle/:activityId', loadChildren: () => import('./components/activity-details/activity-details-module/activity-details.module')
  //     .then(m => m.ActivityDetailsModule)
  // },
  {
    path: 'news-details/:urltitle/:newsId', loadChildren: () => import('./components/newsdetails/newsdetails-module/newsdetails.module')
      .then(m => m.NewsdetailsModule)
  },
  // {
  //   path: 'news/news-details/:urltitle/:newsId', loadChildren: () => import('./components/newsdetails/newsdetails-module/newsdetails.module')
  //     .then(m => m.NewsdetailsModule)
  // },
  {
    path: 'search', loadChildren: () => import('./components/search/search-module/search.module')
      .then(m => m.SearchModule)
  },
  {
    path: 'news', loadChildren: () => import('./components/news/news-module/news.module')
      .then(m => m.NewsModule)
  },
  {
    path: 'newwishlist', loadChildren: () => import('./components/newwishlist/newwishlist-module/newwishlist.module')
      .then(m => m.NewwishlistModule)
  },
  {
    path: 'activities/All', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Music-and-Concerts', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Family-and-Kids', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Health-and-Fitness', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Arts-and-Performance', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Books-and-hobbies', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Tech-and-workshops', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },

  {
    path: 'activities/Food-and-festival', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Outdoor-Activities', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Sports', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Politics', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/Others', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },
  {
    path: 'activities/All/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/Pittsburgh', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  // 2nd
  {
    path: 'activities/All/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/Austin', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // 3rd
  {
    path: 'activities/All/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/New-York', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // 4th
  {
    path: 'activities/All/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/Silicon-Valley', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // 5th
  {
    path: 'activities/All/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/Washington-DC', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // 6th
  {
    path: 'activities/All/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/San-Francisco', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // 7th
  {
    path: 'activities/All/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/London', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // 8th
  {
    path: 'activities/All/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/San-Jose', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  // 9th
  {
    path: 'activities/All/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/Chicago', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },


  // 10th
  {
    path: 'activities/All/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Music-and-Concerts/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Family-and-Kids/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Health-and-Fitness/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sightseeing-and-Tourism/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Arts-and-Performance/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Shopping-and-Fashion/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Books-and-hobbies/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Tech-and-workshops/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },

  {
    path: 'activities/Food-and-festival/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Outdoor-Activities/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Charity-and-Volunteer-work/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Socialization-and-Networking/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Sports/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Politics/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  {
    path: 'activities/Others/Online', loadChildren: () => import('./components/citylisting/citylisting-module/citylisting.module')
      .then(m => m.CitylistingModule)
  },
  // {
  //   path: 'activities/:urltitle', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
  //     .then(m => m.InterestlistingModule)
  // },

  {
    path: 'update-profile', canActivate: [AuthGuard], loadChildren: () => import('./components/update-profile/update-profile-module/update-profile.module')
      .then(m => m.UpdateProfileModule)
  },

  // { path: '**', component: P404Component },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled',
      scrollOffset: [0, 64], preloadingStrategy: QuicklinkStrategy,
      initialNavigation: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
