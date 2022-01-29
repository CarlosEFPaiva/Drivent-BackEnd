import Event from "../../src/entities/Event";

export class EventTest extends Event {
    id: number;
    vacancies: number;

    constructor(
      id: number,
      vacancies: number,
    ) {
      super();
      this.id = id;
      this.vacancies = vacancies;
    }
}
