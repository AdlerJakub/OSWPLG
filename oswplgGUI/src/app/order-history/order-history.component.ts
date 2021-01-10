import { Component, OnInit } from '@angular/core';
import {Order} from '../order-summary/order.model';
import {Router} from '@angular/router';
import {OrderHistoryService} from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  private readonly defaultLabel = 'Pokaz wszystkie';
  orders: Order[] = [];
  buttonLabel: string;
  filtered = true;

  constructor(private router: Router,
              private orderHistoryService: OrderHistoryService) { }

  ngOnInit() {
    this.buttonLabel = this.defaultLabel;
    this.getOrders();
  }

  filterChanged() {
    this.filtered = !this.filtered;

    if (this.filtered) {
      this.buttonLabel = this.defaultLabel;
      this.getOrders();
    } else {
      this.buttonLabel = 'Ukryj zrealizowane';
      this.getOrders();
    }
  }

  private getOrders() {
    this.orderHistoryService.getOrders(this.filtered).subscribe(res => {
      this.orders = res;
    });
  }

  redirectToDetails(id: number) {
    this.router.navigate(['orderStatus/' +  id]);
  }

  realizeOrder(id: number) {
    this.orderHistoryService.realizeOrder(id).subscribe(value => {
      this.orderHistoryService.getOrders(this.filtered, true).subscribe(res => {
        this.orders = res;
      });
      this.orderHistoryService.getOrders(!this.filtered, true).subscribe();
    });
  }

  deleteOrder(id: number) {
    this.orderHistoryService.deleteOrder(id).subscribe(value => {
      this.orderHistoryService.getOrders(this.filtered, true).subscribe(res => {
        this.orders = res;
      });
      this.orderHistoryService.getOrders(!this.filtered, true).subscribe();
    });
  }

}
