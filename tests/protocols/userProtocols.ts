import Accomodation from "../../src/entities/Accomodation";
import Status from "../../src/entities/Status";
import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";

class StatusResult implements Status {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  hasId(): boolean {
    throw new Error("Method not implemented.");
  }

  save(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  remove(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  softRemove(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  recover(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  reload(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export class UserResult implements User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    ticket: Ticket;
    accomodation: Accomodation;
    status: Status;

    constructor(id: number, email: string, status: { id: number, name: string }) {
      this.id = id;
      this.email = email;
      this.status = new StatusResult(status.id, status.name);
    }

    hasId(): boolean {
      throw new Error("Method not implemented.");
    }

    save(): Promise<this> {
      throw new Error("Method not implemented.");
    }

    remove(): Promise<this> {
      throw new Error("Method not implemented.");
    }

    softRemove(): Promise<this> {
      throw new Error("Method not implemented.");
    }

    recover(): Promise<this> {
      throw new Error("Method not implemented.");
    }

    reload(): Promise<void> {
      throw new Error("Method not implemented.");
    }
}
