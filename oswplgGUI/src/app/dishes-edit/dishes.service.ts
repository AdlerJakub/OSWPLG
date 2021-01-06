import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

import {Dish} from '../dishes-list/dish.model';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class DishesService {
  dishesChanged = new Subject<Dish[]>();

  private dishes: Dish[] = [];

  constructor(private http: HttpClient) {
  }

  getDishes(): Observable<Dish[]> {
    if (this.dishes.length === 0) {
      return this.fetchDishes().pipe(tap(res => {
        this.dishes = res;
      }));
    } else {
      return of(this.dishes);
    }
  }

  private fetchDishes(): Observable<Dish[]> {
    return this.http
      .get<any>(
        '/dishes/'
      )
      .pipe(
        map(res => {
          return res.results;
        })
      );
  }

  getDish(index: number) {
    return this.dishes.find(elem => {
      return elem.id === index;
    });
  }

  addRecipe(recipe: Dish): Observable<Dish> {
    return this.http.post<Dish>('/dishes/', recipe).pipe(
      tap((val) => {
          recipe.id = val.id;
          this.dishes.push(recipe);
          this.dishesChanged.next(this.dishes.slice());
        }
      ));
  }

  updateRecipe(index: number, newRecipe: Dish): Observable<Dish> {
    console.log(newRecipe);
    this.dishes[this.dishes.findIndex((dish) => {
      return dish.id === index;
    })] = newRecipe;
    this.dishesChanged.next(this.dishes.slice());

    return this.http.put<Dish>('/dishes/' + index + '/', newRecipe);
  }

  deleteRecipe(index: number): Observable<Dish> {
    this.dishes.splice(this.dishes.findIndex(dish => {
      return dish.id === index;
    }), 1);
    this.dishesChanged.next(this.dishes.slice());

    return this.http.delete<Dish>('/dishes/' + index + '/');
  }
}
