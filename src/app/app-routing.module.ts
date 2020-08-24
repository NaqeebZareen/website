import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { P404Component } from './components/errors/p404/p404.component';
import { HomeComponent } from './components/home-component/home-component.component';
import { AuthGuard } from './authGuard/auth.guard';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';
import { from } from 'rxjs';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // we commited cz it frist load ,ddon't want /anyroute 
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
    path: 'activity-details/:category/:urltitle/:activityId', loadChildren: () => import('./components/activity-details/activity-details-module/activity-details.module')
      .then(m => m.ActivityDetailsModule)
  },
  {
    path: 'search/activity-details/:category/:urltitle/:activityId', loadChildren: () => import('./components/activity-details/activity-details-module/activity-details.module')
      .then(m => m.ActivityDetailsModule)
  },
  {
    path: 'news-details/:urltitle/:newsId', loadChildren: () => import('./components/newsdetails/newsdetails-module/newsdetails.module')
      .then(m => m.NewsdetailsModule)
  },
  {
    path: 'news/news-details/:urltitle/:newsId', loadChildren: () => import('./components/newsdetails/newsdetails-module/newsdetails.module')
      .then(m => m.NewsdetailsModule)
  },
  {
    path: 'search', loadChildren: () => import('./components/search/search-module/search.module')
      .then(m => m.SearchModule)
  },
  {
    path: 'search/Music-and-Concerts', loadChildren: () => import('./components/search/search-module/search.module')
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
    path: 'activities/:urltitle', loadChildren: () => import('./components/interestlisting/interestlisting-module/interestlisting.module')
      .then(m => m.InterestlistingModule)
  },

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
