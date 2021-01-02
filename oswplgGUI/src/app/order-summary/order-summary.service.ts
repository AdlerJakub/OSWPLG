import { Injectable } from '@angular/core';
import {Dish} from '../dishes-list/dish.model';
import {OrderCredentialsModel} from '../order-credentials/order-credentials.model';
import {Order} from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor() { }

  order(cart: Dish[], credentials: OrderCredentialsModel) {
    const order = new Order();
    order.dishes = cart;
    order.credentials = credentials;
    console.log(order);
  }
}
