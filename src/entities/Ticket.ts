import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  static async getTicketsInfo() {
    const ticket = await this.find();
    return ticket.map(({ id, name, price }) => {
      return ({ id, name, price });
    });
  }
}
