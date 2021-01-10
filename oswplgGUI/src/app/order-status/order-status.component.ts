import {Component, OnInit} from '@angular/core';
import {OrderCredentialsModel} from '../order-credentials/order-credentials.model';
import {Dish} from '../dishes-list/dish.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderStatusService} from './order-status.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  private orderCredentials: OrderCredentialsModel;
  private cartContent: Dish[];
  private realized: boolean;
  credentialsForm: FormGroup;

  constructor(
    private orderStatusService: OrderStatusService,
    private router: Router) {
  }

  ngOnInit() {
      const order = this.orderStatusService.getLastOrder();
      this.orderCredentials = order.credentials;
      this.cartContent = order.dishes;
      this.realized = order.realized === 1 ? true : false;
      if (!this.orderCredentials || !this.cartContent) {
          this.router.navigate(['dishes-list']);
      }
      this.initForm(this.orderCredentials);

  }

  private initForm(credentials: OrderCredentialsModel) {
    const name = credentials.name;
    const surname = credentials.surname;
    const street = credentials.street;
    const houseNumber = credentials.houseNumber;
    const flatNumber = credentials.flatNumber;
    const city = credentials.city;
    const zipCode = credentials.zipCode;
    const phoneNumber = credentials.phoneNumber;
    const email = credentials.email;
    const realized = this.realized;

    this.credentialsForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      surname: new FormControl(surname, Validators.required),
      street: new FormControl(street, Validators.required),
      houseNumber: new FormControl(houseNumber, [Validators.required, Validators.pattern('[0-9]+([a-z]|[A-Z])?')]),
      flatNumber: new FormControl(flatNumber, [Validators.pattern('[0-9]+')]),
      city: new FormControl(city, [Validators.required]),
      zipCode: new FormControl(zipCode, [Validators.required]),
      phoneNumber: new FormControl(phoneNumber, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{3}')]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      realized: new FormControl(realized)
    });
    this.credentialsForm.disable();
  }
}
