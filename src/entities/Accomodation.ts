import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("accomodation_types")
export default class Accomodation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  static async getAccomodationsInfo() {
    const ticket = await this.find();
    return ticket.map(({ id, name, price }) => {
      return ({ id, name, price });
    });
  }
}
