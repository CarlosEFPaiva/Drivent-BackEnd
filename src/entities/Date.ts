import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import Event from "./Event";

@Entity("dates")
export default class Date extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Event, event => event.date )
  @JoinColumn({ name: "id" })
  events: Event[];
}
