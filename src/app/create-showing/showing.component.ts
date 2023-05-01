import { Component, OnInit } from '@angular/core';
import { ShowingService } from '../services/showing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowingModel } from '../models/showing.model'; 
import { ScheduleModel } from '../models/schedule.model';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent implements OnInit{

  model: ShowingModel = new ShowingModel();
  moviename! : String;
  hour!: Number;
  minutes!: Number;
  url! : String;
  selectedSchedule!:Number;
  schedules!: ScheduleModel[];

  constructor (private showingService : ShowingService, private router : Router,
    private route:ActivatedRoute, private scheduleServices: ScheduleService){

  }

  ngOnInit(): void {
    try {
      this.scheduleServices.getSchedules().subscribe(data=>{
        this.schedules=data;
      });
    } catch (e) {
      console.log("error: "+ e);
    }
  }

  public onSubmit(){

    if(this.moviename!= null && this.selectedSchedule!=undefined){
      if(this.moviename!==""){
        this.model.movieName = this.moviename;
        this.model.urlImage = this.url;
        this.model.scheduleID = this.selectedSchedule;

        this.showingService.postShowing(this.model).subscribe(data=>{
          console.log("Info POST Showing: "+data);
          this.router.navigate(['list-showing']);
        });
      }else{
        window.alert("Can't leave the fields blank");
      }
    }else{
      window.alert("Can't leave the fields blank");
    }
    

  }

}
