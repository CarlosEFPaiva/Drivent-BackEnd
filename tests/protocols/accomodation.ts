import Accomodation from "../../src/entities/Accomodation";

export default class AccomodationTest extends Accomodation {
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
