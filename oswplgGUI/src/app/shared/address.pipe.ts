import { Pipe, PipeTransform } from '@angular/core';
import {OrderCredentialsModel} from '../order-credentials/order-credentials.model';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: OrderCredentialsModel, ...args: any[]): string {
    return value.street + ' ' + value.houseNumber + (value.flatNumber && value.flatNumber !== '0' ? '/' + value.flatNumber : '') +
      ', ' + value.city;
  }

}
