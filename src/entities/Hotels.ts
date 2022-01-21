import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import Rooms from "./Rooms";

@Entity("hotels")
export default class Hotels extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Rooms, rooms => rooms.hotelId, { eager: true })
  @JoinColumn({ name: "id" })
  rooms: Rooms[];

  static async getHotelsInfos() {
    const result = await this.find();
    return result;
  }

  static async getRoomsAvailable(array: Rooms[]) {
    let available = 0;
   
    for(let i=0; i<array.length; i++) {
      available += array[i].type.capacity - array[i].occupation;
    }
    return available;
  }
}
