import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DishesListService} from './dishes-list.service';
import {Dish} from './dish.model';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit, OnDestroy {

  dishes: Dish[];


  constructor(private dishesListService: DishesListService) { }

  ngOnInit() {
//    this.recipes = this.recipeService.getRecipes();
    this.dishes = [new Dish(1, 'pizza podstawowa', ['ciasto', 'sos', 'ser'], 123)];
  }

  ngOnDestroy() {

  }
}
