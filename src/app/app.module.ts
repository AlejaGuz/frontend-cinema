import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowingComponent } from './create-showing/showing.component';
import { SaleComponent } from './sale/sale.component';
import { ListShowingComponent } from './list-showing/list-showing.component';
import { ListSalesComponent } from './list-sales/list-sales.component';
import { ManageDiscountComponent } from './manage-discount/manage-discount.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowingComponent,
    SaleComponent,
    ListShowingComponent,
    ListSalesComponent,
    ManageDiscountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
