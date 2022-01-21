import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("room_type")
export default class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
}
