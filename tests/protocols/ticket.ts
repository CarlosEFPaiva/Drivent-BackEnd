import Ticket from "../../src/entities/Ticket";

export default class TicketTest extends Ticket {
  id: number;
  name: string;
  price: string;

  constructor(id: number, name: string, price: string) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
