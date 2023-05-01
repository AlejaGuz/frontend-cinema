import { Component, OnInit } from '@angular/core';
import { ShowingService } from '../services/showing.service';
import { ShowingModel } from '../models/showing.model';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleModel } from '../models/schedule.model';

@Component({
  selector: 'app-list-showing',
  templateUrl: './list-showing.component.html',
  styleUrls: ['./list-showing.component.css']
})
export class ListShowingComponent implements OnInit {

  showings : ShowingModel[] = [];

  constructor(private showingService : ShowingService, private scheduleService:ScheduleService){}

  ngOnInit(): void {
    try{

      this.showingService.getShowings().subscribe(data=>{
        this.showings = data;  
        console.log("showings length dentro del get: "+ this.showings.length); 

        this.showings.forEach((s) =>{
          let id = s.scheduleID;
          console.log("idSch a consultar: "+id);
          if(id!=undefined){
            this.scheduleService.getScheduleById(id).subscribe(d =>{
              s.hour=d.hour;
              s.minutes = d.minutes;
              console.log("entro a modificar schedule: "+s.hour+":"+s.minutes);
            });
          }
          
        });

      });

      
   

    }catch(e){
      console.log("error: "+ e);
    }
    
  }

}
