import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DishesService } from '../dishes.service';
import {Dish} from '../../dishes-list/dish.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish: Dish;
  id: number;

  constructor(private dishesService: DishesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.dish = this.dishesService.getDish(this.id);
        }
      );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.dishesService.deleteRecipe(this.id).subscribe((val) => {
      this.router.navigate(['/dishes']);
    });
  }

}
