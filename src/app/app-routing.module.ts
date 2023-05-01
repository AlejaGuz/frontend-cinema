import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowingComponent } from './create-showing/showing.component';
import { SaleComponent } from './sale/sale.component';
import { ListShowingComponent } from './list-showing/list-showing.component';
import { ListSalesComponent } from './list-sales/list-sales.component';
import { ManageDiscountComponent } from './manage-discount/manage-discount.component';

const routes: Routes = [
  {
    path:'create-sale', component: SaleComponent
  },
  {
    path:'create-showing', component: ShowingComponent
  },
  {
    path:'list-showing', component: ListShowingComponent
  },
  {
    path:'list-sales', component: ListSalesComponent
  },
  {
    path:'manage-discount', component: ManageDiscountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
