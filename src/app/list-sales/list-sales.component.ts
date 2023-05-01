import { Component, OnInit } from '@angular/core';
import { SaleService } from '../services/sale.service';
import { Router } from '@angular/router';
import { SaleModel } from '../models/sale.model';
import { ShowingModel } from '../models/showing.model';
import { ShowingService } from '../services/showing.service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit{

  constructor (private saleService : SaleService, private showingService: ShowingService, 
    private scheduleService: ScheduleService ,private router : Router){

  }

  sales : SaleModel[] = [];
  showings!: ShowingModel[];
  selectedItem!: Number;
  show: ShowingModel = new ShowingModel();

  ngOnInit(): void {

    try{

      this.showingService.getShowings().subscribe(data=>{
        
        this.showings = data; 

   
      });



      this.allSales();
      

    }catch(e){
      console.log("error: "+ e);
    }
    
  }

  onChange(){

    if(this.selectedItem!=-1){
      this.saleService.getSalesgByShow(this.selectedItem).subscribe(data=>{
        this.sales = data;

        this.sales.forEach((item)=>{
          this.showingService.getShowingById(item.showingID).subscribe(d=>{
            if(d.movieName!=undefined){
              item.movieName = d.movieName;
            }
            if(d.scheduleID!=undefined){
              this.scheduleService.getScheduleById(d.scheduleID).subscribe(s=>{
                item.schedule = s.hour+":"+s.minutes;
              });
            }
                        
          });
        });
      });
    }else{
      this.allSales();
    }
    
  }

  private allSales(){

    this.saleService.getSales().subscribe(data=>{
        
      this.sales = data; 

      this.sales.forEach((item)=>{
        this.showingService.getShowingById(item.showingID).subscribe(d=>{
          if(d.movieName!=undefined){
            item.movieName = d.movieName;
          }
          if(d.scheduleID!=undefined){
            this.scheduleService.getScheduleById(d.scheduleID).subscribe(s=>{
              item.schedule = s.hour+":"+s.minutes;
            });
          }
                      
        });
      });
 
    });
  }

}
