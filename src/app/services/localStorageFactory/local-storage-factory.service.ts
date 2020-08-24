import { Injectable } from '@angular/core';
import { DBkeys } from '../dbkeys/db-keys';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageFactoryService {

  constructor(private router: Router) { }
  writeToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  }

  getfromLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  writeWholeObjecttolocalStorage = (objectsArray: any) => {
    // console.log(objectsArray, "i am obj")
    localStorage.setItem(DBkeys.OBJECTS_ARRAY, objectsArray);
  }

  writeActivityObjecttoLocalStorage = (objectsArray: any) => {
    localStorage.setItem(DBkeys.ACTIVITIES_OBJECT, JSON.stringify(objectsArray));
  }

  writeInterestObjecttoLocalStorage = (objectsArray: any) => {
    localStorage.setItem(DBkeys.INTEREST_OBJECT, JSON.stringify(objectsArray));
  }
  writeEachTolocalStorage = (objectsArray: any) => {

    objectsArray.forEach(element => {

      for (let [key, value] of Object.entries(element)) {

        localStorage.setItem(key, value as any);
      }
    });
  }

  removeAllFromlocalStorage = (arrayList: any) => {
    arrayList.forEach(element => {
      localStorage.removeItem(element);
    });
  }

  writeTokenToLocalStorage = (token, refreshToken, token_creation_time) => {
    localStorage.setItem(DBkeys.ACCESS_TOKEN, token);
    localStorage.setItem(DBkeys.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(DBkeys.TOKEN_CREATED_TIME, token_creation_time);
  }

  writeToken(token, id) {
    localStorage.setItem(DBkeys.ACCESS_TOKEN, token);
    localStorage.setItem(DBkeys.USER_ID, id);
  }
  writetokenWithEmail(token) {
    localStorage.setItem(DBkeys.ACCESS_TOKEN, token);
  }

  writecityofheader(headercity) {
    localStorage.setItem(DBkeys.HEADERCITY, headercity);
  }

  writeEmailtoLocal(email) {
    localStorage.setItem(DBkeys.EMAIL, email);
  }
  getTokenFromLocalStorage = () => {
    return localStorage.getItem(DBkeys.ACCESS_TOKEN);
  }

  getRefreshTokenFromLocalStorage = () => {
    return localStorage.getItem(DBkeys.REFRESH_TOKEN);
  }

  writeUserIdentityInfoToLocalStorage = (first_name, last_name, profile_pic, user_id) => {
    localStorage.setItem(DBkeys.USER_FIRSTNAME, first_name);
    localStorage.setItem(DBkeys.USER_LASTNAME, last_name);
    localStorage.setItem(DBkeys.USER_PROFILE_PIC, profile_pic);
    localStorage.setItem(DBkeys.USER_ID, user_id);
  }

  removeTokenFromLocalStorage = () => {
    localStorage.removeItem(DBkeys.ACCESS_TOKEN);
    localStorage.removeItem(DBkeys.REFRESH_TOKEN);
    localStorage.removeItem(DBkeys.TOKEN_CREATED_TIME);
    localStorage.removeItem(DBkeys.USER_FIRSTNAME);
    localStorage.removeItem(DBkeys.USER_LASTNAME);
    localStorage.removeItem(DBkeys.USER_PROFILE_PIC);
    localStorage.removeItem(DBkeys.USER_ID);
    this.router.navigate(['/login']);
  }

  writeUserLocationInfoTolcoalStorage = (ip, country, city) => {
    localStorage.setItem(DBkeys.IP, ip);
    localStorage.setItem(DBkeys.COUNTRY, country);
    localStorage.setItem(DBkeys.CITY, city);
  }

  getcityFromLocalDb = () => {
    return localStorage.getItem(DBkeys.CITY);
  }
  getIPfromLocalDb = () => {
    return localStorage.getItem(DBkeys.IP);
  }
  getcityCountryLocalDb = () => {
    return localStorage.getItem(DBkeys.COUNTRY);
  }
  writeSessionIdToLocalStorage = (seesion_id) => {
    localStorage.setItem(DBkeys.SESSION_ID, seesion_id);
  }
  getSessionIdFromLocalStorage = () => {
    localStorage.getItem(DBkeys.SESSION_ID);
  }
}
