import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: 'homePage', component: HomePageComponent},
  {path: '', redirectTo: 'homePage', pathMatch: 'full'},
  {path: 'productDetails/:id', component: ProductDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
