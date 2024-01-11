import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginService, authGuard } from './services/login.service';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: 'homePage', component: HomePageComponent},
  {path: '', redirectTo: 'homePage', pathMatch: 'full'},
  {path: 'productDetails/:id', component: ProductDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'orders', component: OrdersComponent, canActivate:[authGuard]},
  {path: 'cart', component: CartComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
