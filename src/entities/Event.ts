import NotFoundError from "@/errors/NotFoundError";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne, Brackets } from "typeorm";
import Date from "./Date";
import UserEvent from "./UsersEvents";

@Entity("events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Date, { eager: true })
  @JoinColumn({ name: "dateId" })
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  vacancies: number;

  @OneToMany(() => UserEvent, userEvent => userEvent.event)
    userEvent: UserEvent;

  static async findConflictingTalks(userId: number, eventId: number) {
    const eventToBeSubscribed = await this.findOne({ id: eventId });
    if (!eventToBeSubscribed) {
      throw new NotFoundError();
    }
    const conflitingTalk = await UserEvent
      .createQueryBuilder("userEvent")
      .leftJoinAndSelect("userEvent.event", "event")
      .leftJoinAndSelect("event.date", "date")
      .leftJoinAndSelect("userEvent.user", "user")
      .where("user.id = :userId", { userId })
      .andWhere("date.name = :dateName", { dateName: eventToBeSubscribed.date.name })
      .andWhere(new Brackets((timeQuery) => {
        timeQuery.where("event.startTime BETWEEN :startTime AND :endTime", { startTime: eventToBeSubscribed.startTime, endTime: eventToBeSubscribed.endTime })
          .orWhere("event.endTime BETWEEN :startTime AND :endTime", { startTime: eventToBeSubscribed.startTime, endTime: eventToBeSubscribed.endTime })
          .orWhere(new Brackets((subTimeQuery) => {
            subTimeQuery.where("event.startTime <= :startTime", { startTime: eventToBeSubscribed.startTime })
              .andWhere("event.endTime >= :endTime", { endTime: eventToBeSubscribed.endTime });
          }));
      }))
      .getOne();
    return conflitingTalk;
  }
}
