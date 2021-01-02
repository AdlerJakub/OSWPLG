import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../dishes-list/dish.model';

@Component({
  selector: 'app-order-summary-item',
  templateUrl: './order-summary-item.component.html',
  styleUrls: ['./order-summary-item.component.css']
})
export class OrderSummaryItemComponent implements OnInit {
  @Input() dish: Dish;
  constructor() { }

  ngOnInit() {
  }

}
