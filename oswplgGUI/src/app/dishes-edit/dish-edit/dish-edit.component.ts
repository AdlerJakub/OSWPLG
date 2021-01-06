import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dishesService: DishesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    // lista składników otrzymana z formularza jest mapą <"name", value> zamiast string[]
    const tempIngredients = [];
    this.recipeForm.value.ingredients.forEach(val => {
      tempIngredients.push(val.name);
    });
    this.recipeForm.value.ingredients = tempIngredients;

    if (this.editMode) {
      this.recipeForm.value.id = this.id;
      this.dishesService.updateRecipe(this.id, this.recipeForm.value).subscribe((val) => {
        this.onCancel();
      });
    } else {
      this.dishesService.addRecipe(this.recipeForm.value).subscribe((val) => {
        this.onCancel();
      });
    }
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipePrice = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.dishesService.getDish(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipePrice = recipe.price.toString();
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient, Validators.required)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription),
      price: new FormControl(recipePrice, Validators.pattern('[0-9]+(.[0-9][0-9]?)?')),
      ingredients: recipeIngredients
    });
  }
}
