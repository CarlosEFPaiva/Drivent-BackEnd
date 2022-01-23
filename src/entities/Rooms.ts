import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Hotels from "./Hotels";
import RoomType from "./RoomType";
import User from "./User";

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

  static async getRoomUser(userId: number) {
    const oldUserInfo = await User.findById(userId);

    if (oldUserInfo.rooms !== null) {
      const oldRoom = await Rooms.find({ where: { id: oldUserInfo.rooms.id } });

      return oldRoom;
    }

    return (null);
  }

  static async getRoomById(roomId: number) {
    const room = await this.findOne({ where: { id: roomId } });

    return(room);
  }
}
