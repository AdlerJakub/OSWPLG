import { Component, OnInit } from '@angular/core';
import {OrderCredentialsService} from '../order-credentials/order-credentials.service';
import {CartService} from '../cart/cart.service';
import {OrderCredentialsModel} from '../order-credentials/order-credentials.model';
import {Dish} from '../dishes-list/dish.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderSummaryService} from './order-summary.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderCredentials: OrderCredentialsModel;
  cartContent: Dish[];
  credentialsForm: FormGroup;

  constructor(private orderCredentialsService: OrderCredentialsService,
              private cartService: CartService,
              private router: Router,
              private orderSummaryService: OrderSummaryService) { }

  ngOnInit() {
    this.orderCredentials = this.orderCredentialsService.getOrderCredentials();
    this.cartContent = this.cartService.getCartContent();
    if (!this.orderCredentials || !this.cartContent) {
      this.router.navigate(['dishes-list']);
    }
    this.initForm(this.orderCredentials);
  }

  order() {
    this.orderSummaryService.order(this.cartContent, this.orderCredentials);
    this.router.navigate(['']);
  }

  private initForm(credentials: OrderCredentialsModel) {
    const name = credentials.name;
    const surname = credentials.surname;
    const street = credentials.street;
    const houseNumber = credentials.houseNumber;
    const flatNumber = credentials.flatNumber;
    const phoneNumber = credentials.phoneNumber;
    const email = credentials.email;

    this.credentialsForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      surname: new FormControl(surname, Validators.required),
      street: new FormControl(street, Validators.required),
      houseNumber: new FormControl(houseNumber, [Validators.required, Validators.pattern('[0-9]+([a-z]|[A-Z])?')]),
      flatNumber: new FormControl(flatNumber, [Validators.pattern('[0-9]+')]),
      phoneNumber: new FormControl(phoneNumber, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{3}')]),
      email: new FormControl(email, [Validators.required, Validators.email])
    });
    this.credentialsForm.disable();
  }
}
