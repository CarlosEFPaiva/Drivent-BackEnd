import ConflictError from "@/errors/ConflictError";
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Event from "./Event";
import User from "./User";

@Entity("users_events")
export default class UserEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.id, { eager: true })
  @JoinColumn({ name: "eventId" })
  event: Event;

  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  static async checkConflictAndCreateSubscription(user: User, event: Event) {
    const conflictingEvent = await event.findConflictingTalks(user);

    if (conflictingEvent) {
      throw new ConflictError("There are other talks scheduled for the same time");
    }

    const newSubscription = this.create();
    newSubscription.event = event;
    newSubscription.user = user;
    await newSubscription.save();
    event.vacancies -= 1;
    await event.save();
  }

  static async unsubscribeUser(user: User, event: Event) {
    const deletedResult = await this.delete({ user, event });
    event.vacancies += 1;
    event.save();
    return deletedResult.affected;
  }

  static async createUserEventHashtable(userId: number) {
    const hashtable: Record<string, boolean> = {};
    const userEvents = await this.find({ user: { id: userId } });
    userEvents.forEach((userEvent) => {
      hashtable[String(userEvent.event.id)] = true;
    });
    return hashtable;
  }

  static async getEventsByUserId(userId: number) {
    const userEvents = this.find({ user: { id: userId } });

    return userEvents;
  }
}
