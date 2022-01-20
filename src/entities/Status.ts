import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("status")
export default class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
