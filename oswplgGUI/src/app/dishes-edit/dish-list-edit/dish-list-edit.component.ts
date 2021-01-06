import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { DishesService } from '../dishes.service';
import {Dish} from '../../dishes-list/dish.model';

@Component({
  selector: 'app-dish-list-edit',
  templateUrl: './dish-list-edit.component.html',
  styleUrls: ['./dish-list-edit.component.css']
})
export class DishListEditComponent implements OnInit, OnDestroy {
  dishes: Dish[];
  subscription: Subscription;

  constructor(private dishesService: DishesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.dishesService.dishesChanged
      .subscribe(
        (dishes: Dish[]) => {
          this.dishes = dishes;
        }
      );
    this.dishesService.getDishes().subscribe(res => {
      this.dishes = res;
    });
  }

  onNewDish() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
