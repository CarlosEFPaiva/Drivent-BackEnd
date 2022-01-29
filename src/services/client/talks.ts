import Event from "@/entities/Event";
import User from "@/entities/User";
import UserEvent from "@/entities/UsersEvents";
import InvalidDataError from "@/errors/InvalidData";
import NotFoundError from "@/errors/NotFoundError";
import Date from "@/entities/Date";

export async function subscribe(userId: number, eventId: number) {
  const eventToBeSubscribed = await Event.findOne({ id: eventId });

  if (!eventToBeSubscribed) {
    throw new NotFoundError();
  }

  if (eventToBeSubscribed.vacancies === 0) {
    throw new InvalidDataError("subscription", ["This event has no vacancies left"]);
  }

  const user = await User.findOne({ id: userId });
  await UserEvent.checkConflictAndCreateSubscription(user, eventToBeSubscribed);
}

export async function unsubscribe(userId: number, eventId: number) {
  const eventToBeUnsubscribed = await Event.findOne({ id: eventId });

  if (!eventToBeUnsubscribed) {
    throw new NotFoundError();
  }

  const user = await User.findOne({ id: userId });
  const deletedUserEvent = await UserEvent.unsubscribeUser(user, eventToBeUnsubscribed);

  if (!deletedUserEvent) {
    throw new InvalidDataError("UserEvent", ["user is not subscribed to this event"]);
  }
}

export async function getDates() {
  const dates = await Date.find();

  if(dates.length === 0) {
    throw new NotFoundError();
  }

  return dates;
}

export async function getEventsByDayId(userId: number, dateId: number) {
  const dates = await Date.findOne({ 
    where: {
      id: dateId
    },
    relations: ["events"]
  });

  if(!dates || dates.events.length === 0) {
    throw new NotFoundError();
  }
  const userHashtable = await UserEvent.createUserEventHashtable(userId);

  return dates.events.map((event) => event.includeUserSubscriptions(userHashtable));
}
