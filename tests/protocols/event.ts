import Event from "../../src/entities/Event";

export class EventTest extends Event {
    vacancies: number;

    constructor(
      vacancies: number,
    ) {
      super();
      this.vacancies = vacancies;
    }
}
