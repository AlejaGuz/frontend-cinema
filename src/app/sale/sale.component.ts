import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowingModel } from '../models/showing.model';
import { ShowingService } from '../services/showing.service';
import { ChairService } from '../services/chair.service';
import { ChairModel } from '../models/chair.model';
import { SaleService } from '../services/sale.service';
import { TicketModel } from '../models/ticket.model';
import { SaleModel } from '../models/sale.model';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  showings!: ShowingModel[];
  selectedItem!: Number;
  rows:number[]=[];
  columns: String[] = [];
  saleValue: number = 0;
  chairsSellList:ChairModel[] = [];
  disableChairs:ChairModel[] = [];
  allChairsList:ChairModel[] = [];
  discount:number=0;
 

  constructor(private showingService : ShowingService, private chairService: ChairService,
    private saleService: SaleService, private scheduleService: ScheduleService, private router: Router){}

  ngOnInit(): void {
    
    //this.FullColumns();

    try{

      this.showingService.getShowings().subscribe(data=>{
        
        this.showings = data; 

   
      });

      this.chairService.getRows().subscribe(data=>{
        this.columns= data;
      });

      this.chairService.getNumbers().subscribe(data=>{
        this.rows= data;
      });

      

    }catch(e){
      console.log("error: "+ e);
    }
    
  }

  public onChange(){

    console.log("ID Selected: "+this.selectedItem);

    this.saleValue=0;

    let button = document.getElementById("sellbtn") as HTMLButtonElement;

    if(button){
      button.disabled=false;
    }

    this.clearColors();

    this.chairService.getOccupiedChairsByShow(this.selectedItem).subscribe(data=>{
      this.disableChairs=data;
      if(this.disableChairs!=null){
        this.chairsColors();
      }
    });

    this.showingService.getShowingById(this.selectedItem).subscribe(data =>{
      let idSch = data.scheduleID;
      if(idSch!= undefined){
        this.scheduleService.getScheduleById(idSch).subscribe(d =>{

          if(d.discount!= undefined){
            this.discount = d.discount;
          }else{
            this.discount = 0;
          }
          
        });
      }
      
    });

  }


  onClick(event: any) {
    console.log("El botón presionado es: " + event.target.id);
    
    let idB = this.getIdsRowColumn(event.target.id);

    const button = document.getElementById(event.target.id);
    if (button) {
      if(button.style.backgroundColor == 'green'){
        button.style.backgroundColor = 'lightgrey';

        this.deleteSeat(parseInt(idB[0]),idB[1]);
        this.chairService.getChairByRowColumn(parseInt(idB[0]),idB[1]).subscribe(data=>{
          
          this.chairService.getPriceByLever(data.levelID).subscribe(p=>{
            let price = p;
            if(this.discount>0){
              price = p-((p*this.discount)/100);
            }
            console.log("precio antes de descuento: "+p);
            console.log("descuento: "+this.discount);
            this.saleValue-=price;
          });
        });
        
       
      }else{
        button.style.backgroundColor = 'green';
        

          let row = parseInt(idB[0]);
          console.log("column tranform: "+ idB[1]);
          this.chairService.getChairByRowColumn(row,idB[1]).subscribe(data=>{
            console.log(data.toString());
            this.chairsSellList.push(data);
            
            this.chairService.getPriceByLever(data.levelID).subscribe(p=>{
              let price = p;
              if(this.discount>0){
                price = p-((p*this.discount)/100);
              }
              this.saleValue+=price;
            });
          });
      }
      
    }

  }

  public sell(){

    if(this.chairsSellList!=null){
      if(this.chairsSellList.length>0){
        let tickets:TicketModel[] = [];
    

        this.chairsSellList.forEach((item)=>{
          console.log("item: "+item.chairID);
          if(item.chairID !== undefined){
            let t:TicketModel = new TicketModel();
            t.idChair=item.chairID;
            t.idShowing=this.selectedItem;
            tickets.push(t);
          }      
        });

        let sale: SaleModel = new SaleModel();

        sale.date = new Date();
        sale.saleValue = this.saleValue;
        sale.showingID = this.selectedItem;
        sale.tickets = tickets;

        this.saleService.postSale(sale).subscribe(data=>{
          console.log("data sale: "+ data);
        });

        this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
          this.router.navigate(['create-sale']).then(()=>{
            console.log(`After navigation I am on:${this.router.url}`)
          })
        });
      }else{
        window.alert("You should select at least 1 seat");
      }
    }else{
      window.alert("You should select at least 1 seat");
    }


  }

  private getIdsRowColumn(id:String): string[]{
    let splitIds: string[] = [];
    
    if(id.length==3){
      let num = id.charAt(0)+id.charAt(1);
      let row = id.charAt(2);
      splitIds.push(num);
      splitIds.push(row);
    }else{
      let num = id.charAt(0);
      let row = id.charAt(1);
      splitIds.push(num);
      splitIds.push(row);
    }

    return splitIds

  }

  private deleteSeat(number:Number, row:string){

    let ix = this.chairsSellList.indexOf(
      this.chairsSellList.filter(c => c.number==number && c.row== row)[0]);

    console.log("indice a eliminar: "+ix);

    this.chairsSellList.splice(ix, 1);

  }

  private chairsColors(){

    this.disableChairs.forEach((item) => {
      let idBtn = item.number+""+item.row;
      let button = document.getElementById(idBtn) as HTMLButtonElement;
      if (button) {
        console.log("button is true idBtn: "+idBtn);
        button.style.backgroundColor = 'red';
        button.disabled = true;
      }
    });
      
  }

  private clearColors(){

    if(this.disableChairs!=null){
      this.disableChairs.forEach((item) => {
        let idBtn = item.number+""+item.row;
        let button = document.getElementById(idBtn) as HTMLButtonElement;
        if (button) {
          console.log("button is true idBtn: "+idBtn);
          button.style.backgroundColor = 'lightgrey';
          button.disabled = false;
        }
      });
    }

  }


}
