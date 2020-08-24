import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { ApiEndPointService } from '../ApiEndPoints/api-end-point.service';
import { IOrder } from 'src/app/models/order';
import { IStripeToken } from 'src/app/models/stripe-token';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private srvApiEndpointService: ApiEndPointService,
    private httpClient: HttpClient, private handler: HttpBackend) {
    //Use HttpBackend which will dispatch the request via browser HTTP APIs directly to the backend,
    // without going through the interceptor chain.
    this.httpClient = new HttpClient(handler);
  }

  getStripeTokenEndpoint = (data, authorization) => {
    let header = {
      headers: new HttpHeaders({
        "content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: authorization
      })
    };
    var urlstripe = "https://api.stripe.com/v1/tokens";
    return this.httpClient.post<IStripeToken>(
      urlstripe,
      data,
      header
    )
  }
  AddOrderEndpoint = (data) => {
    return this.http.post<IOrder[]>(this.srvApiEndpointService.apiEndPoints.PaymentApi.AddOrderEndpointUrl, data);
  }

  getUserOrdersEndpoint = () => {
    return this.http.get<IOrder[]>(this.srvApiEndpointService.apiEndPoints.PaymentApi.MyOrderEndpointUrl);
  }

  getOrderByIdEndpoint = (data) => {
    return this.http.get<IOrder>(this.srvApiEndpointService.apiEndPoints.PaymentApi.FindOrderByIdEndpointUrl + data);
  }

  makeOrderPaymentEndpoint = (data) => {
    return this.http.post(this.srvApiEndpointService.apiEndPoints.PaymentApi.MakePaymentEndpointUrl, data)
  }

  generateInvoiceEndpoint = (data) => {
    return this.http.get<IOrder>(this.srvApiEndpointService.apiEndPoints.PaymentApi.GenerateInvoiceEnpointUrl + data);
  }

  IsActivityPaidEndpoint = (data) => {
    return this.http.get(this.srvApiEndpointService.apiEndPoints.PaymentApi.IsActivityPaidEndpointUrl + data)
  }

}
