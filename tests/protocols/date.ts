import Date from "../../src/entities/Date";
import Event from "../../src/entities/Event";

export class DateResult extends Date {
    id: number;
    name: string;
    events: Event[];

    constructor(
      id: number,
      name: string,
      events: Event[],
    ) {
      super();
      this.id = id;
      this.name = name;
      this.events = events;
    }
}
