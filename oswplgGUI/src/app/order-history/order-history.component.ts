import { Component, OnInit } from '@angular/core';
import {Order} from '../order-summary/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [JSON.parse(`{
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
  }`)];
  constructor() { }

  ngOnInit() {
  }

}
