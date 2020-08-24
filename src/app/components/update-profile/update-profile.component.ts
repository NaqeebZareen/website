import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { IUser } from 'src/app/models/user';
import { IUpdateProfileModel } from 'src/app/models/api-request-model/update-profile-model';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { EndpointFactoryService } from 'src/app/services/endpontFactory/endpoint-factory.service';
import { LocalStorageFactoryService } from 'src/app/services/localStorageFactory/local-storage-factory.service';
import { IRefreshTokenRequestModel } from 'src/app/models/refresh-token-request-model';
import { DBkeys } from 'src/app/services/dbkeys/db-keys';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  // ... props ...
  public objUser: IUser;
  public objUpdateProfile: IUpdateProfileModel;
  public tokenRequest: IRefreshTokenRequestModel;
  private access_token: any;

  constructor(private router: Router, private getAccessTokenFromLocalStorage: LocalStorageFactoryService, private srvAccountService: AccountService, private srvEndpointFactory: EndpointFactoryService, private srvLocalStoragefactory: LocalStorageFactoryService) {
    this.objUser = new IUser();
    this.objUpdateProfile = new IUpdateProfileModel();
  }

  ngOnInit() {
    this.getProfileInformation();
    this.access_token = this.getAccessTokenFromLocalStorage.getTokenFromLocalStorage();
    // console.log(this.access_token);
  }


  Update() {



    let body = new HttpParams();
    body = body.set('first_name', this.objUpdateProfile.first_name);
    body = body.set('last_name', this.objUpdateProfile.last_name);
    body = body.set('picture', this.objUpdateProfile.picture);
    body = body.set('user_id', this.objUser.user_id);

    // var body2 = JSON.stringify({ body });
    // var body1 = JSON.stringify({ "first_name": this.objUpdateProfile.first_name, "last_name": this.objUpdateProfile.last_name, "picture": this.objUpdateProfile.picture });
    this.srvAccountService.updateUserProfileEndpoint(this.objUpdateProfile.first_name, this.objUpdateProfile.last_name, this.objUpdateProfile.picture, 'Bearer ' + this.access_token).subscribe(
      res => {


        alert("profile updated");
        this.router.navigate(['/']);
      },
      err => {

        let error_stack = JSON.stringify(err);
        let error_level = "200";
        let error_message = err;

      });
  }

  // let body = new HttpParams();
  // body = body.set('first_name', this.objUser.first_name);
  // body = body.set('last_name', this.objUser.last_name);
  // body = body.set('picture', this.objUser.picture);
  // var body2 = JSON.stringify({ body });
  // var body1 = JSON.stringify({ "first_name": this.objUser.first_name, "last_name": this.objUser.last_name, "picture": this.objUser.picture });
  // this.srvAccountService.updateUserProfileEndpoint(body2).subscribe(
  //   res => {
  //     // console.log("updated");
  //     alert("profile updated");
  //     this.router.navigate(['/Home']);
  //   },
  //   err => {
  //     let error_stack = JSON.stringify(err);
  //     let error_level = "200";
  //     let error_message = err;

  //   });


  handleFileSelect($event) {
    var files = $event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.objUpdateProfile.picture = btoa(binaryString);
    // console.log(btoa(this.objUser.picture));
  }
  // get user info 
  getProfileInformation = () => {
    this.srvAccountService.getUserProfileInfoEndpoint(this.access_token).subscribe(res => {
      this.objUser = res['response'].data;

    });
  }

}
