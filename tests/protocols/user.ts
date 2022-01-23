import Accomodation from "../../src/entities/Accomodation";
import Status from "../../src/entities/Status";
import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";
import AccomodationTest from "./accomodation";
import StatusTest from "./status";
import TicketTest from "./ticket";

export class UserResult extends User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    ticket: Ticket;
    accomodation: Accomodation;
    status: Status;

    constructor(
      id: number,
      email: string,
      status: { id: number, name: string },
      ticket?: { id: number, name: string, price: string },
      accomodation?: { id: number, name: string, price: string },
    ) {
      super();
      this.id = id;
      this.email = email;
      this.status = new StatusTest(status.id, status.name);
      if (accomodation) {
        this.accomodation = new AccomodationTest(accomodation.id, accomodation.name, accomodation.price);
      }
      if (ticket) {
        this.ticket = new TicketTest(ticket.id, ticket.name, ticket.price);
      }
    }
}
