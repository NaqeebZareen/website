import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(private title: Title, @Inject(DOCUMENT) private doc, private meta: Meta, private http: HttpClient, private srvApiEndpointService: ApiEndPointService) {
  }
  setPageTitle(title: string) {
    this.title.setTitle(title);
  }
  getPageTitle() {
    return this.title.getTitle();
  }
  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
  }

  getMetaData = (url: string) => {

    let httpAuthenticationHeader = {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    };
    return this.http.post(this.srvApiEndpointService.apiEndPoints.Activity.GetMetaData, { url, httpAuthenticationHeader });
  }
}