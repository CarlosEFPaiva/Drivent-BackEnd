import Status from "../../src/entities/Status";

export default class StatusTest extends Status {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
