import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaleModel } from '../models/sale.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private baseURL = "https://localhost:7001/api/Sale";
  constructor(private httpClient: HttpClient) { }

  postSale(sale:SaleModel):Observable <SaleModel>{
    return this.httpClient.post<SaleModel>(`${this.baseURL}`, sale);
  }

  getSales(): Observable <SaleModel[]>{
    return this.httpClient.get<SaleModel[]>(`${this.baseURL}`);
  }

  getSalesgByShow(id:Number): Observable <SaleModel[]>{
    return this.httpClient.get<SaleModel[]>(`${this.baseURL}`+`/show/${id}`);
  }
}
