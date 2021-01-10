import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../dishes-list/dish.model';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() dish: Dish;
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  onRemoveFromCart() {
    this.cartService.removeFromCart(this.dish);
  }

}
