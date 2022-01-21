import Accomodation from "../../src/entities/Accomodation";
import Status from "../../src/entities/Status";
import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";
import StatusTest from "./status";

export class UserResult extends User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    ticket: Ticket;
    accomodation: Accomodation;
    status: Status;

    constructor(id: number, email: string, status: { id: number, name: string }) {
      super();
      this.id = id;
      this.email = email;
      this.status = new StatusTest(status.id, status.name);
    }
}
