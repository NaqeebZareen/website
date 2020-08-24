import { Injectable } from '@angular/core';

import { JwtHelperService } from "@auth0/angular-jwt";

import { DBkeys } from '../dbkeys/db-keys';
import { EndpointFactoryService } from '../endpontFactory/endpoint-factory.service';
import { isTokenExpired } from 'src/app/utilities/helper';

@Injectable({
  providedIn: 'root'
})
export class JwtHelper {

  _jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private srvEndpointService: EndpointFactoryService) { }

  public hasToken(): boolean {
    var token = localStorage.getItem(DBkeys.ACCESS_TOKEN);

    if (token && !this._jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  }

  verifyToken(): boolean {
    var token = localStorage.getItem(DBkeys.ACCESS_TOKEN);
    // !this._jwtHelper.isTokenExpired(token) this method will be use in future token changes 
    // The current inspected token doesn't appear to be a JWT, so that why we using custome function
    if (token && isTokenExpired()) {
      this.srvEndpointService.isLoginSubject.next(true);

      return true;
    } else {
      localStorage.removeItem(DBkeys.ACCESS_TOKEN);
      this.srvEndpointService.isLoginSubject.next(false);

      return false;
    }
  }

  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  public decodeToken(token: string): any {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    // console.log(date); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
