import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, Brackets, ManyToOne } from "typeorm";
import Date from "./Date";
import User from "./User";
import UserEvent from "./UsersEvents";
import Location from "./Location";

@Entity("events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Date, date => date.id, { eager: true })
  @JoinColumn({ name: "dateId" })
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  vacancies: number;

  @ManyToOne(() => Location, location => location.id, { eager: true })
  @JoinColumn({ name: "locationId" })
  locations: Location;

  @OneToMany(() => UserEvent, userEvent => userEvent.event)
    userEvent: UserEvent;
  
  includeUserSubscriptions(userHashtable: Record<string, boolean>) {
    const isUserSubscribed = !!userHashtable[String(this.id)];
    return { ...this, isUserSubscribed };
  }

  async findConflictingTalks(user: User) {
    const conflictingTalk = await UserEvent
      .createQueryBuilder("userEvent")
      .leftJoinAndSelect("userEvent.event", "event")
      .leftJoinAndSelect("event.date", "date")
      .leftJoinAndSelect("userEvent.user", "user")
      .where("user.id = :userId", { userId: user.id })
      .andWhere("date.name = :dateName", { dateName: this.date.name })
      .andWhere(new Brackets((timeQuery) => {
        timeQuery
          .where(new Brackets((subTimeQuery) => {
            subTimeQuery
              .where("event.startTime > :startTime", { startTime: this.startTime })
              .andWhere("event.startTime < :endTime", { endTime: this.endTime });
          }))
          .orWhere(new Brackets((subTimeQuery) => {
            subTimeQuery
              .where("event.endTime > :startTime", { startTime: this.startTime })
              .andWhere("event.endTime < :endTime", { endTime: this.endTime });
          }))
          .orWhere(new Brackets((subTimeQuery) => {
            subTimeQuery
              .where("event.startTime <= :startTime", { startTime: this.startTime })
              .andWhere("event.endTime >= :endTime", { endTime: this.endTime });
          }));
      }))
      .getOne();
    return conflictingTalk;
  }
}
