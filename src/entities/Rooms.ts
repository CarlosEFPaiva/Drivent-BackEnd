import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Hotels from "./Hotels";
import RoomType from "./RoomType";

@Entity("rooms")
export default class Rooms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  occupation: number;

  @ManyToOne(() => RoomType, roomtype => roomtype.id, { eager: true })
  @JoinColumn({ name: "typeId" })
  type: RoomType;

  @ManyToOne(() => Hotels, hotel => hotel.id)
  @JoinColumn({ name: "hotelId" })
  hotelId: number;
}
