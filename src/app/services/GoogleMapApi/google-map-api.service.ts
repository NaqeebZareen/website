import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapApiService {

  constructor(private http: HttpClient) { }

  getPlaceNameEndpoint = (lat, long) => {
    return this.http.get<Object>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}
      &key=AIzaSyB42qwPDDlq7bSbT4kJwXrJqVdI1evn1EA`, { headers: { skip: "true" } }
    );
  }
}
