import { Component, NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/Components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/Components/product-details/product-details.component';
import { CartComponent } from './carts/Components/cart/cart.component';

const routes: Routes= [
  {path:'products',component:AllProductsComponent},
  {path:'details/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:"**",component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
