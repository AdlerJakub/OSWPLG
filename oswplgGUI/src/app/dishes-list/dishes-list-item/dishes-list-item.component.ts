import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../dish.model';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-dishes-list-item',
  templateUrl: './dishes-list-item.component.html',
  styleUrls: ['./dishes-list-item.component.css']
})
export class DishesListItemComponent implements OnInit {
  @Input() dish: Dish;
  count = 1;

  constructor(private cartService: CartService) { }


  ngOnInit() {
  }

  onAdd() {
    this.count++;
  }

  onSub() {
    this.count--;
  }

  addToCart() {
    this.cartService.addToCart(this.dish, this.count);
  }

}
