import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {Dish} from '../dishes-list/dish.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartContent: Dish[];

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit() {
    this.cartContent = this.cartService.getCartContent();
  }

  buy() {
    this.router.navigate(['orderCredentials']);
  }

}
