import RoomType from "../../src/entities/RoomType";

export class RoomTypeResult extends RoomType {
    id: number;
    name: string;
    capacity: number;

    constructor(
      id: number,
      name: string,
      capacity: number,
    ) {
      super();
      this.id = id;
      this.name = name;
      this.capacity = capacity;
    }
}
