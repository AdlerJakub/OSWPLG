import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Order} from '../order-summary/order.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private readonly url = '/api/adminOrder/';

  constructor(private http: HttpClient) {}

  private ordersFiltered: Order[];
  private ordersEvery: Order[];

  getOrders(onlyNotRealized: boolean = true, enforceReload: boolean = false): Observable<Order[]> {
    if (onlyNotRealized) {
      if (this.ordersFiltered && !enforceReload) {
        return of(this.ordersFiltered);
      } else {
        return this.http.get<any>(this.url + '?not_realized=1').pipe(
          map(val => {
            return val.results;
          }),
          tap(val => {
            this.ordersFiltered = val;
          }));
      }

    } else {
      if (this.ordersEvery && !enforceReload) {
        return of(this.ordersEvery);
      } else {
        return this.http.get<any>(this.url).pipe(
          map(val => {
            return val.results;
          }),
          tap(val => {
            this.ordersEvery = val;
          }));
      }
    }
  }

  realizeOrder(id: number): Observable<Order> {
    const body = { realized: 1 };
    return this.http.patch<Order>(this.url + id + '/', body);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete('/api/adminOrder/' + id + '/');
  }
}
