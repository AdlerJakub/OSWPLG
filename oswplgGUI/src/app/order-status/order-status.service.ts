import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Order} from '../order-summary/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private order: Order = JSON.parse(`{
    "credentials":
      {
        "city": "Siemianowice Śląskie",
        "email": "jakuadl617@student.polsl.pl",
        "flatNumber": "3",
        "houseNumber": "2a",
        "name": "Jan",
        "phoneNumber": "123-456-789",
        "street": "Bytomska",
        "surname": "Kowalski",
        "zipCode": "41-103"
      },
    "dishes": [
      {
        "descritpion": "",
        "id": 1,
        "ingredients": [
          "ciasto",
          "sos",
          "ser"
        ],
        "name": "Margarita 60cm",
        "price": 29.99
      },
      {
        "descritpion": "",
        "id": 2,
        "ingredients": [
          "ciasto",
          "sos",
          "ser"
        ],
        "name": "Margarita 43cm",
        "price": 29.99
      },
      {
        "descritpion": "",
        "id": 3,
        "ingredients": [
          "ciasto",
          "sos",
          "ser",
          "pieczarki",
          "szynka"
        ],
        "name": "Capriciosa 45cm",
        "price": 35
      }
    ],
    "realized": 0
  }`);

  constructor() { }

  getOrder(id: number): Observable<Order> {
    return of(this.order);
  }
}
