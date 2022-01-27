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

  static async createSubscription(user: User, event: Event) {
    const newSubscription = this.create();
    newSubscription.event = event;
    newSubscription.user = user;
    await newSubscription.save();
  }

  static async unsubscribeUser(user: User, event: Event) {
    const deletedResult = await this.delete({ user, event });
    return deletedResult.affected;
  }
}
