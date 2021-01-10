import { Injectable } from '@angular/core';
import {Dish} from '../dishes-list/dish.model';
import {OrderCredentialsModel} from '../order-credentials/order-credentials.model';
import {Order} from './order.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(private http: HttpClient) { }

  order(cart: Dish[], credentials: OrderCredentialsModel) {
    const order = new Order();
    order.dishes = cart;
    order.credentials = credentials;
    if (!order.credentials.flatNumber) {
      order.credentials.flatNumber = '0';
    }
    return this.http.post('/api/order/', order);
  }
}
