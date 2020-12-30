export class Dish {
  public id: number;
  public name: string;
  public ingredients: string[];
  public price: number;
  public description: string;

  constructor(id: number, name?: string, ingredients?: string[], price?: number, description?: string) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.price = price;
    this.description = description;
  }
}
