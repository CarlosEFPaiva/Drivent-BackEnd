import Rooms from "../../src/entities/Rooms";
import RoomType from "../../src/entities/RoomType";

export class RoomResult extends Rooms {
    id: number;
    number: number;
    hotelId: number;
    occupation: number;
    type: RoomType;

    constructor(
      id: number,
      number: number,
      hotelId: number,
      occupation: number,
      type: RoomType,
    ) {
      super();
      this.id = id;
      this.number = number;
      this.hotelId = hotelId;
      this.occupation = occupation;
      this.type = type;
    }
}
