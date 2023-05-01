import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowingModel } from '../models/showing.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShowingService {

  private baseURL = "https://localhost:7001/api/Showing";
  constructor(private httpClient: HttpClient) { }

  postShowing(showing: ShowingModel): Observable <ShowingModel>{
    return this.httpClient.post<ShowingModel>(`${this.baseURL}`, showing);
  }

  getShowings(): Observable <ShowingModel[]>{
    return this.httpClient.get<ShowingModel[]>(`${this.baseURL}`);
  }

  getShowingById(id:Number): Observable <ShowingModel>{
    return this.httpClient.get<ShowingModel>(`${this.baseURL}`+`/id/${id}`);
  }
}
