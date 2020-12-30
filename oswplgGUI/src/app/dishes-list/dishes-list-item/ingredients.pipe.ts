import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredients'
})
export class IngredientsPipe implements PipeTransform {

  transform(value: string[], ...args: any[]): string {
    let str = '';

    value.forEach((ingredient, index) => {
      str += ingredient;
      if (index < value.length - 1) {
        str += ', ';
      }
    });

    return str;
  }

}
