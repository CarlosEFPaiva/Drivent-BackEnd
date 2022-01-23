import Hotels from "../../src/entities/Hotels";
import Rooms from "../../src/entities/Rooms";

export class HotelResult extends Hotels {
    id: number;
    name: string;
    password: string;
    description: string;
    imageUrl: string;
    rooms: Rooms[];

    constructor(
      id: number,
      name: string,
      description: string,
      imageUrl: string,
      rooms: Rooms[],
    ) {
      super();
      this.id = id;
      this.name = name;
      this.description = description;
      this.imageUrl = imageUrl;
      this.rooms = rooms;
    }
}
