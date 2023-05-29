import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponentComponent } from './components/add-product-component/add-product-component.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  {path:"", redirectTo:"catalogue", pathMatch:"full"},
  {path:"catalogue", component:CatalogueComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"add-product", component:AddProductComponentComponent},
  {path:"update-product", component:UpdateProductComponent},
  {path:"update-product/:id", component:UpdateProductComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
