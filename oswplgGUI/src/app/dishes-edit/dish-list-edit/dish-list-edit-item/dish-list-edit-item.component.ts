import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../../../dishes-list/dish.model';

@Component({
  selector: 'app-dish-list-edit-item',
  templateUrl: './dish-list-edit-item.component.html',
  styleUrls: ['./dish-list-edit-item.component.css']
})
export class DishListEditItemComponent implements OnInit {
  @Input() dish: Dish;

  ngOnInit() {
  }
}
