import { TicketModel } from "./ticket.model";

export class SaleModel {
    date!: Date;
    showingID!: Number;
    saleValue!: Number;
    tickets!: TicketModel[];
    movieName!:String;
    schedule!:string;
}
