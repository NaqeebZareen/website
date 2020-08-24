import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, observable } from 'rxjs';
import { map, catchError, tap, switchMap, finalize, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageFactoryService } from '../localStorageFactory/local-storage-factory.service';
import { EndpointFactoryService } from '../endpontFactory/endpoint-factory.service';
import { IRefreshTokenResponseModel } from 'src/app/models/refresh-token-response-model';
import { DBkeys } from '../dbkeys/db-keys';

@Injectable(
    {
        providedIn: "root",
    }
)

export class HttpConfigInterceptor {
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     throw new Error("Method not implemented.");
    // }

    private isTokenRefreshing: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private _router: Router, private srvLocalStorgeService: LocalStorageFactoryService,
        private srvEndpointFactoryService: EndpointFactoryService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // check if user is login for the first time
        var token = this.srvLocalStorgeService.getfromLocalStorage(DBkeys.ACCESS_TOKEN);


        if (request.headers.get("skip")) {
            delete request.headers['skip'];
            request = request.clone({ headers: request.headers.delete('skip') });
            return next.handle(request);
        }

        const excludeRoutes = ["https://api.ipify.org?format=json", "https://api.stripe.com/v1/tokens",
            "https://maps.googleapis.com/maps/api/geocode/json"];
        if (token && !excludeRoutes.includes(request.url)) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (request.body === null) {
            if (!request.headers.has('Content-Type')) {
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            }
        }
        else {
            const ignore = request.body.toString() === '[object FormData]' // <-- This solves your problem
                || request.headers.has('Content-Type');
            if (ignore) {

                return next.handle(request);
            } else {
                if (!request.headers.has('Content-Type')) {
                    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                }
            }
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('success');
                }
            }),
            // catchError((err): Observable<any> => {
            //     if (err instanceof HttpErrorResponse) {
            //         if (err instanceof HttpErrorResponse) {
            //             switch ((<HttpErrorResponse>err).status) {
            //                 case 401:
            //                     return this.handleHttpResponseError(request, next);
            //                 case 400:
            //                     return;
            //             }
            //         } else {
            //             return throwError(this.handleError(err));
            //         }

            //     }
            // })
        );
    }

    // method to handle http error response
    private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler) {
        // first thing to check if the token is an the process of refreshing
        if (!this.isTokenRefreshing) // if token refreshing is not true
        {
            this.isTokenRefreshing = true;
            //any existing value is set to null
            // reset that so that the following wait until the token come back from the refresh token api
            this.tokenSubject.next(null);
            // call the api to refresh token 

            // return this.srvEndpointFactoryService.getTokenRefreshEndpoint().pipe(
            //     switchMap((res: IRefreshTokenResponseModel) => {
            //         if (res) {
            //             this.tokenSubject.next(res.access_token);
            //             this.srvLocalStorgeService.writeTokenToLocalStorage(res.access_token, res.refresh_token, res.expires_in);
            //             return next.handle(this.attacheTokenToRequest(request));
            //         }

            //     }),
            //     catchError(error => {

            //         return this.handleError(error);
            //     }),
            //     finalize(() => {
            //         this.isTokenRefreshing = false;
            //     })
            // )

        } else {
            this.isTokenRefreshing = false;
            this.tokenSubject.pipe(filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.attacheTokenToRequest(request));
                })
            )
        }
    }
    // atteche token and other header to request
    private attacheTokenToRequest(request: HttpRequest<any>) {
        let token = this.srvLocalStorgeService.getfromLocalStorage(DBkeys.ACCESS_TOKEN);
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        return request;
    }

    //handle error
    private handleError(errorResponse: HttpErrorResponse) {
        let errMsg: string;
        if (errorResponse.error instanceof Error) {
            // client side error ,network related error
            errMsg = 'error occured ' + errorResponse.error.message;
        } else {
            errMsg = 'backend error ' + errorResponse.status + ' er=' + errorResponse.error;
        }
        return throwError(errMsg);
    }

}
