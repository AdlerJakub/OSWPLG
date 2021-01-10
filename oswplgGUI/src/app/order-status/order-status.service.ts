import { Injectable } from '@angular/core';
import {Observable, of, pipe} from 'rxjs';
import {Order} from '../order-summary/order.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private order: Order;

  constructor(private http: HttpClient) { }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>('/api/order/' + id + '/').pipe(
      tap(val => {
        this.order = val;
      })
    );
  }

  getLastOrder(): Order {
    return this.order;
  }
}
