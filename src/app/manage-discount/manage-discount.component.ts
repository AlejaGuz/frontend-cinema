import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleModel } from '../models/schedule.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-discount',
  templateUrl: './manage-discount.component.html',
  styleUrls: ['./manage-discount.component.css']
})

export class ManageDiscountComponent implements OnInit{

  hour!:number;
  minutes!:number;
  disCheck: boolean = false;
  discount!:number;
  selectedSchedule!:Number;
  schedules!: ScheduleModel[];
  currentDisc!:number;
  discountUp!:number;

  constructor(private scheduleService: ScheduleService, private router: Router) {

    
  }

  ngOnInit(): void {
      this.scheduleService.getSchedules().subscribe(d=>{
        this.schedules = d;
      });
  }

  onSubmitCreate(){
    if(this.validateSubmit()){

      let schedule = new ScheduleModel();
      schedule.hour = this.hour;
      schedule.minutes = this.minutes;
      if(this.disCheck){
        schedule.isDiscount=true;
        schedule.discount = this.discount;
      }

      this.scheduleService.postSchedule(schedule).subscribe(d=>{
        window.alert("successful id: "+d.scheduleID);
      });

      this.refresh();
      
    }else{
      window.alert("you can't leave fields blank");
    }
  }

  onChange(){
    this.scheduleService.getScheduleById(this.selectedSchedule).subscribe(d=>{
      this.currentDisc = 0;
      if(d.discount!=undefined){
        this.currentDisc = d.discount;
      }
    });
  }

  onSubmitUpdate(){
    if(this.selectedSchedule!=null){
      if(this.discountUp!=null){
        this.scheduleService.getScheduleById(this.selectedSchedule).subscribe(d=>{
          d.discount=this.discountUp;
          this.scheduleService.updateSchedule(d).subscribe(u=>{
            console.log("update: " +u);
          });
        });

        this.refresh();

      }else{
        window.alert("Type any Discount");
      }
    }else{
      window.alert("Select any schedule to update");
    }
  }

  public check(event: any){
    
    const myCheckbox = document.getElementById("isDisc") as HTMLInputElement;
    this.disCheck = myCheckbox.checked;

    console.log("check: "+this.disCheck);

  }

  private validateSubmit():boolean{
    let flag = false;

    if(this.hour!=null && this.minutes!=null){
      if(this.hour!=0){
        if(this.disCheck){
          if(this.discount!=null){
            flag=true
          }
        }else{
          flag=true
        }
      }
    }

    return flag;
  }

  private refresh(){

    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['manage-discount']).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    });
  }

}
