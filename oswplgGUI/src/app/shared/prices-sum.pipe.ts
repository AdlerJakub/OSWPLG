import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from '../dishes-list/dish.model';

@Pipe({
  name: 'pricesSum'
})
export class PricesSumPipe implements PipeTransform {

  transform(value: Dish[], ...args: any[]): string {
    let counter = 0;

    for (const i of value) {
      counter += i.price;
    }
    return counter.toFixed(2);
  }

}
