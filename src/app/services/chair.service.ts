import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChairModel } from '../models/chair.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChairService {

  private baseURL = "https://localhost:7001/api/Chair";
  constructor(private httpClient: HttpClient) { }

  getChairByRowColumn(number:Number, row:String){
    console.log("NUMBER: "+number+" ROW: "+row);
    return this.httpClient.get<ChairModel>(`${this.baseURL}/row/${number}/column/${row}`);
  }

  getPriceByLever(level:Number){
    return this.httpClient.get<number>(`${this.baseURL}/level/${level}`);
  }

  getChairById(chairiId:Number){
    return this.httpClient.get<ChairModel>(`${this.baseURL}/id/${chairiId}`);
  }

  getOccupiedChairsByShow(showId:Number):Observable<ChairModel[]>{
    console.log("entro al servicio- showId: "+ showId);
    return this.httpClient.get<ChairModel[]>(`${this.baseURL}/busy/${showId}`);
  }

  getRows(){
    return this.httpClient.get<string[]>(`${this.baseURL}/rows`);
  }

  getNumbers(){
    return this.httpClient.get<number[]>(`${this.baseURL}/numbers`);
  }
}
