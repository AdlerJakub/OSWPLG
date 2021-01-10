import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {DishesService} from './dishes.service';
import {Dish} from '../dishes-list/dish.model';

@Injectable({providedIn: 'root'})
export class DishesResolverService implements Resolve<Dish[]> {

  constructor(
    private recipesService: DishesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.recipesService.getDishes();
  }
}
