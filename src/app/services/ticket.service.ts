import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChairModel } from '../models/chair.model';
import { TicketModel } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseURL = "https://localhost:7001/api/Ticket";
  constructor(private httpClient: HttpClient) { }

  getTicketsByShow(showID:Number){
    return this.httpClient.get<TicketModel[]>(`${this.baseURL}/show/${showID}`);
  }
}
