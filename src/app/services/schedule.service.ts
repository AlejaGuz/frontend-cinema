import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduleModel } from '../models/schedule.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseURL = "https://localhost:7001/api/Schedule";

  constructor(private httpClient: HttpClient) { }

  getSchedules(): Observable <ScheduleModel[]>{
    return this.httpClient.get<ScheduleModel[]>(`${this.baseURL}`);
  }

  getScheduleById(id:Number):Observable <ScheduleModel>{
    return this.httpClient.get<ScheduleModel>(`${this.baseURL}/id/${id}`);
  }

  postSchedule(schedule:ScheduleModel):Observable <ScheduleModel>{
    return this.httpClient.post<ScheduleModel>(`${this.baseURL}`,schedule);
  }

  updateSchedule(schedule:ScheduleModel):Observable <ScheduleModel>{
    return this.httpClient.put<ScheduleModel>(`${this.baseURL}`,schedule);
  }

}
