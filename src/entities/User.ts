import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, Column } from "typeorm";
import Status from "./Status";
import Ticket from "./Ticket";
import Accomodation from "./Accomodation";
import Rooms from "./Rooms";

import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";
import InvalidDataError from "@/errors/InvalidData";
import UnauthorizedError from "@/errors/Unauthorized";
import UserEvent from "./UsersEvents";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    roomId: number;

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

  @OneToOne(() => Rooms, { eager: true })
  @JoinColumn({ name: "roomId" })
    rooms: Rooms;

  @OneToMany(() => UserEvent, userEvent => userEvent.event)
    userEvent: UserEvent

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

    if (user) {
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

  static async findById(id: number) {
    const user = await this.findOne({ id });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateStatus(newStatusId: number) {
    const newStatus = await Status.findOne({ id: newStatusId });

    if (!newStatus) {
      throw new InvalidDataError("Status", ["Status not found"]);
    }

    this.status = newStatus;
    await this.save();
    return this;
  }

  static async updateTicketAndAccomodation(userId: number, ticketId: number, accomodationId: number) {
    const user = await this.findById(userId);

    if (!user) {
      throw new UnauthorizedError();
    }

    const newTicket = await Ticket.findOne({ id: ticketId });

    if (!newTicket) {
      throw new InvalidDataError("Ticket", ["Ticket not found"]);
    }

    const newAccomodation = await Accomodation.findOne({ id: accomodationId });

    if (!newAccomodation) {
      throw new InvalidDataError("Accomodation", ["Accomodation not found"]);
    }

    user.ticket = newTicket;
    user.accomodation = newAccomodation;
    user.updateStatus(3);
    await user.save();
    return user;
  }

  static async updateStatusAndConfirmPayment(userId: number) {
    const user = await this.findById(userId);

    if (!user) {
      throw new UnauthorizedError();
    }

    user.updateStatus(4);
    await user.save();
    return user;
  }

  getMainAtributes() {
    return {
      id: this.id,
      email: this.email,
      ticket: this.ticket,
      accomodation: this.accomodation,
      status: this.status,
    };
  }
}

