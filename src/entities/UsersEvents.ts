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

  static async createSubscription(userId: number, eventId: number) {
    const newSubscription = this.create();
    newSubscription.event = await Event.findOne({ id: eventId });
    newSubscription.user = await User.findOne({ id: userId });
    await newSubscription.save();
  }
}
