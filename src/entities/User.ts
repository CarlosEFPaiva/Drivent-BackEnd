import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import Status from "./Status";
import Ticket from "./Ticket";
import Accomodation from "./Accomodation";

import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToOne(() => Ticket, { eager: true })
  @JoinColumn({ name: "ticketId" })
    ticket: Ticket;

  @OneToOne(() => Accomodation, { eager: true })
  @JoinColumn({ name: "accomodationId" })
    accomodation: Accomodation;

  @OneToOne(() => Status, { eager: true })
  @JoinColumn({ name: "statusId" })
    status: Status;

  static async createNew(email: string, password: string) {
    await this.validateDuplicateEmail(email);
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if(user) {
      throw new EmailNotAvailableError(email);
    }
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}

