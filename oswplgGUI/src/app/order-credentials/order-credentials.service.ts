import { Injectable } from '@angular/core';
import {OrderCredentialsModel} from './order-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class OrderCredentialsService {
  private orderCredentials: OrderCredentialsModel;
  constructor() { }

  sendOrderCredentials(credentials: OrderCredentialsModel): void {
    this.orderCredentials = credentials;
  }

  getOrderCredentials(): OrderCredentialsModel {
    return this.orderCredentials;
  }
}
