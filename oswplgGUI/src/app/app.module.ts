import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DishesEditComponent } from './dishes-edit/dishes-edit.component';
import { DishListEditComponent } from './dishes-edit/dish-list-edit/dish-list-edit.component';
import { DishDetailComponent } from './dishes-edit/dish-detail/dish-detail.component';
import { DishListEditItemComponent } from './dishes-edit/dish-list-edit/dish-list-edit-item/dish-list-edit-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DishStartComponent } from './dishes-edit/dish-start/dish-start.component';
import { DishEditComponent } from './dishes-edit/dish-edit/dish-edit.component';
import { DishesService } from './dishes-edit/dishes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { ContactComponent } from './contact/contact.component';
import { DishesListItemComponent } from './dishes-list/dishes-list-item/dishes-list-item.component';
import { IngredientsPipe } from './dishes-list/dishes-list-item/ingredients.pipe';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { OrderCredentialsComponent } from './order-credentials/order-credentials.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderSummaryItemComponent } from './order-summary/order-summary-item/order-summary-item.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AddressPipe } from './shared/address.pipe';
import { PricesSumPipe } from './shared/prices-sum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DishesEditComponent,
    DishListEditComponent,
    DishDetailComponent,
    DishListEditItemComponent,
    DropdownDirective,
    DishStartComponent,
    DishEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    DishesListComponent,
    ContactComponent,
    DishesListItemComponent,
    IngredientsPipe,
    CartComponent,
    CartItemComponent,
    OrderCredentialsComponent,
    OrderSummaryComponent,
    OrderSummaryItemComponent,
    OrderStatusComponent,
    OrderHistoryComponent,
    AddressPipe,
    PricesSumPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DishesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
