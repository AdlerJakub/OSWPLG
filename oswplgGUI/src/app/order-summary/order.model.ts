import {Dish} from '../dishes-list/dish.model';
import {OrderCredentialsModel} from '../order-credentials/order-credentials.model';

export class Order {
  dishes: Dish[];
  credentials: OrderCredentialsModel;
  isRealized = false;
}
