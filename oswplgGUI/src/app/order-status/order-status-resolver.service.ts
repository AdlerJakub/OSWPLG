import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {Order} from '../order-summary/order.model';
import {OrderStatusService} from './order-status.service';

@Injectable({providedIn: 'root'})
export class OrderStatusResolverService implements Resolve<Order> {

  constructor(private orderStatusService: OrderStatusService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.orderStatusService.getOrder(+route.paramMap.get('id'));
  }
}
