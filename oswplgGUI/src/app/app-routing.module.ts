import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishesEditComponent } from './dishes-edit/dishes-edit.component';
import { DishStartComponent } from './dishes-edit/dish-start/dish-start.component';
import { DishDetailComponent } from './dishes-edit/dish-detail/dish-detail.component';
import { DishEditComponent } from './dishes-edit/dish-edit/dish-edit.component';
import { DishesResolverService } from './dishes-edit/dishes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import {DishesListComponent} from './dishes-list/dishes-list.component';
import {ContactComponent} from './contact/contact.component';
import {CartComponent} from './cart/cart.component';
import {OrderCredentialsComponent} from './order-credentials/order-credentials.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {OrderHistoryComponent} from './order-history/order-history.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dishes-list', pathMatch: 'full' },
  { path: 'dishes-list', component: DishesListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orderCredentials', component: OrderCredentialsComponent },
  { path: 'orderSummary', component: OrderSummaryComponent },
  {
    path: 'orderStatus',
    component: OrderStatusComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: ':id',
        component: OrderStatusComponent,
        resolve: [DishesResolverService]
      }
    ]
  },
  {
    path: 'orderHistory',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dishes',
    component: DishesEditComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DishStartComponent },
      { path: 'new', component: DishEditComponent },
      {
        path: ':id',
        component: DishDetailComponent,
        resolve: [DishesResolverService]
      },
      {
        path: ':id/edit',
        component: DishEditComponent,
        resolve: [DishesResolverService]
      }
    ]
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
