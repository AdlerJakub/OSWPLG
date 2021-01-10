import { Injectable } from '@angular/core';
import { Dish } from '../dishes-list/dish.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartContent: Dish[] = [];

  constructor() { }

  addToCart(dishToAdd: Dish, count: number = 1) {
    for (let i = 0; i < count; i++) {
      this.cartContent.push(dishToAdd);
    }
  }

  removeFromCart(dishToRemove: Dish) {
    this.cartContent.splice(this.cartContent.findIndex((val) => {
      return val.id === dishToRemove.id;
    }), 1);
  }

  getCartContent(): Dish[] {
    return this.cartContent;
  }
}
